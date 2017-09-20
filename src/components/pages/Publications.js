import styled from "styled-components";
import masonry from "masonry-layout";
import { lifecycle, } from "recompose";

import data from "src/data";
import { Container, TextCell, GridCell, SmartImg, LineCell, } from "src/components/common";
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
	float: left;
`;

const TileInner = styled(GridCell)`
	${mixins.shadow(1)}
	background-color: white;
	padding: 0.5em;
`;

const TileTitle = styled.div`
	font-weight: bold;
	line-height: 1.1;
	margin-top: 0.75em;
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

			</TileInner>
		</a>
	</TileWrapper>
);

const Publications = () => (
	<Container>
		<TextCell>
			<div dangerouslySetInnerHTML = {{
				__html: data.pagesMap.publications.html,
			}}/>
		</TextCell>
		<LineCell/>
		<TilesWrapper className = "masonry-items">
			{
				data.publications
				.map((props, i) => <PublicationTile { ...props } key = { props.slug + i }/>)
			}
		</TilesWrapper>
	</Container>
);

export default enhance(Publications);