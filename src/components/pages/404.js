import Head from "src/components/common/Head";

import {
	PageWrapper,
	PageBody,
	PageImage,
	Container,
	TextCell,
} from "src/components/common";

export default () => (
	<PageWrapper>
		<Head pageData = { null } />

		<Container>
			<TextCell>
				<PageBody>
					<h1>404</h1>

					<p>Whoops, this page doesn't exist.</p>
				</PageBody>
			</TextCell>
		</Container>
	</PageWrapper>
);
