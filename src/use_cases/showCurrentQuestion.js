import GameStore from '../store/GameStore';
import QuestionStore from '../store/QuestionStore';

const showCurrentQuestion = (gameId, gameStore = new GameStore(), questionStore = new QuestionStore()) => {
  gameStore.update(gameId, { state: 'inProgress' });
  console.log(gameId);
  return gameStore
    .get(gameId)
    .then(game => {
      console.log(game);

      return questionStore.get(game.currentQuestion)
    });
}

export default showCurrentQuestion;
