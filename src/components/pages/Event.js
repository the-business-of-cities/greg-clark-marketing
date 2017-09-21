import styled from "styled-components";
import Moment from "moment";

import {
	PageWrapper,
	PageBody,
	PageImage,
	Container, 
	TextCell, 
} from "src/components/common";

// --------------------------------------------------

const EventDate = styled.div`
	font-size: 0.8em;
	opacity: 0.9;
`;

const EventRole = styled.div`
	font-size: 0.8em;
	opacity: 0.9;
	margin-bottom: 0.5em;
`;

// --------------------------------------------------

const Event = ( { event, title, } ) => (
	<PageWrapper>
		<Container>
			<TextCell>
				<PageBody>
					<h1>{ event.name }</h1>

					<EventDate>{ Moment(event.date).format('Do MMMM YYYY') }, { event.location }</EventDate>

					<EventRole>{ event.role }</EventRole>

					<p>{ event.description }</p>

					<p>{ event.content }</p>
				</PageBody>
			</TextCell>
		</Container>
		
		<PageImage src = { event.image.url }/>
	</PageWrapper>
);

export default Event;