import styled from "styled-components";

import { 
	PageWrapper,
	PageBody,
	PageImage,
	Container,
	TextCell,
} from "src/components/common";

// --------------------------------------------------



// --------------------------------------------------

const Generic = ( page ) => (
	<PageWrapper>
		<Container>
			<TextCell>
				<PageBody>
					<h1>{ page.title }</h1>

					<div dangerouslySetInnerHTML = {{
						__html: page.html,
					}}/>
				</PageBody>
			</TextCell>
		</Container>
		
		<PageImage src = { page.image.url }/>
	</PageWrapper>
);

export default Generic;