import styled from "styled-components";

import { 
	PageWrapper,
	PageBody,
	PageImage,
	Container,
	TextCell,
} from "src/components/common";

import * as mixins from "src/components/style/mixins";

import Head from "src/components/common/Head";

// --------------------------------------------------

export const SecondaryImage = styled.div`
	${mixins.bp.sm.min`margin-top: -6.5em;`}

	img {
		width: 100%;
	}
`;

// --------------------------------------------------

const Generic = ( page ) => (
	<PageWrapper>
		<Head
			pageData = { page }
		/>

		<Container>
			<TextCell>
				<PageBody>
					<h1>{ page.fullTitle || page.title }</h1>

					{
						page.secondaryImage
						? <SecondaryImage><img src = { page.secondaryImage.url }/></SecondaryImage>
						: null
					}


					<div dangerouslySetInnerHTML = {{
						__html: page.html,
					}}/>

					{ page.children }
				</PageBody>
			</TextCell>
		</Container>
		
		<PageImage src = { page.image.url }/>
	</PageWrapper>
);

export default Generic;