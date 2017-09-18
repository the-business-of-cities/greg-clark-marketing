const getContentful = require("./contentful").default;
const write = require("./write").default;

// --------------------------------------------------

exports.default = (cb) => {
	getContentful()
	.then(data => {
		write(data, cb);
	})
}