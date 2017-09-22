import styled, { css, } from "styled-components";
import { NavLink, } from "react-router-dom";

import routesConfig from "src/routesConfig";
import * as mixins from "src/components/style/mixins";
import * as vars from "src/components/style/vars";

// --------------------------------------------------

const wrapperStyle = [
	css`
		transform: translateY(${ props => ( props.open ? 0 : -110 ) }%);
		transition: 0.3s all ease-out;
		${ mixins.shadow(2) }
		position: absolute;
		left: 0;
		right: 0;
		top: ${ vars.dim.nav.height.xs };
		background-color: ${R.path([ "theme", "nav", ])};
		align-items: center;
	`,

	`
		position: absolute;
		right: ${vars.dim.nav.margin.other};
		left: ${vars.dim.nav.margin.other};
		bottom: 0;
		height: ${vars.dim.nav.linksHeight};
		display: flex;
		align-items: center;
	`,
];

const Wrapper = styled.div`
	${ mixins.xs`${ wrapperStyle[0] }` } ${ mixins.bp.sm.min`${ wrapperStyle[1] }`};
	margin: auto;
`;

const buttonStyle = [
	`
		display: block;
		padding: ${ vars.dim.nav.margin.xs };
		border-bottom: 1px solid ${ mixins.tr(0.1) };

		&.active {
			font-weight: bold;
		}

		&:last-child {
			border-bottom: 0;
		}
	`,

	`
		display: inline-block;
		height: ${ vars.dim.nav.linksHeight };
		line-height: ${ vars.dim.nav.linksHeight };
		padding: 0 0.75em;
		font-size: 0.85em;
		text-transform: uppercase;

		&.active {
			background-color: rgba(255,255,255,0.3);
		}

		&:not(.active):hover {
			background-color: rgba(255,255,255,0.1);
		}
	`,
];

// should be Link
const Button = styled(NavLink)`
	color: ${ R.path([ "theme", "logo1", ]) };
	font-size: 1.1em;

	${ mixins.xs`${ buttonStyle[0] }` }
	${ mixins.bp.sm.min`${buttonStyle[1] }` }
`;

// --------------------------------------------------

export default ({ close, open, }) =>
	<Wrapper open = { open }>
		{
			routesConfig
			.filter(R.prop("show"))
			.map(({ title, path, }) =>
				<Button
					key = { path }
					to = { path }
					activeClassName = "active"
					onClick = { close }
					exact = { path === "/" }
				>
					{ title }
				</Button>,
			)
		}
	</Wrapper>;
