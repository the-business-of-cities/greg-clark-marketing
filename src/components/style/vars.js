import { objMap, } from "../../lib/util";

// --------------------------------------------------

const sm = 768;
const md = 992;
// const lg = 1200;
const lg = md;

export const breakpoints = {
	xs: { min: 0, max: sm - 1, },
	sm: { min: sm, max: md - 1, },
	md: { min: md, max: lg - 1, },
	lg: { min: lg, max: 100000, },
};
export const bps = breakpoints;

export const colors = {
	text: "#444",
	link: "#405378",
	linkHover: "#4D6491",
	nav: "#333",
	//nav: "#041C3A",
	footer: "#333",
	//footer: "#041C3A",
	bg: "#FCDABF",
	bg: "#fff",
	bgdark: "#E4C1A3",
	bgdark: "#ddd",
	//background: #FFEFDB;
	grey: "rgba(0,0,0,0.2)",
	lines: "rgba(0,0,0,0.2)",
	borders: "rgba(0,0,0,0.2)",
};

export const font = {
	size: {
		xs: "12px",
		sm: "14px",
		md: "16px",
		lg: "17px",
	},

	title: {
		family: "Montserrat, sans-serif",
	},

	family: "Montserrat, sans-serif",
};

const gutter = {
	xs: 15,
	sm: 20,
	md: 30,
	lg: 30,
};

export const scrollbar = {
	width: "10px",
	color: {
		track: "#ddd",
		thumb: colors.text,
	},
};

export const dimensions = {
	nav: {
		height: {
			xs: "50px",
			other: "110px",
		},
		margin: {
			xs: "14px",
			other: (gutter.lg * 1.5) + "px",
		},
		logoHeight: {
			xs: "40px",
			other: "60px",
		},
		linksHeight: "42px",
	},
	footer: {
		height: {
			xs: "130px",
			other: "60px",
		},
	},
	gutter: {
		full: objMap(gutter, (k, v) => v + "px"),
		half: objMap(gutter, (k, v) => 0.5 * v + "px"),
		quarter: objMap(gutter, (k, v) => 0.25 * v + "px"),
		minusQuarter: objMap(gutter, (k, v) => -0.25 * v + "px"),
		tripleHalf: objMap(gutter, (k, v) => 1.5 * v + "px"),
		fullNum: gutter,
		halfNum: objMap(gutter, (k, v) => 0.5 * v),
		quarterNum: objMap(gutter, (k, v) => 0.25 * v),
		tripleHalfNum: objMap(gutter, (k, v) => 1.5 * v),
	},
	scrollbar: scrollbar.width,
};
dimensions.gutter.container = {
	...dimensions.gutter.full,
	xs: dimensions.gutter.full.xs,
};
export const dim = dimensions;

export const meta = {
	twitterUsername: "mcclowes",
	twitterCreator: "codogoio",
	googleAnalytics: "UA-89374864-3",
	googleSearch: "YQs24--DxVBln2zZc8hPo1kZFoxzc2amoF6-QWkDe7k",
};
