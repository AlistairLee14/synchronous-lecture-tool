import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { Button, Row, Col, Alert, Card } from 'reactstrap';

import getPlayer from '../use_cases/getPlayer';
import addAnswer from '../use_cases/addAnswer';
import getGame from '../use_cases/getGame';
import CenteredContainer from '../view_components/CenteredContainer';
import showCurrentQuestion from '../use_cases/showCurrentQuestion'
import Question from '../view_components/Question'
import { startTimer } from '../utils/calculateTimeLeft';

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

const AnswerGrid = ({ recordAnswer }) => {
	return (
		<Row>
		{
			['A', 'B', 'C', 'D'].map((ans) =>
			<Col sm={12} md={6} className="mb-4" key={ans}>
				<Button
				className="w-100 h-100"
				onClick={() => recordAnswer(ans)}>
					<strong>{ans}</strong>
				</Button>
			</Col>
			)
		}
		</Row>
	)
}

const PlayerRoute = (parentUrl) => {
	let { gameId, playerId } = useParams();
	// const [currentGame, setCurrentGame] = useState();
	// const [playerName, setPlayerName] = useState('');
	// const [answer, setAnswer] = useState(null);
	// const [errorMessage, setErrorMessage] = useState('');

	// const handleGameChange = (game) => {
	// 	if (game) {
	// 	// workaround to clear answer
	// 	setAnswer(null);
	// 	setCurrentGame(game);
	// 	}
	// }

	// useEffect(() => {
	// 	if (gameId && playerId) {
	// 	getGame(gameId, handleGameChange);
	// 	getPlayer(playerId, { gameId })
	// 		.then(player => setPlayerName(player.name))
	// 	}
	// }, [gameId, playerId])

	// const recordAnswer = ans => {
	// 	// playerName is for convenience later, though it feels a little like this knows more about the store than it should
	// 	addAnswer({ playerId, playerName, gameId, choice: ans })
	// 	.then(setAnswer)
	// 	.catch(e => {
	// 		setErrorMessage(e)
	// 		setTimeout(() => setErrorMessage(''), 5000)
	// 	})
	// }

	// switch (currentGame ? currentGame.state : null) {
	// 	case 'standard':
	// 		return (
	// 			<CenteredContainer maxWidth={500} verticalCentered={true}>
	// 			Next question coming up...
	// 			</CenteredContainer>
	// 		)
	// 	case 'showingQuestion':
	// 		if (answer) {
	// 			return (
	// 			<CenteredContainer maxWidth={500} verticalCentered={true}>
	// 				You chose {answer.choice}!
	// 			</CenteredContainer>
	// 			)
	// 		}

	// 		return (
	// 			<CenteredContainer maxWidth={500} verticalCentered={true}>
	// 			<Row className="mb-4">
	// 				<Col sm={12}>
	// 				<h2>Hi {playerName}!</h2>
	// 				<h3>Choose your answer:</h3>
	// 				</Col>
	// 			</Row>
	// 			<AnswerGrid recordAnswer={recordAnswer}/>
	// 			{errorMessage ? <Alert color="danger">{errorMessage}</Alert> : null}
	// 			</CenteredContainer>
	// 		);
	// 	case 'showingQuestionResults':
	// 		return (
	// 			<CenteredContainer maxWidth={500} verticalCentered={true}>
	// 			<div>Showing question results...</div>
	// 			</CenteredContainer>
	// 		);

	// 	default:
	// 		return (
	// 			<CenteredContainer maxWidth={500} verticalCentered={true}>
	// 				Waiting for lecture to start...<br/><br/>

	// 				Download the lecture files here: <br/>
	// 				lecture id: {gameId}
					
	// 			</CenteredContainer>
	// 		);
	// }
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

export default PlayerRoute
