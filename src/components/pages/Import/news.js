import convert from "xml-js";
import toMarkdown from "to-markdown";

import { plog, } from "src/lib/util";

const lang = "en-US";
const addLangKeys = R.map(val => ({
	[lang]: val,
}));

export const createNews = ({ space, }) => ({
	title,
	content,
	image,
	originalDate,
	featured,
}) => {
	(image
		? space
			.createAsset({
				fields: addLangKeys({
					file: image,
				}),
			})
			.then(asset =>
				asset
					.processForAllLocales()
					.then(asset => asset, () => Promise.resolve()),
			)
			.then(plog("asset"))
		: Promise.resolve()
	)
		.then(asset =>
			space
				.createEntry("news", {
					fields: addLangKeys({
						title,
						content,
						originalDate,
						featured,
						...(asset
							? {
								image: {
									sys: {
										type: "Link",
										linkType: "Asset",
										id: asset.sys.id,
									},
								},
							  }
							: {}),
					}),
				})
				.then(plog("entry")),
		)
		.then(plog("then"));
};

export const onSubmitNewsXml = ({ xml, createNews, }) => () => {
	const json = convert.xml2js(xml, {
		compact: true,
	});

	const _items = R.path([ "rss", "channel", "item", ])(json);
	const items = _items.slice(0, 10);

	const inputs = items.map(item => {
		// -- TITLE ----
		const title = R.path([ "title", "_text", ])(item) || "";

		// -- CONTENT ----
		const content = toMarkdown(
			(R.path([ "content:encoded", "_cdata", ])(item) || "").replace(
				/<img([^\>]+)>/g,
				" ",
			),
		);

		// -- IMAGE ----
		const imageUrl = ((
			R.path([ "content:encoded", "_cdata", ])(item) || ""
		).match(/src="([^"]+)"/) || {})[1];

		const image = imageUrl
			? {
				upload: imageUrl,
				fileName: imageUrl.slice(imageUrl.lastIndexOf("/") + 1),
				contentType:
						"image/" +
						imageUrl.slice(imageUrl.lastIndexOf(".") + 1),
			  }
			: undefined;

		// -- DATE ----
		let originalDate = undefined;
		if (item.pubDate && item.pubDate._text) {
			originalDate = new Date(item.pubDate._text).toISOString();
		}

		// -- FEATURED ----
		let featured = false;
		const setFeatured = c => {
			if (
				c._attributes.domain === "post_tag" &&
				c._cdata === "featured"
			) {
				featured = true;
			}
		};

		if (item.category) {
			if (item.category.forEach) {
				item.category.forEach(setFeatured);
			} else {
				setFeatured(item.category);
			}
		}

		// ----------------

		console.log({
			item,
			title,
			content,
			image,
			originalDate,
			featured,
		});

		if (true) {
			return {
				title,
				content,
				image,
				originalDate,
				featured,
			};
		} else {
			return null;
		}
	});

	return inputs.reduce(
		(p, input) =>
			p.then(() => (input ? createNews(input) : Promise.resolve())),
		Promise.resolve(),
	);
};
