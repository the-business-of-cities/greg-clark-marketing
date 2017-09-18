const exec = require("process-promises").exec;
const makeDataFile = require("./dataFile").default;

// --------------------------------------------------

const buildScript = () => {
	exec("yarn build && react-snapshot")
	.on("process", process => {
		console.log("\nBUILD IN PROCESS... (Pid: " + process.pid + ")");
	})
	.then(result => {
		console.log("\nSTDOUT:\n", result.stdout || "no output");
		console.log("\nSTDERR:\n", result.stderr || "no error");
	})
	.catch(err => {
		console.error("\nERROR:\n", err);
	});
}

makeDataFile(buildScript);



