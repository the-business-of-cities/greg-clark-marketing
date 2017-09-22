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
	TileImage,
	TileContent,
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
	description,
	slug,
}) => (
	<TileWrapper className = "masonry-item">
		<TileInner>	
			<Link to = { link ? link : "/blog/" + slug }>
				<TileImage>
					<SmartImg { ...image }/>
				</TileImage>
			</Link>

			<TileContent>
				<Link to = { link ? link : "/blog/" + slug }>
					<TileTitle>{ title }</TileTitle>
				</Link>

				<div>{ description }</div>
			</TileContent>
		</TileInner>		
	</TileWrapper>
);

// --------------------------------------------------

const Publications = ( ) => (
	<PageWrapper>
		<Head
			pageData = { Data.pagesMap.blog }
		/>

		<Container>
			<TextCell>
				<PageBody>
					<h1>{ Data.pagesMap.blog.title }</h1>

					<div dangerouslySetInnerHTML = {{
						__html: Data.pagesMap.blog.html,
					}}/>

					<h2>Recent Posts</h2>

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