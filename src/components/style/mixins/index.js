export * from "./bp";
export * from "./colors";

// --------------------------------------------------

export const truncate = () => `
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const wh = size => `
	width: ${size};
	height: ${size};
`;

export const shadow = (elevation = 1) =>
	({
		"0": "",
		"1":
			"box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);",
		"2":
			"box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);",
		"3":
			"box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);",
		"4":
			"box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);",
		"5":
			"box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);",
		"-1":
			"box-shadow: inset 0 -1px 3px rgba(0,0,0,0.12), inset 0 -1px 2px rgba(0,0,0,0.24);",
	}[elevation]);

export const contained = (offset = 0) => `
	position: absolute;
	top: ${offset};
	right: ${offset};
	bottom: ${offset};
	left: ${offset};
`;

export const removePx = npx => +npx.replace("px", "");
export const num = removePx;

export const addPx = n => n + "px";
export const px = addPx;

export const bgImage = url => `
	background-size: cover;
	background-position: center center;
	background-image: url(${url});
`;

export const clearfix = `
	&:before,
	&:after {
		content: "";
		display: table;
	}

	&:after {
		clear: both;
	}
`;
