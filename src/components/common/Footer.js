import React from "react";
import styled from "styled-components";

import * as mixins from "../style/mixins";
import * as vars from "../style/vars";
import data from "src/data";

import { Icon, } from "./misc";

// --------------------------------------------------

const Wrapper = styled.footer`
	background-color: ${R.path([ "theme", "footer", ])};
	${ mixins.bpEither("height", vars.dim.footer.height) }
	${ mixins.bpEither("padding", vars.dim.nav.margin) };
	align-items: center;
	border-top: 1.5px solid ${ R.path([ "theme", "nav", ]) };
	bottom: 0;
	display: flex;
	justify-content: space-between;
	left: 0;
	overflow: hidden;
	position: absolute;
	right: 0;
`;

const Left = styled.div`
`;

const Right = styled.div`
	display: flex;
	flex-direction: row;
	font-size: 1.5em;

	a {
		margin-left: 0.5em;
	}
`;

const Footer = () =>
	<Wrapper>
		<Left>{ data.footerText }</Left>

		<Right>
			<a href = "#"><Icon type = "facebook-square"/></a>
			<a href = "#"><Icon type = "twitter"/></a>
		</Right>
	</Wrapper>;

export default Footer;
