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

// shape the data however you want my guy
const retval = dataObj;

export default retval;