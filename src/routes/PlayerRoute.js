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
import KeywordInput from '../view_components/KeywordInput';
import firebase from "firebase/app";
import "firebase/database";

const SECONDS_TO_QUESTION = 10;

const firebaseConfig = {
	// your Firebase configuration
	apiKey: "AIzaSyCgz1Jo6ueG0pTIC4mwhaD6kGa0ehIWLsQ",
	authDomain: "synchronous-lecture-tool.firebaseapp.com",
	projectId: "synchronous-lecture-tool",
	storageBucket: "synchronous-lecture-tool.appspot.com",
	messagingSenderId: "237302221266",
	appId: "1:237302221266:web:373375efd019c40b81e00b",
	measurementId: "G-YSQFTPKE7E", 	
	databaseURL: "https://synchronous-lecture-tool.firebaseio.com"
};
  
firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const KeywordBtn = ({ linkTo, gameId }) => {
	const [keyword, setKeyword] = useState('');

	const submitKeyword = (gameId, keyword) => {
		// Write the keyword to the Firebase database
		// database.ref('keywords').push({ keyword });
		const keywordsRef = firebase.firestore().collection(`gameId/${gameId}/keywords`);
		keywordsRef.add({
			keyword,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		})
		.then(function(docRef) {
			console.log("Keyword written with ID: ", docRef.id);
		})
		.catch(function(error) {
			console.error("Error adding keyword: ", error);
		});
		console.log(keywordsRef.toString());

		console.log("pushed: " + `/gameId/${gameId}/keywords`);
	};

	return (
		<Link to={linkTo}>
		<Button color="primary">Enter a keyword</Button>
		<KeywordInput onChange={(e) => setKeyword(e.target.value)} />
		<Button onClick={() => submitKeyword(gameId, keyword)}>Submit</Button>
		</Link>
	);
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
	const [summaryCooldown, setSummaryCooldown] = useState(5);

	const SummariseBtn = ({ summaryCooldown, gameId, setSummaryCooldown }) => {
		console.log("cooldown: " + summaryCooldown);
		return (summaryCooldown <= 0) ?
			(
				// <Button onClick={submitSummarise(gameId, setSummaryCooldown)} color="primary">
				// 	Request a summary
				// </Button>
				<Button onClick={() => submitSummarise({gameId, setSummaryCooldown})} color="primary">
					Request a summary
				</Button>
			) 
			:
			(
				<Button disabled color="primary">
					Not yet able to request another summary
				</Button>
			)
	}

	const submitSummarise = ({gameId, setSummaryCooldown}) => {
		// submit summary request to firebase with help of gameId
		startTimer({ seconds: 5, intervalCallback: setSummaryCooldown, endedCallback: () => setSummaryCooldown(0) });
		setSummaryCooldown(5);
		console.log("cooldown set to 5");
	}

	useEffect(() => {
		if (gameId) {
			startTimer({ seconds: 5, intervalCallback: setSummaryCooldown, endedCallback: setSummaryCooldown });
			// showCurrentQuestion(gameId).then(setQuestion);
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
					gameId={gameId}
				/>
					
			</Card>

			{/* Card for input 2 - summarise last topic */}
			<Card body className="mt-4 mb-4">
				<SummariseBtn 
					summaryCooldown={summaryCooldown}
					gameId={gameId}
					setSummaryCooldown={setSummaryCooldown}
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
