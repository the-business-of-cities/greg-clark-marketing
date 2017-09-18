import Data from "./components/common/Data";
import NotFound from "./components/pages/404";

import Home from "./components/pages/Home";
import Example from "./components/pages/ExamplePage";

import data from "src/data";
import rawdata from "src/rawdata";

// --------------------------------------------------

const routesConfig = [
	{
		path: "/",
		title: "Home",
		component: Home,
		exact: true,
		show: false,
	},
	{
		path: "/data",
		title: "Data",
		component: Data(data),
		show: false,
	},
	{
		path: "/rawdata",
		title: "Raw Data",
		component: Data(rawdata),
		show: false,
	},
	{
		path: "/example",
		title: "Example",
		component: Example,
		show: true,
	},
];

routesConfig.push({
	component: NotFound,
});

export default routesConfig;
