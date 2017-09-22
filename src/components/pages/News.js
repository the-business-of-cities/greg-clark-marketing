import styled from "styled-components";
import masonry from "masonry-layout";
import { lifecycle, } from "recompose";
import { Link, } from "react-router-dom";

import Data from "src/data";
import {
	Container,
	TextCell,
	GridCell,
	SmartImg,
	PageWrapper,
	PageBody,
	PageImage,
	TilesWrapper,
	TileWrapper,
	TileInner,
	TileTitle,
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
		},
		500
	);
};

const enhance = lifecycle({
	componentDidMount() {
		doMasonry();
	},
});

// --------------------------------------------------

const NewsTile = ({
	image,
	title,
	link,
	html,
	slug,
}) => (
	<TileWrapper className = "masonry-item">
		<TileInner>	
			<GridCell>
				<Link to = { "/blog/" + slug }>
					{
						image
						? <SmartImg { ...image }/>
						: null
					}
				</Link>
			</GridCell>

			<TextCell>
				<Link to = { "/blog/" + slug }>
					<TileTitle>{ title }</TileTitle>
				</Link>

				<div dangerouslySetInnerHTML = {{
					__html: html,
				}}/>
			</TextCell>
		</TileInner>		
	</TileWrapper>
);

// --------------------------------------------------

const Publications = ( page ) => (
	<PageWrapper>
		<Container>
			<TextCell>
				<PageBody>
					<h1>{ Data.pagesMap.blog.title }</h1>

					<div dangerouslySetInnerHTML = {{
						__html: Data.pagesMap.blog.html,
					}}/>

					<TilesWrapper className = "masonry-items">
						{
							Data.news
							.map((props, i) => <NewsTile { ...props } key = { props.slug + i }/>)
						}
					</TilesWrapper>
				</PageBody>
			</TextCell>
		</Container>
		
		<PageImage src = { Data.pagesMap.blog.image.url }/>
	</PageWrapper>
);

export default enhance(Publications);