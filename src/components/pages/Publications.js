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
	TileTitle,
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

const PublicationTile = ({
	image,
	title,
	link,
}) => (
	<TileWrapper
		className = "masonry-item"
		small
	>
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