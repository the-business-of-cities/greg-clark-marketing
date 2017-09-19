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

const Center = styled.div`
	a:hover {
		text-decoration: underline;
	}
`;

const Right = styled.div`
	display: flex;
	flex-direction: row;
	font-size: 1.5em;

	a {
		margin-left: 0.5em;
	}
`;

const formatTelNumber = num => {
	if (num.slice(0,1) === "+" && num.length === 13) {
		return `${num.slice(0,3)} (0)${num.slice(3,6)} ${num.slice(6,9)} ${num.slice(9,13)}`;
	}
	if (num.slice(0,1) === "0" && num.length === 11) {
		return `${num.slice(0,4)} ${num.slice(4,7)} ${num.slice(7,11)}`;
	}
	else {
		return num;
	}
}

const socialLinks = [ "twitter", "facebook", "youtube", "linkedin", ];

const Footer = () =>
	<Wrapper>
		<Left>{ data.footerText }</Left>

		<Center>
			Email: <a href = { "mailto:" + data.email }>{ data.email }</a> |
			Tel: <a href = { "tel:" + data.telephone }>{ formatTelNumber(data.telephone) }</a>
		</Center>

		<Right>
			{
				socialLinks.map(str => (
					data[str + "Link"]
					? <a href = { data[str + "Link"] }><Icon type = { str }/></a>
					: null
				))
			}
		</Right>
	</Wrapper>;

export default Footer;
