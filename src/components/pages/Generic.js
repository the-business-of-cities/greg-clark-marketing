import { Container, TextCell, } from "src/components/common";

const Generic = ({ html, }) => (
	<Container>
		<TextCell>
			<div dangerouslySetInnerHTML = {{
				__html: html,
			}}/>
		</TextCell>
	</Container>
);

export default Generic;