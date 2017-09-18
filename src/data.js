import _slugify from "slugify";
import marked from "marked";

import rawdata from "./rawdata";

const slugify = x => _slugify(x, {
	lower: true,
});

const shapeImageField = ({
	url,
	details: {
		size,
		image: {
			width,
			height,
		},
	},
	fileName,
	contentType,
}) => ({
	contentType,
	fileName,
	height,
	size,
	url,
	width,
});

const shapeFields = fields => ({
	...fields,
	...(
		fields.image
		? { image: shapeImageField(fields.image.fields.file), }
		: {}
	),
	...(
		fields.title
		? { slug: slugify(fields.title), }
		: {}
	),
	...(
		fields.content
		? { html: marked(fields.content), }
		: {}
	),
});

const dataObj = {};
rawdata.items.forEach(item => {
	const itemType = item.sys.contentType.sys.id;
	const shapedItem = shapeFields(item.fields);
	dataObj[itemType] = (
		dataObj[itemType]
		? dataObj[itemType].concat(shapedItem)
		: [ shapedItem, ]
	);
});

// --------------------------------------------------

const navLinks = (
	dataObj.siteSettings[0].navLinks
	.map(({ fields, }) => R.pipe(
		shapeFields,
		R.omit([ "content", ]),
		o => ({
			...o,
			path: "/" + o.slug,
		})
	)(fields))
);

const pages = dataObj.page.map(R.omit([ "content", ]));

const retval = {
	...dataObj.siteSettings[0],
	navLinks,
	pages,
};

export default retval;