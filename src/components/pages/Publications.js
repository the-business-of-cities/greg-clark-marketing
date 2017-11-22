import styled from "styled-components";
import masonry from "masonry-layout";
import { lifecycle, } from "recompose";

import Data from "src/data";

import {
	PageWrapper,
	PageBody,
	PageImage,
	TilesWrapper,
	TileWrapper,
	TileInner,
	TileImage,
	TileTitle,
	TileContent,
	Container,
	TextCell,
	GridCell,
	AntiGridCell,
	SmartImg,
} from "src/components/common";

import Head from "src/components/common/Head";

import * as mixins from "src/components/style/mixins";
import * as vars from "src/components/style/vars";

// --------------------------------------------------

const PubsWrapper = styled(AntiGridCell)`
	padding-top: 2em;
	${mixins.bp.sm.min`margin: 0;`}
`;

const borderWidth = 2;

const PubWrapper = styled(GridCell)`
	width: calc(33.33333333333% + ${borderWidth}px);
	${mixins.bp.sm.max`width: calc(50% + ${borderWidth}px);`}
	border: ${borderWidth}px solid ${ vars.colors.bgdark };
	margin: -${borderWidth * 0.5}px;
	padding-bottom: 0;
`;

const PubText = styled.div`
	font-size: 0.8em;
`;

const PubTitle = styled.p`
	font-family: ${vars.font.title.family};
	font-size: 1.25em;
    font-weight: bold;
`;

const doMasonry = () => {
	setTimeout(
		() => {
			const masonryInstance = new masonry(".masonry-items", {
				itemSelector: ".masonry-item",
				percentPosition: true,
			});
			// const imagesloadedInstance = new imagesloaded(
			// 	".masonry-items",
			// 	() => masonryInstance.layout()
			// );
		},
		2000
	);
};

const enhance = lifecycle({
	componentDidMount() {
		doMasonry();
	},
});

const PublicationTile = ({
	image,
	title,
	link,
	description,
}) => (
	<a href = { link }>
		<PubWrapper
			className = "masonry-item"
		>
			<GridCell>
			<SmartImg { ...image } unlimitedHeight/>
			<PubText>
				<PubTitle>{ title }</PubTitle>
				<div dangerouslySetInnerHTML = {{
					__html: description,
				}}/>
			</PubText>
			</GridCell>
		</PubWrapper>
	</a>
);

const Publications = () => (
	<PageWrapper>
		<Head
			pageData = { Data.pagesMap.publications }
		/>

		<Container>
			<TextCell>
				<PageBody>
					<h1>{ Data.pagesMap.publications.title }</h1>
			
					<div dangerouslySetInnerHTML = {{
						__html: Data.pagesMap.publications.html,
					}}/>

					<h2>Recent Publications</h2>

					<PubsWrapper className = "masonry-items">
						{
							Data.publications
							.map((props, i) => <PublicationTile { ...props } key = { props.slug + i }/>)
						}
					</PubsWrapper>
				</PageBody>
			</TextCell>
		</Container>
		
		<PageImage src = { Data.pagesMap.publications.image.url }/>
	</PageWrapper>
);

export default enhance(Publications);