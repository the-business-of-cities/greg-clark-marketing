import _slugify from "slugify";
import marked from "marked";

import rawdata from "./rawdata";

const slugify = x => _slugify(x, {
	lower: true,
});

const shapeImageField = ({
	fields: {
		file: {
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
		},
	},
}) => ({
	contentType,
	fileName,
	height,
	size,
	url,
	width,
});

// transform a field or do something to an existing field to add a new one
const adjustFields = (a, b, fn) => fieldsObj => ({
	...fieldsObj,
	...(
		fieldsObj[a]
		? { [b]: fn(fieldsObj[a]), }
		: {}
	),
});

const defaultFieldShaping = R.pipe(
	adjustFields("image", "image", shapeImageField),
	adjustFields("title", "slug", slugify),
	adjustFields("content", "html", marked),
);

const dataObj = {};
rawdata.items.forEach(item => {
	const itemType = item.sys.contentType.sys.id;
	const shapedItem = defaultFieldShaping(item.fields);

	dataObj[itemType] = (
		dataObj[itemType]
		? dataObj[itemType].concat(shapedItem)
		: [ shapedItem, ]
	);
});

// --------------------------------------------------

const navLinks = (
	dataObj.siteSettings[0].navLinks
	.map(R.pipe(
		R.prop("fields"),
		defaultFieldShaping,
		R.omit([ "content", ]),
		adjustFields("slug", "path", slug => "/" + slug),
	))
);

const pages = dataObj.page.map(R.omit([ "content", ]));

const events = dataObj.event.map(R.omit([ "content", ]));

// --------------------------------------------------

const makeMapUsingSlugs = list => {
	return list.reduce((acc, item) => (
		{
			...acc,
			[item.slug]: item,
		}
	), {} )
};

const pagesMap = makeMapUsingSlugs(pages);

// --------------------------------------------------

const retval = {
	...dataObj.siteSettings[0],
	navLinks,
	pages,
	pagesMap,
	events,
};

export default retval;