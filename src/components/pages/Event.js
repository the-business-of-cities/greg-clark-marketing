import styled from "styled-components";
import Moment from "moment";

import { 
	Container, 
	TextCell, 
	GridCell,
} from "src/components/common";

import * as vars from "src/components/style/vars";

import Data from "src/data";

// --------------------------------------------------

const EventWrapper = styled.div`
	position: relative;
	overflow: hidden;
	margin-bottom: 1em;

	&:hover {
		opacity: 0.7;
	}
`;

const EventImage = styled.img`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: -1;
`;

const EventBody = styled.div`
	margin-top: 1em;
	margin-bottom: 3em;
	background: ${ vars.colors.bg };
	padding: 1.5em;
`;

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
	<div>
		<EventWrapper>
			<Container>
				<TextCell>
					<EventBody>
						<h1>{ event.name }</h1>

						<EventDate>{ Moment(event.date).format('Do MMMM YYYY') }, { event.location }</EventDate>

						<EventRole>{ event.role }</EventRole>

						<p>{ event.description }</p>

						<p>{ event.content }</p>
					</EventBody>
				</TextCell>
			</Container>
			
			<EventImage src={ event.image.url }/>
		</EventWrapper>
	</div>
);

export default Event;