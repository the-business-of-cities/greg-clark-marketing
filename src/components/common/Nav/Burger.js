import React from "react";
import styled from "styled-components";

// --------------------------------------------------

const Burger = props =>
	<Wrapper { ...props }>
		<Bottom { ...props }>
			<Top { ...props } />
			<Middle { ...props } />
		</Bottom>
	</Wrapper>;

Burger.defaultProps = {
	padding: 10,
	layerWidth: 30,
	layerHeight: 3,
	layerSpacing: 6,
	color: "#fff",
	borderRadius: 4,
	transitionDuration: 0.4,
};

const Wrapper = styled.div`
	width: ${p => p.layerWidth + 2 * p.padding}px;
	height: ${p => 3 * p.layerHeight + 2 * p.layerSpacing + 2 * p.padding}px;
	position: relative;
	cursor: pointer;
`;

const Bar = styled.div`
	width: ${p => p.layerWidth}px;
	height: ${p => p.layerHeight}px;
	background-color: ${p => p.color};
	border-radius: ${p => p.borderRadius}px;
	position: absolute;
	transition-property: transform;
	transition-duration: ${p => 0.15 * 2 * p.transitionDuration}s;
	transition-timing-function: ease;
`;

const Bottom = styled(Bar)`
	margin-top: ${p => p.layerHeight / -2}px;
	bottom: ${p => p.padding}px;
	left: ${p => p.padding}px;
	${p =>
		p.open
			? `transform: translate3d(0, ${(p.layerSpacing + p.layerHeight) *
					-1}px, 0) rotate(-45deg);`
			: ""}
	transition-duration: ${p => 0.15 * 2 * p.transitionDuration}s;
	transition-delay: ${p =>
		p.open
			? 0.32 * 2 * p.transitionDuration
			: 0.15 * 2 * p.transitionDuration}s;
	transition-timing-function: ${p =>
		p.open
			? "cubic-bezier(0.215, 0.61, 0.355, 1)"
			: "cubic-bezier(0.55, 0.055, 0.675, 0.19)"};
`;

const Middle = styled(Bar)`
	top: ${p => (p.open ? 0 : (p.layerSpacing + p.layerHeight) * -1)}px;
	${p => (p.open ? `transform: rotate(-90deg);` : "")}	
	${p => `transition:
		top
		${0.12 * 2 * p.transitionDuration}s
		${(p.open ? 0.18 : 0.3) * 2 * p.transitionDuration}s
		cubic-bezier(0.33333, 0.66667, 0.66667, 1),

		transform
		${0.15 * 2 * p.transitionDuration}s
		${p.open ? `${0.42 * 2 * p.transitionDuration}s` : ""}
		${p.open
		? "cubic-bezier(0.215, 0.61, 0.355, 1)"
		: "cubic-bezier(0.55, 0.055, 0.675, 0.19)"};
	`}
`;

const Top = styled(Bar)`
	opacity: ${p => (p.open ? 0 : 1)};
	bottom: ${p => (p.layerSpacing + p.layerHeight) * -1}px;
	top: ${p => (p.open ? 0 : (2 * p.layerSpacing + 2 * p.layerHeight) * -1)}px;
	${p => `transition:
		top 
		${0.3 * 2 * p.transitionDuration}s
		${!p.open ? `${0.3 * 2 * p.transitionDuration}s` : ""}
		cubic-bezier(0.33333, 0.66667, 0.66667, 1),

		opacity
		${0.1 * 2 * p.transitionDuration}s
		${p.open ? `${0.27 * 2 * p.transitionDuration}s` : ""}
		linear;
	`}
`;

// --------------------------------------------------

export default Burger;
