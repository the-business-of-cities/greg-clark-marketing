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
		background: ${ vars.colors.bg };
		font-family: ${ vars.font.family };
		${ mixins.bpEach("font-size", vars.font.size) }
		color: ${ vars.colors.text };
		margin: 0;
		${ mixins.bpEither("margin-bottom", vars.dim.footer.height) }
		line-height: 1.5;
		text-rendering: optimizeLegibility;
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
	@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700|Lora:400,700|Montserrat:400,600');

	p, ul, ol {
		font-family: "Lora", serif;
		font-size: 1.1em;
	}

	p {
		img {
			max-width: 100%;
		}
	}

	ul, ol, li {
		${ mixins.bpEach("margin", textMargins) };
	}

	ul, ol, li {
		margin-left: 1.5em;
	}

	h1,
	h2,
	h3 {
		display: inline-block;

		:after {
			margin-top: 0.5em;
			//margin-bottom: 12px;
			content: '';
			display: block;
			width: 5em;
			border-bottom: 0.4em solid ${ vars.colors.bgdark };
		}
	}
`;

// --------------------------------------------------

export default () => injectGlobal`
	${ defaultGlobalStyles }
	${ additionalGlobalStyles }
`;
