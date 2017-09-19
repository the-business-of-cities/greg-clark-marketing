import Data from "./components/common/Data";
import NotFound from "./components/pages/404";

import Home from "./components/pages/Home";
import Events from "./components/pages/Events";
import Generic from "./components/pages/Generic";

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
		path: "/events",
		title: "Events",
		component: Events,
		exact: true,
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
];

data.navLinks.forEach(o => {
	routesConfig.push({
		...o,
		component: Generic,
		show: true,
	})
})

routesConfig.push({
	component: NotFound,
});

export default routesConfig;
