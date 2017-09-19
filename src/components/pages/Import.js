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
		}) => {
			space.createEntry("publication", {
				fields: addLangKeys({
					title,
					description,
					link,
					image,
					approximateDate,
					category,
				}),
			})
			.then(plog("then"));
		},
		onChangeXml: ({ setXml, }) => e => (setXml(e.target.value)),
		onSubmitXml: ({ xml, space, }) => () => {
			console.log("xml", xml);
			const json = convert.xml2js(xml, {
				compact: true,
			});

			const items = R.path([ "rss", "channel", "item", ])(json).splice(0,3);


			items.map(item => {

				// -- TITLE ----

				const title = R.path([ "title", "_text", ])(item) || "";

				// -- DESCRIPTION ----

				const description = R.path([ "description", "_text", ])(item) || "";

				// -- LINK ----

				const link = (
					(R.path(["content:encoded", "_cdata"])(item) || "")
					.match(/href="([^"]+)"/)[1]
				);

				// -- CATEGORY ----

				const category = [];
				const addCategory = c => {
					if (c._attributes.domain === "publicationtype") {
						category.push(c._cdata);
					}
				};

				if (item.category.forEach) {
					item.category.forEach(addCategory);
				}
				else {
					addCategory(item.category);
				}

				// --------------------------------------------------

				console.log({
					title,
					description,
					link,
					category,
				});
			})



			// space.createAsset({
			// 	fields: addLangKeys({
			// 		title: "Test asset",
			// 		file: {
			// 			contentType: "image/jpeg",
			// 			fileName: "test.jpg",
			// 			upload: "http://thebusinessofcities.com/wp-content/uploads/2014/08/Mumbai-Indias-global-City-image-266x200.jpg",
			// 		},
			// 	}),
			// })
			// .then(plog("then"))
			// .catch(plog("catch"));
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
	// logProps("import")
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