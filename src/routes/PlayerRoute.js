import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { Button, Row, Col, Alert, Card, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CenteredContainer from '../view_components/CenteredContainer';
import { startTimer } from '../utils/calculateTimeLeft';
import KeywordInput from '../view_components/KeywordInput';
import firebase from "firebase/app";
import "firebase/database";
import HeatmapEditor from '../view_components/HeatmapEditor';
import ModalHeatmapEditor from '../view_components/ModalHeatmapEditor';

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

const KeywordBtn = ({ linkTo, gameId, setKeywordCooldown, keywordCooldown }) => {
	const [keyword, setKeyword] = useState('');


	return (
		<Link to={linkTo}>
			<KeywordInput 
				gameId={gameId}
				onChange={(e, gameId) => {

					setKeyword(e.target.value);
				}}
				keywordCooldown={keywordCooldown}
				setKeywordCooldown={setKeywordCooldown}
			/>
		</Link>
	);
}

// const HeatmapBtn = ({ linkTo }) => {
// 	return (
// 		<Link to={`/student/heatmapEditor`}>
// 			<Button color="primary">Highlight difficulty area</Button>
// 		</Link>
// 	)
// }
const HeatmapBtn = () => {
	const [modal, setModal] = useState(false);
  
	return (
		<>
			<Button color="primary" onClick={() => setModal(true)}>Highlight Difficulty Area</Button>
			<Modal isOpen={modal} toggle={() => setModal(false)}>
			<ModalHeader toggle={() => setModal(false)}>Heatmap Editor</ModalHeader>
			<ModalBody>
				<ModalHeatmapEditor />
			</ModalBody>
			<ModalFooter>
				<Button color="secondary" onClick={() => setModal(false)}>Close</Button>
			</ModalFooter>
			</Modal>
		</>
	);
};
  

  
const PlayerRoute = ({ parentUrl }) => {
	let { gameId, playerId } = useParams();
	const [summaryCooldown, setSummaryCooldown] = useState(5);
	const [keywordCooldown, setKeywordCooldown] = useState(5);
	const [showHeatmapModal, setShowHeatmapModal] = useState(false);


	const SummariseBtn = ({ summaryCooldown, gameId, setSummaryCooldown }) => {
		return (summaryCooldown <= 0) ?
			(
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
		const db = firebase.firestore();
		const timestamp = new Date();

		db.collection(`gameId/${gameId}/difficulty_points`).add({
			timestamp: timestamp
		})
		.then(function() {
			console.log("Document successfully written!");
		})
		.catch(function(error) {
			console.error("Error writing document: ", error);
		});
		
		startTimer({ seconds: 5, intervalCallback: setSummaryCooldown, endedCallback: () => setSummaryCooldown(0) });
		setSummaryCooldown(5);
	}

	const submitKeyword = ({gameId, setKeywordCooldown}) => {
		// submit keyword request to firebase with help of gameId
		startTimer({ seconds: 5, intervalCallback: setKeywordCooldown, endedCallback: () => setKeywordCooldown(0) });
		setKeywordCooldown(5);
	}

	useEffect(() => {
		if (gameId) {
			startTimer({ seconds: 5, intervalCallback: setSummaryCooldown, endedCallback: setSummaryCooldown });
			startTimer({ seconds: 5, intervalCallback: setKeywordCooldown, endedCallback: setKeywordCooldown });

		}
	}, [gameId])

	return (
		<CenteredContainer verticalCentered={true}>
			{/* Option for students to send difficulty points, request a last 30 second summary, or highlight slide sections that are difficult */}
			{/* get slidelink(s) from firebase? save links into firebase at slideuploader, then load it from here with identifier being the lecture session id */}
			
			<div style={{fontSize: '50px', fontWeight: 'bold', userSelect: 'none' }}>
				Student View
			</div>

			{/* Card for input 1 - keyword */}
			<Card body className="mt-4 mb-4">
				<KeywordBtn
					onClick={() => submitKeyword({gameId, setKeywordCooldown})}
					// linkTo={`${parentUrl}/student/keywordEntry`}
					gameId={gameId}
					setKeywordCooldown={setKeywordCooldown}
					keywordCooldown={keywordCooldown}
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
				<HeatmapBtn />
			</Card>

		</CenteredContainer>
	)
}

export default PlayerRoute
