import styled from "styled-components";
import masonry from "masonry-layout";
import { lifecycle, } from "recompose";

import Data from "src/data";

import {
	PageWrapper,
	PageBody,
	PageImage,
	Container,
	TextCell,
	GridCell,
	SmartImg,
} from "src/components/common";

import * as mixins from "src/components/style/mixins";
import * as vars from "src/components/style/vars";

// --------------------------------------------------

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
		0
	);
};

const enhance = lifecycle({
	componentDidMount() {
		doMasonry();
	},
});

const TilesWrapper = styled.div`
	${mixins.clearfix}
`;

const TileWrapper = styled(GridCell)`
	width: 33.3333333333333%;
	${ mixins.xs`width: 100%` };
	float: left;
`;

const TileInner = styled(GridCell)`
	//background-color: white;
	//border: 1px solid ${R.path(["theme", "borders",])};
	//box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
	background: ${ vars.colors.bgdark };
	${ mixins.bp.sm.min`padding : 0` };
`;

const TileTitle = styled.h3`
	margin-top: 0;
`;

const PublicationTile = ({
	image,
	title,
	link,
}) => (
	<TileWrapper className = "masonry-item">
		<a href = { link }>
			<TileInner>
				<GridCell>
					<SmartImg { ...image }/>

					<TileTitle>{ title }</TileTitle>
				</GridCell>

				<TextCell>
					<TileTitle>{ title }</TileTitle>
				</TextCell>
			</TileInner>
		</a>
	</TileWrapper>
);

const Publications = () => (
	<PageWrapper>
		<Container>
			<TextCell>
				<PageBody>
					<h1>{ Data.pagesMap.publications.title }</h1>
			
					<div dangerouslySetInnerHTML = {{
						__html: Data.pagesMap.publications.html,
					}}/>

					<TilesWrapper className = "masonry-items">
						{
							Data.publications
							.map((props, i) => <PublicationTile { ...props } key = { props.slug + i }/>)
						}
					</TilesWrapper>
				</PageBody>
			</TextCell>
		</Container>
		
		<PageImage src = { Data.pagesMap.publications.image.url }/>
	</PageWrapper>
);

export default enhance(Publications);