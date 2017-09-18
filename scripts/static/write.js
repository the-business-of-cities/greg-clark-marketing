const jsonfile = require("jsonfile");

// --------------------------------------------------
 
const file = "./src/rawdata.json";

// --------------------------------------------------

exports.default = (data, cb) => {
	jsonfile.writeFile(file, data, function (err, obj) {
		if (err) {
			console.log("Error writing data: ", err);
		}
		else {
			(cb || (() => {}))();
		}
	})
};