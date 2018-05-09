import { createClient, } from "contentful-management";
import { compose, lifecycle, withHandlers, withState, } from "recompose";
import { Route, } from "react-router-dom";
import styled from "styled-components";

import { Container, GridCell, } from "src/components/common";
import { createPublication, onSubmitPublicationsXml, } from "./publications";
import { createNews, onSubmitNewsXml, } from "./news";

// --------------------------------------------------

const Input = styled.textarea`
	width: 25em;
	height: 15em;
`;

const enhance = compose(
	withState("space", "setSpace", null),
	withState("xml", "setXml", ""),
	withHandlers({
		createPublication,
		createNews,
		onChangeXml: ({ setXml, }) => e => setXml(e.target.value),
	}),
	withHandlers({
		onSubmitPublicationsXml,
		onSubmitNewsXml,
	}),
	lifecycle({
		componentDidMount() {
			this.client = createClient({
				accessToken: this.props.match.params.accessToken,
			});
			this.client
				.getSpace(this.props.match.params.spaceId)
				.then(space => {
					this.props.setSpace(space);
				});
		},
	}),
);

const Import = props => (
	<Container>
		<GridCell>
			<Input onChange = { props.onChangeXml } />

			<div>
				<button onClick = { props.onSubmitPublicationsXml }>
					Import Publications
				</button>

				<button onClick = { props.onSubmitNewsXml }>Import News</button>
			</div>
		</GridCell>
	</Container>
);

const EnhancedImport = enhance(Import);

export default () => (
	<Route path = "/import/:spaceId/:accessToken" component = { EnhancedImport } />
);
