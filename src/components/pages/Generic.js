import { Container, TextCell, } from "src/components/common";

const Generic = ({ title, html, }) => (
	<Container>
		<TextCell>
			<h1>{ title }</h1>

			<div dangerouslySetInnerHTML = {{
				__html: html,
			}}/>
		</TextCell>
	</Container>
);

export default Generic;