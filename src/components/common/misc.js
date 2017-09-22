import styled, { css, } from "styled-components";
import { Link, } from "react-router-dom";
import MQ from "react-responsive";

import * as mixins from "../style/mixins";
import * as vars from "../style/vars";
import { objMap, } from "../../lib/util";

// --------------------------------------------------

export const GridCell = styled.div`
	${ mixins.bpEach("padding", vars.dim.gutter.half) } ${ p =>
	p.flex ? `flex: ${ p.flex };` : "" };
`;

// --------------------------------------------------

const textBoxMargins = objMap(vars.font.size, (key, val) => `-${val} auto`);

export const TextBox = styled.div`
	${ mixins.bpEach("margin", textBoxMargins) } ${p =>
	p.bold ? "font-weight: bold;" : ""} ${p =>
	p.align ? `text-align: ${p.align};` : ""};
	// max-width: 44em;
`;

export const TextCell = props =>
	<GridCell { ...props }>
		<TextBox { ...R.pick(["bold", "align",])(props) }>
			{ props.children }
		</TextBox>
	</GridCell>;

// --------------------------------------------------

export const Container = styled.div`
	${ mixins.bpEach("padding", vars.dim.gutter.container) } ${p =>
	p.fullWidth ? "" : `max-width: ${p.maxWidth || vars.bps.lg.min}px`};
	margin: auto;
	${p => (p.rel ? "position: relative;" : "")} ${p =>
	p.border
		? `border-bottom: 1px solid ${vars.colors.lines};`
		: ""} ${p => (p.center ? "text-align: center;" : "")};
`;

// --------------------------------------------------

const bgTint = 0.3;
export const Bg = styled.div`
	${ p =>
		p.image
			? `
		background-image:
			linear-gradient( rgba(0,0,0,${ p.tint || bgTint }), rgba(0,0,0,${ p.tint ||
					bgTint}) ),
			url(${p.image});
		background-size: cover;
		background-position: center center;
	`
			: ""} ${p => (p.color ? `background-color: ${p.color};` : "")};
`;

// --------------------------------------------------

export const Para = props =>
	<div>
		{ props.children.split("\n").map((p, i) =>
			<p key = { `${p.slice(0, 5)}/${i}` }>
				{p}
			</p>,
		) }
	</div>;

// --------------------------------------------------

export const FullWidthImg = styled.img`
	width: 100%;
	height: auto;
`;

export const SmartImg = styled.div`
	width: 100%;
	${p => (
		p.height && p.width && p.height >= p.width
		? `width: ${100 * ( p.width / p.height )}%;`
		: "width: 100%;"
	)}
	${p => (
		p.height && p.width && p.height <= p.width
		? `padding-top: ${100 * (p.height / p.width)}%;`
		: "padding-top: 100%;"
	)}
	background-color: rgba(0,0,0,0.2);
	background-image: url(${R.prop("url")});
	background-size: cover;
	background-position: center center;
	background-repeat: norepeat;
	margin-left: auto;
`;

const IconWrapper = styled.i`
	font-size: ${p => p.size || "1em"};
	margin-right: ${p => p.marginRight || 0};
`;

export const Icon = props =>
	<IconWrapper
		className = { `fa fa-${props.type}` }
		{ ...props }
	/>

export const ButtonWrapper = styled.div`
	display: inline-block;
	padding: 0 1em;
	line-height: 1;
	height: 2.6em;
	transition: 0.1s linear background;
	cursor: pointer;
	${ p => (p.margin ? "margin: 0.3em;" : "") } display: inline-flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	&:hover,
	&:visited,
	&:active {
		color: ${ p => p.color || vars.colors.text };
	}

	${({ outline, color, hoverColor, }) => 
		outline || true
			? css`
				color: ${ color || vars.colors.text };
				border: 1.5px solid ${ color || vars.colors.text };
				${mixins.xs`border-width: 1px;`}
				background: transparent;

				&:hover,
				&:visited,
				&:active {
					color: ${ color || vars.colors.text };
				}
			`
			: `
				color: white;
				background: ${ color || vars.colors.text };

				&:hover,
				&:visited,
				&:active {
					color: white;
				}

				&:hover {
					background: ${
						hoverColor ||
						(color ? mixins.darken(color, 0.1) : mixins.lighten(vars.colors.text, 0.1))
					};
				}

			`
	}
`;

const IconSpan = styled.span`display: inline-block;`;

const MaybeLink = props =>
	props.to
		? <Link to = { props.to } children = { props.children } />
		: <a
			href = { props.href }
			children = { props.children }
			target = { props.target }
		/>;

export const IconButton = props => {
	return (
		<MaybeLink { ...props }>
			<ButtonWrapper { ...props }>
				{ props.icon
					? <Icon
						type = { props.icon }
						size = "1.2em"
						marginRight = "0.4em"
					/>
					: null
				}

				<IconSpan>
					{ props.text || props.children }
				</IconSpan>
			</ButtonWrapper>
		</MaybeLink>
	);
};

export const Button = IconButton;

export const PSpacing = styled.div`${mixins.bpEach("height", vars.font.size)};`;

export const Only = objMap(vars.bps, (key, val) => ({ children, }) =>
	<MQ
		query = { `(min-width: ${val.min}px) and (max-width: ${val.max}px)` }
		children = { children }
	/>,
);

export const Line = styled.div`
	height: 1.5px;
	width: 100%;
	background-color: ${R.path([ "theme", "text", ])};
`;

const LineCellWrapper = styled(GridCell)`
	padding-left: 0;
	padding-right: 0;
`;

export const LineCell = () => (
	<LineCellWrapper>
		<Line/>
	</LineCellWrapper>
);

// --------------------------------------------------

export const PageWrapper = styled.div`
	position: relative;
	overflow: hidden;
`;

export const PageImage = styled.img`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: -1;
	opacity: 0.5;
`;

export const PageBody = styled.div`
	background: ${ vars.colors.bg };
	margin-top: 6em;
	margin-bottom: 3em;
	padding: 1.5em;

	h1 {
		background: ${ vars.colors.bg };
		padding: 0 1.5em 0.5em 0;
		position: relative;
		z-index: 1;
		margin-top: 0;

		${ mixins.bp.sm.min`padding: 0 3em 0.5em 0` };
	}
`;

// --------------------------------------------------

export const TilesWrapper = styled.div`
	${ mixins.clearfix }
`;

export const TileWrapper = styled(GridCell)`
	width: ${ props => props.small ? "33.3333333333333%" : "50%" };
	width: 50%;
	${ mixins.xs`width: 100%` };
	float: left;
`;

export const TileInner = styled(GridCell)`
	//background-color: white;
	//border: 1px solid ${R.path(["theme", "borders",])};
	//box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
	position: relative;
	${ mixins.bp.sm.min`padding : 0` };
	margin-bottom: 1em;
`;

export const TileContent = styled.div`
	background: ${ vars.colors.bgdark };
	margin-top: -2em;
	left: 0;
	margin-right: 1.5em;
	margin-bottom: 1em;
	padding: 0.5em 1em;

	p { 
		font-size: 0.95em 
	}
`;

export const TileImage = styled.div`
	margin-left: 1.5em;
`;

export const TileTitle = styled.h3`
	:hover, :active {
		opacity: 0.7;
	}

	:after {
		margin-top: 0.5em;
		//margin-bottom: 12px;
		content: '';
		display: block;
		width: 5em;
		border-bottom: 0.4em solid #333;
	}
`;

// --------------------------------------------------
