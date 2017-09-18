import styled from "styled-components";
import { Link, } from "react-router-dom";
import { compose, withState, withHandlers, } from "recompose";

import * as mixins from "../../style/mixins";
import * as vars from "../../style/vars";
import { objMap, } from "src/lib/util";

import Links from "./Links";
import Burger from "./Burger";
import Fade from "../Fade";

// --------------------------------------------------

const Wrapper = styled.nav`
	${ mixins.bp.sm.min`${ mixins.shadow(1) }` } ${ mixins.bpEither(
		"height",
		vars.dim.nav.height,
	) }
	background-color: ${R.path([ "theme", "nav", ])};
	left: 0;
	position: fixed;
	right: 0;
	top: 0;
	z-index: 2;
	color: white;

	& a {
		color: white !important;
	}
`;

const Inner = styled.div`
	width: 100%;
	height: 100%;
	position: relative;
`;

const MobileStuff = styled.div`
	${ mixins.bp.sm.min`display: none;`} ${mixins.contained()};
`;

const Dark = styled.div`
	${ mixins.contained() } position: fixed;
	background: ${mixins.tr(0.5)};
`;

const Overlay = styled.div`
	${ mixins.contained() } ${({ open, }) =>
	open ? mixins.shadow(1) : ""} transition: 0.3s all ease-out;
	background-color: ${R.path([ "theme", "nav", ])};
`;

const BurgerWrapper = styled.div`
	position: absolute;
	right: 0;
	top: 50%;
	margin-top: -20px;
`;

const LogoText = styled.div`
	font-size: 2em;
	font-family: ${vars.font.title.family};
`;

const LogoImage = styled.img`
	height: 80%;
	width: auto;
`;

const Logo = props =>
	<LogoWrapper to = "/">
		{
			true
			? <LogoText>LOGO TEXT</LogoText>
			: <LogoImage src = "/img/igpf-logo.png"/>
		}
	</LogoWrapper>;

const IndexLink = props => <Link to = "/" { ...props } />;

const LogoWrapper = styled(IndexLink)`
	position: absolute;
	top: 0;
	bottom: 0;
	${ mixins.bpEither("left", vars.dim.nav.margin )}
	display: flex;
	flex-direction: row;
	align-items: center;
`;

// --------------------------------------------------

const enhance = compose(
	withState("open", "setOpen", false),
	withHandlers({
		openMenu: ({ setOpen, }) => () => setOpen(true),
		closeMenu: ({ setOpen, }) => () => setOpen(false),
		toggleMenu: ({ setOpen, open, }) => () => setOpen(!open),
	})
);

const Nav = ({ open, closeMenu, toggleMenu, }) => (
	<Wrapper>
		<Inner>
			<MobileStuff>
				<Fade visible = { open }>
					<Dark onClick = { closeMenu }/>
				</Fade>
			</MobileStuff>

			<Links
				close = { closeMenu }
				open = { open }
			/>

			<MobileStuff>
				<Overlay open = { open }/>
				
				<BurgerWrapper onClick = { toggleMenu }>
					<Burger
						open = { open }
						padding = { mixins.num(vars.dim.nav.margin.xs) }
						color = { "white" }
					/>
				</BurgerWrapper>
			</MobileStuff>
			
			<Logo />
		</Inner>
	</Wrapper>
);

export default enhance(Nav);

