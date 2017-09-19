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

const Event = styled.div`
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
	width: 65%;
	background: ${ vars.colors.bg };
	padding: 1em;

	h4 {
		margin: 0;
	}
`;

const EventDate = styled.div`
	font-size: 0.8em;
	opacity: 0.9;
`;

const EventLocation = styled.div`
	font-size: 0.8em;
	opacity: 0.9;
	margin-bottom: 0.5em;
`;

// --------------------------------------------------

const Events = ({ html, }) => (
	<Container>
		<TextCell>
			<h1>{ Data.pagesMap.events.title }</h1>

			<div dangerouslySetInnerHTML = {{
				__html: Data.pagesMap.events.html,
			}}/>

			<h2>Upcoming events</h2>

			{	
				Data.events.map( event => {
					return (
						<Event>
							<EventBody>
								<h4>{ event.name }</h4>

								<EventDate>{ Moment(event.date).format('Do MMMM YYYY') }</EventDate>

								<EventLocation>{ event.location }</EventLocation>

								<div>{ event.description }</div>
							</EventBody>

							<EventImage src={ event.image.url }/>
						</Event>
					);
				})
			}
		</TextCell>
	</Container>
);

export default Events;