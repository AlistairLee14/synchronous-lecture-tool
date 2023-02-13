import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { Button, Card } from 'reactstrap';

import showCurrentQuestion from '../use_cases/showCurrentQuestion'
import Question from '../view_components/Question'
import { startTimer } from '../utils/calculateTimeLeft';
import CenteredContainer from '../view_components/CenteredContainer';

const SECONDS_TO_QUESTION = 10;

const KeywordBtn = ({ linkTo }) => {
	return (
		<Link to={linkTo}>
			<Button color="primary">Enter a keyword</Button>
		</Link>
	)
}

const HeatmapBtn = ({ linkTo }) => {
	return (
		<Link to={linkTo}>
			<Button color="primary">Highlight difficulty area</Button>
		</Link>
		)
}





const DefaultStudentView = ({ parentUrl }) => {
	let { gameId } = useParams();
	const [question, setQuestion] = useState(null);
	const [timeLeft, setTimeLeft] = useState(SECONDS_TO_QUESTION);
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
			showCurrentQuestion(gameId).then(setQuestion);
		}
	}, [gameId])

	return (
		<CenteredContainer verticalCentered={true}>
		{/* {question ?
			<div>
				<Question question={question} />
				<div className="mt-4">Time left:</div>
				<div className="display-1">
				{Math.ceil(timeLeft)}
				</div>
				<ShowResultsBtn
				isVisible={timeLeft <= 0}
				linkTo={`${parentUrl}/results/${question.id}`}
				/>
			</div>
			: <div>Loading...</div>
		} */}

		{/* Option for students to send difficulty points, request a last 30 second summary, or highlight slide sections that are difficult */}
		{/* get slidelink(s) from firebase? save links into firebase at slideuploader, then load it from here with identifier being the lecture session id */}
		
		
		{/* Card for input 1 - keyword */}
		<Card body className="mt-4 mb-4">
			<KeywordBtn
				linkTo={`${parentUrl}/student/keywordEntry`}
			/>
				
		</Card>

		{/* Card for input 2 - summarise last topic */}
		<Card body className="mt-4 mb-4">
			{/* <KeywordBtn
				onclick={submitSummarise(gameId)}
			/> */}
			<SummariseBtn 
				isClickable = {summaryCooldown <= 0}
				gameId={gameId}
			/>
			
		</Card>

		{/* Card for input 3 - heatmap */}
		<Card body className="mt-4 mb-4">
			<HeatmapBtn
				linkTo={`${parentUrl}/student/heatmapEntry`}
			/>
				
		</Card>

		</CenteredContainer>
	)
}

export default DefaultStudentView
