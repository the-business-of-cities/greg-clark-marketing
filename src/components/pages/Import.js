import { createClient, } from "contentful-management";
import { compose, lifecycle, withHandlers, withState, } from "recompose";
import { Route, } from "react-router-dom";
import styled from "styled-components";
import convert from "xml-js";
require("dotenv").config();

import { logProps, plog, } from "src/lib/util";
import { Container, GridCell, } from "src/components/common";

// --------------------------------------------------

const Input = styled.textarea`
	width: 30em;
	height: 15em;
`;

const lang = "en-US";

const addLangKeys = R.map(
	val => ({
		[lang]: val,
	})
);

const enhance = compose(
	withState("space", "setSpace", null),
	withState("xml", "setXml", ""),
	withHandlers({
		createPublication: ({ space, }) => ({
			title,
			description,
			link,
			image,
			approximateDate,
			category,
			featured,
		}) => {
			(
				image
				? (
					space.createAsset({
						fields: addLangKeys({
							file: image,
						}),
					})
					.then(asset => asset.processForAllLocales())
					.then(plog("asset"))
				)
				: Promise.resolve()
			)
			.then(asset => (
				space.createEntry("publication", {
					fields: addLangKeys({
						title,
						description,
						link,
						approximateDate,
						category,
						featured,
						...(
							asset
							? {
								image: {
									sys: {
										type: "Link",
										linkType: "Asset",
										id: asset.sys.id,
									},
								},
							}
							: {}
						),
					}),
				})
				.then(plog("entry"))
			))			
			.then(plog("then"));
		},
		onChangeXml: ({ setXml, }) => e => (setXml(e.target.value)),
	}),
	withHandlers({
		onSubmitXml: ({ xml, space, createPublication, }) => () => {
			const json = convert.xml2js(xml, {
				compact: true,
			});

			const _items = R.path([ "rss", "channel", "item", ])(json);
			const items = _items;

			const inputs = items.map(item => {

				// -- TITLE ----

				const title = R.path([ "title", "_text", ])(item) || "";

				// -- DESCRIPTION ----

				const description = R.path([ "description", "_text", ])(item) || "";

				// -- LINK ----

				const link = (
					(R.path(["content:encoded", "_cdata"])(item) || "")
					.match(/href="([^"]+)"/)[1]
				);

				// -- IMAGE ----

				const imageUrl = (
					(R.path(["content:encoded", "_cdata"])(item) || "")
					.match(/src="([^"]+)"/)[1]
				);

				const image = (
					imageUrl
					? {
						upload: imageUrl,
						fileName: imageUrl.slice(imageUrl.lastIndexOf("/") + 1),
						contentType: "image/jpeg",
					}
					: undefined
				);

				// -- DATE ----

				let year = "";
				const setYear = c => {
					if (c._attributes.domain === "years") {
						year = c._cdata;
					}
				}

				if (item.category) {
					if (item.category.forEach) {
						item.category.forEach(setYear);
					}
					else {
						setYear(item.category);
					}
				}

				let approximateDate = "";
				if (year) {
					approximateDate = (new Date(parseInt(year,10), 0)).toISOString();
				}
				else {
					approximateDate = (new Date()).toISOString();
				}

				// -- CATEGORY ----

				const category = [];
				const addCategory = c => {
					if (c._attributes.domain === "publicationtype") {
						category.push(c._cdata);
					}
				};

				if (item.category) {
					if (item.category.forEach) {
						item.category.forEach(addCategory);
					}
					else {
						addCategory(item.category);
					}
				}

				// -- FEATURED ----

				let featured = false;
				const setFeatured = c => {
					if (c._attributes.domain === "post_tag" && c._cdata === "featured") {
						featured = true;
					}
				};

				if (item.category) {
					if (item.category.forEach) {
						item.category.forEach(setFeatured);
					}
					else {
						setFeatured(item.category);
					}
				}

				// ----------------

				console.log({
					item,

					title,
					description,
					link,
					image,
					approximateDate,
					category,
					featured,
				});

				if (featured) {
					return {
						title,
						description,
						link,
						image,
						approximateDate,
						category,
						featured,
					};
				}
				else {
					return null;
				}
			});

			return inputs.reduce(
				(p, input) => p.then(() => (
					input
					? createPublication(input)
					: Promise.resolve()
				)),
				Promise.resolve()
			);
		},
	}),
	lifecycle({
		componentDidMount() {
			this.client = createClient({
				accessToken: this.props.match.params.accessToken,
			});
			this.client.getSpace(this.props.match.params.spaceId)
			.then(space => {
				this.props.setSpace(space);
			});			
		},
	}),
);

const Import = props => (
	<Container>
		<GridCell>
			<div>Import</div>
			<Input onChange = { props.onChangeXml }/>
			<button onClick = { props.onSubmitXml }>Click to import</button>
		</GridCell>
	</Container>
);

const EnhancedImport = enhance(Import);

export default () => (
	<Route
		path = "/import/:spaceId/:accessToken"
		component = { EnhancedImport }
	/>
);