import styled from "styled-components";
import Moment from "moment";
import { Link, } from "react-router-dom";

import {
	PageWrapper,
	PageBody,
	PageImage,
	Container, 
	TextCell,
} from "src/components/common";

import Head from "src/components/common/Head";

import * as mixins from "../style/mixins";
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
	bottom: 0;
	left: 3em;
	margin: auto;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	z-index: 0;
	opacity: 0.7;
`;

const EventBody = styled.div`
	background: ${ vars.colors.bg };
	margin-bottom: 3em;
	margin-top: 1em;
	padding: 1em;
	position: relative;
	width: 65%;
	z-index: 2;
	background: ${ vars.colors.bgdark };

	${ mixins.xs`width: 80%` };

	h4 {
		margin: 0;
	}
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

const orderEvents = (events, future, condensed, ) => {
	return events.sort( (a, b) => {
		return Moment(a.date).diff(Moment(b.date));
	})
	.filter( event => future ? Moment(event.date).diff(Moment()) >= 0 : Moment(event.date).diff(Moment()) < 0 )
	.map( event => {
		return (
			<Link 
				to = {`/events/${ event.slug }`}
				key = { event.date }
			>
				<EventWrapper>
					<EventBody>
						<h4>{ event.name }</h4>

						<EventDate>{ Moment(event.date).format('Do MMMM YYYY') }, { event.location }</EventDate>

						<EventRole>{ event.role }</EventRole>

						{ 
							condensed
							? null
							: <div>{ event.description }</div>
						}
					</EventBody>

					<EventImage src={ event.image.url }/>
				</EventWrapper>
			</Link>
		);
	})
};

const Events = () => (
	<PageWrapper>
		<Head
			pageData = { Data.pagesMap.events }
		/>

		<Container>
			<TextCell>
				<PageBody>
					<h1>{ Data.pagesMap.events.title }</h1>

					<div dangerouslySetInnerHTML = {{
						__html: Data.pagesMap.events.html,
					}}/>

					<h2>Upcoming events</h2>

					{	
						orderEvents(Data.events, true, false)
					}

					<h2>Past events</h2>

					{	
						orderEvents(Data.events, false, true)
					}
				</PageBody>
			</TextCell>
		</Container>
		
		<PageImage src = { Data.pagesMap.events.image.url }/>
	</PageWrapper>
);

export default Events;