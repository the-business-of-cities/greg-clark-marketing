import Data from "./components/common/Data";
import NotFound from "./components/pages/404";

import Home from "./components/pages/Home";
import Events from "./components/pages/Events";
import Event from "./components/pages/Event";
import Generic from "./components/pages/Generic";
import Publications from "./components/pages/Publications";
import Import from "./components/pages/Import";

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
];

data.events.forEach(o => {
	routesConfig.push({
		path: "/events/" + o.slug,
		component: Event,
		title: o.name,
		exact: true,
		show: false,
		event: o,
	})
})

routesConfig.push(
	{
		path: "/events",
		title: "Events",
		component: Events,
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
);

data.navLinks.forEach(o => {
	routesConfig.push({
		...o,
		component: Generic,
		show: true,
	})
})

routesConfig.push({
	path: "/publications",
	title: "Publications",
	component: Publications,
	show: true,
});

routesConfig.push({
	path: "/import",
	title: "Import",
	component: Import,
	show: false,
});

routesConfig.push({
	component: NotFound,
});

export default routesConfig;
