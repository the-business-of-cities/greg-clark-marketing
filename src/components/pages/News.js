import styled from "styled-components";
import masonry from "masonry-layout";
import { lifecycle, } from "recompose";
import { Link, } from "react-router-dom";

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
		},
		500
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
	width: 50%;
	float: left;
`;

const TileInner = styled(GridCell)`
	${mixins.shadow(1)}
	background-color: white;
`;

const TileTitle = styled.h2`
`;

const NewsTile = ({
	image,
	title,
	link,
	html,
	slug,
}) => (
	<TileWrapper className = "masonry-item">
		<TileInner>
			<TextCell>		
				<Link to = { "/news/" + slug }>
					<TileTitle>{ title }</TileTitle>
				</Link>
				{
					image
					? <SmartImg { ...image }/>
					: null
				}
				<div dangerouslySetInnerHTML = {{
					__html: html,
				}}/>
			</TextCell>
		</TileInner>		
	</TileWrapper>
);

const Publications = () => (
	<Container>
		<TextCell>
			<h1>News</h1>
		</TextCell>
		<TilesWrapper className = "masonry-items">
			{
				data.news
				.map((props, i) => <NewsTile { ...props } key = { props.slug + i }/>)
			}
		</TilesWrapper>
	</Container>
);

export default enhance(Publications);