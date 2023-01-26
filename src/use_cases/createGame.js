import GameStore from '../store/GameStore';


const createGame = (attributes, gameStore = new GameStore()) => {
  const shortCode = String(Math.floor(Math.random() * Math.floor(9999))); // generate a random shortcode
  return gameStore.create(Object.assign({ shortCode }, attributes));
};

export default createGame;
