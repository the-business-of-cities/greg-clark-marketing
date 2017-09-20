import _slugify from "slugify";
import marked from "marked";

import rawdata from "./rawdata";

const slugify = x => _slugify(x, {
	lower: true,
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

// transform an array of objects to a map of objects, where the keys are object.slug
const makeMapUsingSlugs = list => {
	return list.reduce((acc, item) => (
		{
			...acc,
			[item.slug]: item,
		}
	), {} )
};

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
const pagesMap = makeMapUsingSlugs(pages);

const publications = (
	dataObj.publication
	.sort((l,r) => (new Date(r.approximateDate) - new Date(l.approximateDate)))
	.map(
		adjustFields("description", "description", marked)
	)
);

const events = dataObj.event.map(R.omit([ "content", ]));

// --------------------------------------------------

const retval = {
	...dataObj.siteSettings[0],
	navLinks,
	pages,
	publications,
	pagesMap,
	events,
};

export default retval;