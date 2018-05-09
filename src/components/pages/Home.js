import styled from "styled-components";

import { Link, } from "react-router-dom";

import {
	Container,
	TextCell,
	TileWrapper,
	Icon,
} from "src/components/common";

import Head from "src/components/common/Head";

import * as mixins from "../style/mixins";

import routesConfig from "src/routesConfig";
import Data from "src/data";

// --------------------------------------------------

const OneTwoWrapper = styled(Container)`
	display: flex;
	flex-wrap: wrap;

	> div {
		&:first-child {
			flex-basis: 33.33%;
			${ mixins.xs`flex-basis: 100%` };

			h1 {
				margin-top: 0;
			}
		}

		&:nth-child(2) {
			flex-basis: 66.67%;
			${ mixins.xs`flex-basis: 100%` };

			p {
				margin-top: 0.5em;
			}
		}
	}
`;

const ThirdsWrapper = styled(Container)`
	display: flex;
	flex-wrap: wrap;

	> div {
		flex-basis: 33.33%;
		${ mixins.xs`flex-basis: 100%` };
		font-size: 0.9em;

		a {
			&,
			&:hover,
			&:visited,
			&:active {
				font-weight: bold;
			}

			&:hover,
			&:active {
			}
		}
	}
`;

const BannerDesktop = styled.img`
	width: 100%;
	height: auto;
	max-height: 400px;

	object-fit: cover;
	object-position: top;

	${ mixins.xs`display: none;` };
`;

const BannerMobile = styled.div`
	width: 100%;
	padding-top: 55%;

	background-color: rgba(0, 0, 0, 0.2);
	background-image: url(${ R.prop("src") });
	background-size: cover;
	background-position: center center;
	background-repeat: no-repeat;

	${ mixins.bp.sm.min`display: none;` };
`;

const HomePageWrapper = styled.div`
	position: relative;
	overflow: hidden;
`;

const ArrowIcon = () => (
	<Icon type = "arrow-right" size = "0.9em" marginLeft = "0.1em" />
);

// --------------------------------------------------

const Home = () => (
	<HomePageWrapper>
		<Head />

		<BannerMobile src = { Data.homeImage.url } />
		<BannerDesktop src = { Data.homeImage.url } />

		<OneTwoWrapper>
			<TileWrapper>
				<h1>
					Global Advisor.<br />
					Chairman.<br />
					Speaker.<br />
					Moderator.<br />
				</h1>
			</TileWrapper>

			<TileWrapper>
				<p>{Data.homeDescription}</p>
			</TileWrapper>
		</OneTwoWrapper>

		<Container>
			<TextCell>
				<h2>Greg's Work</h2>
			</TextCell>
		</Container>

		<ThirdsWrapper>
			{routesConfig.filter(R.prop("service")).map(page => (
				<TileWrapper>
					<h3>{page.title}</h3>

					<p>{page.description}</p>

					<p>
						<Link to = { page.slug }>
							Find out more <ArrowIcon />
						</Link>
					</p>
				</TileWrapper>
			))}
		</ThirdsWrapper>
	</HomePageWrapper>
);

export default Home;
