import * as mixins from "../style/mixins";
import * as vars from "../style/vars";
import { Icon, } from "./misc";

import React from "react";
import styled from "styled-components";
import data from "src/data";

// --------------------------------------------------

const Wrapper = styled.footer`
	background-color: ${ R.path([ "theme", "footer", ]) };
	position: absolute;
	right: 0;
	left: 0;
	bottom: 0;
	overflow: hidden;
`;

const Inner = styled.div`
	${ mixins.bpEither("height", vars.dim.footer.height) } ${ mixins.bpEither(
	"padding",
	vars.dim.nav.margin,
) };
	align-items: center;
	display: flex;
	justify-content: space-between;
	color: white;
	max-width: ${ vars.bps.lg.min }px;
	margin: 0 auto;

	${ mixins.xs`
		flex-wrap: wrap;
		height: auto;
	` } ${ mixins.bp.sm.min`
		padding-top: 0;
		padding-bottom: 0;
	` };
`;

const FooterSection = styled.div`
	text-align: center;

	${ mixins.xs`
		width: 100%;
		padding: 4px;
	` };
`;

const Contact = styled(FooterSection)`
	order: 0;
	${ mixins.xs`
		order: -1;
	` } a {
		color: white;

		&:hover {
			color: #ddd;
			text-decoration: underline;
		}
	}
`;

const Social = styled(FooterSection)`
	display: flex;
	flex-direction: row;
	justify-content: center;
	font-size: 1.5em;
	margin: 0 -0.25em;
	order: 1;
	${ mixins.xs`
		order: 1;
	` } a {
		color: white;
		margin: 0 0.25em;

		i,
		&:visited {
			color: white !important;
		}

		&:hover {
			color: #ddd;
		}
	}
`;

const ReallySmallScreens = styled.br`
	${ mixins.bp.min(500)`
		display: none;
	` };
`;

const OtherScreens = styled.span`
	${ mixins.bp.max(499)`
		display: none;
	` };
`;

const formatTelNumber = num => {
	if (num.slice(0, 1) === "+" && num.length === 13) {
		return `${ num.slice(0, 3) } (0)${ num.slice(3, 6) } ${ num.slice(
			6,
			9,
		) } ${ num.slice(9, 13) }`;
	}
	if (num.slice(0, 1) === "0" && num.length === 11) {
		return `${ num.slice(0, 4) } ${ num.slice(4, 7) } ${ num.slice(7, 11) }`;
	} else {
		return num;
	}
};

const socialLinks = [ "twitter", "facebook", "youtube", "linkedin", ];

const Footer = () => (
	<Wrapper>
		<Inner>
			<Contact>
				hey
			</Contact>

			<Social>
				{socialLinks.map(
					str =>
						data[str + "Link"] ? (
							<a href = { data[str + "Link"] } key = { str }>
								<Icon type = { str } />
							</a>
						) : null,
				)}
			</Social>
		</Inner>
	</Wrapper>
);

export default Footer;
