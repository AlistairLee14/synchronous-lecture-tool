import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { Button, Card } from 'reactstrap';

import showCurrentQuestion from '../use_cases/showCurrentQuestion';
import Question from '../view_components/Question';
import { startTimer } from '../utils/calculateTimeLeft';
import CenteredContainer from '../view_components/CenteredContainer';
import DifficultyCounter from '../use_cases/DifficultyCounter';
import KeywordDisplay from '../use_cases/KeywordDisplay';
import CountTracker from '../view_components/CountTracker';

const DefaultHostView = ({ parentUrl }) => {
	let { gameId } = useParams();
	const [question, setQuestion] = useState(null);
	const [summaryCooldown, setSummaryCooldown] = useState(0);

	const SummariseBtn = ({ isClickable, gameId }) => {
		return isClickable ?
			(
				<Button onClick={submitSummarise(gameId)} color="primary">Request a summary</Button>
			) 
			:
			(
				<Button disabled color="primary">Not yet able to request another summary</Button>
			)
	}

	const submitSummarise = ({gameId}) => {
		// submit summary request to firebase with help of gameId
		setSummaryCooldown(3);
		console.log("summarise!");
	}

	useEffect(() => {
		if (gameId) {
			startTimer({ seconds: 0, intervalCallback: setSummaryCooldown, endedCallback: setSummaryCooldown });
			// showCurrentQuestion(gameId).then(setQuestion);
		}
	}, [gameId]);

	return (
		<CenteredContainer verticalCentered={true}>
		
			{/* Option for students to send difficulty points, request a last 30 second summary, or highlight slide sections that are difficult */}
			{/* get slidelink(s) from firebase? save links into firebase at slideuploader, then load it from here with identifier being the lecture session id */}
			
			<div body className="mt-4 mb-4" style={{ fontSize: '50px', fontWeight: 'bold', userSelect: 'none', wordWrap: 'break-word', minWidth: '300px', minHeight: '50px',maxHeight:'200px',position: 'relative', zIndex: 1, }}>
				Lecturer View
			</div>

			{/* Card for input 1 - keyword */}
			<Card body className="mt-4 mb-4" style={{ width: '100%', minWidth: 'min-content', minHeight: 'min-content'}}>
				<KeywordDisplay gameId={gameId} />
			</Card>

			<div style={{ display: 'flex', flexDirection: 'row' }}>
				{/* Card for input 2 - difficulty points in the last 5 minutes */}
				<Card body className="mt-4 mb-4" style={{ width: '30%', minWidth: 'min-content', minHeight: 'min-content',maxHeight:'200px', marginRight: '20px' }}>
					<DifficultyCounter gameId={gameId}/>
				</Card>

				{/* Card for input 3 - heatmap */}
				<Card body className="mt-4 mb-4" style={{ width: '70%', minHeight: "min-content", minWidth: "min-content"}}>
					<CountTracker gameId={gameId} />
				</Card>
			</div>
	  	</CenteredContainer>
	)
}
  
export default DefaultHostView
