import styled from "styled-components";
import masonry from "masonry-layout";
import imagesloaded from "imagesloaded";
import { lifecycle, } from "recompose";

import data from "src/data";
import { Container, TextCell, GridCell, SmartImg, } from "src/components/common";
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
	border: 1px solid ${R.path(["theme", "borders",])};
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
`;

const TileTitle = styled.h3`

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
				</GridCell>
				<TextCell>
					<TileTitle>{ title }</TileTitle>
				</TextCell>

			</TileInner>
		</a>
	</TileWrapper>
);

const Publications = () => (
	<Container>
		<TextCell>
			<h1>Publications</h1>
			<p>loersk fhdjhjhdfjghdfkjhjk dfhjhdfjkhk dfj dkfj dfg.</p>
		</TextCell>
		<TilesWrapper className = "masonry-items">
			{
				data.publications
				.map((props, i) => <PublicationTile { ...props } key = { props.slug + i }/>)
			}
		</TilesWrapper>
	</Container>
);

export default enhance(Publications);