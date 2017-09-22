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
	SmartImg,
} from "src/components/common";

import Head from "src/components/common/Head";

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
	description,
}) => (
	<TileWrapper
		className = "masonry-item"
		small
	>
		<TileInner>
			<a href = { link }>
				<TileImage>
					<SmartImg { ...image }/>
				</TileImage>
			</a>

			<TileContent>
				<a href = { link }>
					<TileTitle>{ title }</TileTitle>
				</a>

				<div dangerouslySetInnerHTML = {{
					__html: description,
				}}/>
			</TileContent>
		</TileInner>
	</TileWrapper>
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