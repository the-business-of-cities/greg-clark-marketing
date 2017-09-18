import { injectGlobal, css, } from "styled-components";

import * as vars from "./vars";
import * as mixins from "./mixins";
import { objMap, } from "src/lib/util";

// --------------------------------------------------

const textMargins = objMap(vars.font.size, (key, val) => val + " 0");

const defaultGlobalStyles = css`
	*, *:before, *:after {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	html {
		min-height: 100%;
		position: relative;
	}

	body {
		background: white;
		font-family: Helvetica, Arial, sans-serif;
		${ mixins.bpEach("font-size", vars.font.size) }
		color: ${ vars.colors.text };
		margin: 0;
		${ mixins.bpEither("margin-bottom", vars.dim.footer.height) }
		line-height: 1.5;
	}

	a,
	a:hover,
	a:visited,
	a:active {
		text-decoration: none;
		color: ${ vars.colors.text };
	}

	p, h1, h2, h3, h4 {
		${ mixins.bpEach("margin", textMargins) }
	}

	img {
		vertical-align: bottom;
	}
`;

// --------------------------------------------------

const additionalGlobalStyles = css`

`;

// --------------------------------------------------

export default () => injectGlobal`
	${defaultGlobalStyles}
	${additionalGlobalStyles}
`;
