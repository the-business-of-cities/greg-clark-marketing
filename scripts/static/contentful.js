require("dotenv").config() // lets me use process.env
const contentful = require("contentful");

// --------------------------------------------------

exports.default = (opts = {}) => (
	contentful.createClient({
		accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
		space: process.env.CONTENTFUL_SPACE_ID || "",
	})
	.getEntries()
	.then(res => {
		if (opts.log) {
			console.log(JSON.stringify(res, null, "  "));
		}
		if (opts.cb) {
			opts.cb(res);
		}
		return res;
	})
);