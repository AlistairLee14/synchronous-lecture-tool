import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom"
import { Button, Row, Col, Alert, Card, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CenteredContainer from '../view_components/CenteredContainer';
import { startTimer } from '../utils/calculateTimeLeft';
import KeywordInput from '../view_components/KeywordInput';
import firebase from "firebase/app";
import "firebase/database";
import HeatmapEditor from '../view_components/HeatmapEditor';



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

const KeywordBtn = ({ gameId, setKeywordCooldown, keywordCooldown }) => {
	const [keyword, setKeyword] = useState('');


	return (
			<KeywordInput 
				gameId={gameId}
				onChange={(e, gameId) => {

					setKeyword(e.target.value);
				}}
				keywordCooldown={keywordCooldown}
				setKeywordCooldown={setKeywordCooldown}
			/>
	);
}
  
const HeatmapBtn = ({ linkTo, gameId }) => {
	const [showHeatmapModal, setShowHeatmapModal] = useState(false);

	const toggleHeatmapModal = () => {
		setShowHeatmapModal(!showHeatmapModal);
	}

	return (
		<>
			<Button color="primary" onClick={toggleHeatmapModal}>Highlight difficulty area</Button>
			<Modal isOpen={showHeatmapModal} toggle={toggleHeatmapModal} style={{ height: '80vh !important', maxWidth: '80vw', position: 'absolute !important' }}>
				<ModalHeader toggle={toggleHeatmapModal}>Heatmap Editor</ModalHeader>
				<ModalBody>
					<HeatmapEditor gameId={gameId} setShowHeatmapModal={setShowHeatmapModal} />
				</ModalBody>
				<ModalFooter>
					<Button color="secondary" onClick={toggleHeatmapModal}>Cancel</Button>
				</ModalFooter>
			</Modal>
		</>
	)
}
  

  
const PlayerRoute = ({ parentUrl }) => {
	let { gameId, playerId } = useParams();
	const [summaryCooldown, setSummaryCooldown] = useState(5);
	const [keywordCooldown, setKeywordCooldown] = useState(5);
	const [showHeatmapModal, setShowHeatmapModal] = useState(false);
	const [gameTitle, setGameTitle] = useState('');
	const [sessionCode, setSessionCode] = useState('');

	useEffect(() => {
		// Retrieve the game title from Firebase when the component mounts
		const db = firebase.firestore();
		db.collection('games')
		  .doc(gameId)
		  .get()
		  .then((doc) => {
			if (doc.exists) {
			  setGameTitle(doc.data().name);
			  setSessionCode(doc.data().shortCode);
			}
		  })
		  .catch((error) => {
			console.error('Error retrieving game title:', error);
		  });
	  }, [gameId]);

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
			
			<div style={{fontSize: '50px', fontWeight: 'bold', userSelect: 'none' }}>
				Student - {gameTitle}
			</div>

			<div style={{ position: 'absolute', top: 0, right: 0, margin: '10px', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#A7C7E7', padding: '5px 10px', borderRadius: '5px' }}>
				Session code: {sessionCode}
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
				<HeatmapBtn gameId={gameId} setShowHeatmapModal={setShowHeatmapModal}/>
			</Card>

		</CenteredContainer>
	)
}

export default PlayerRoute
