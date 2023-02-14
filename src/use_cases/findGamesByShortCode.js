import GameStore from '../store/GameStore';
// import Game from '../entities/Game';


const findGamesByShortCode = (shortCode) => {
  // var res = new GameStore().list({ shortCode: String(shortCode), state: Game.STATE_WAITING_FOR_PLAYERS });
  var res = new GameStore().list({ shortCode: String(shortCode) });
  // console.log(res.);
  return res;
};

export default findGamesByShortCode;
