import styled from "styled-components";

import { 
	PageWrapper,
	PageBody,
	PageImage,
	Container,
	TextCell,
} from "src/components/common";

import Generic from "./Generic";

import * as mixins from "src/components/style/mixins";

import data from "src/data";

// --------------------------------------------------

const logosPerRow = {
	xs: 3,
	sm: 4,
	md: 5,
	lg: 5,
};

const logoWidths = R.map(n => `${100 / n}%`)(logosPerRow);

const Logos = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	margin-top: 4em;
`;

const LogoWrapper = styled.div`
	${mixins.bpEach("width", logoWidths)}
	filter: grayscale(1);
	opacity: 0.5;
`;

const LogoInner = styled.div`
	width: 100%;
	padding-top: 60%;
	position: relative;
`;

const LogoImage = styled.div`
	${mixins.contained("12%")}
	background-image: url(${R.prop("src")});
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center center;
`;

const logos = R.pipe(
	arr => R.repeat(arr, 10),
	R.unnest
)(data.logos);

export default props => (
	<Generic { ...props }>
		<Logos>
			{
				(logos || []).map(({ url, }, i) => (
					<LogoWrapper key = { i }>
						<LogoInner>
							<LogoImage src = { url }/>
						</LogoInner>
					</LogoWrapper>
				))
			}
		</Logos>
	</Generic>
);