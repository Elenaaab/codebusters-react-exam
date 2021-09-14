import axios from 'axios';
import {
  START_GAME,
  saveDataGame,
  setLoadingGame,
  END_GAME,
  SUBMIT_ANSWER,
  setWin,
  toggleDisplayDescription,
} from 'src/actions/game';
import { setLoading } from 'src/actions/loading';
import { clearInput, displayErrormessage } from 'src/actions/popup';

const gameMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case START_GAME: {
      store.dispatch(setLoading());
      const { id } = store.getState().auth;
      axios.post('http://3.238.70.10/api/game/create', { user: id },
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          store.dispatch(saveDataGame(
            response.data.game.status,
            response.data.items,
            response.data.background,
            response.data.game.id,
          ));
          store.dispatch(setLoadingGame());
          store.dispatch(setLoading());
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          store.dispatch(setLoadingGame());
        });
      break;
    }
    case SUBMIT_ANSWER: {
      store.dispatch(setLoading());
      const { inputGameValue, id } = store.getState().game;
      axios.post(`http://3.238.70.10/api/game/answer/${id}`, { answer: inputGameValue },
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        })
        .then((response) => {
          console.log(response);
          if (response.data.answer) {
            store.dispatch(setWin(true));
          }
          else {
            store.dispatch(toggleDisplayDescription());
          }
          store.dispatch(setLoading());
        })
        .catch(() => {
          store.dispatch(displayErrormessage('une erreur s\'est produite, veuillez réessayer'));
          store.dispatch(setLoading());
        });
      break;
    }
    case END_GAME: {
      store.dispatch(setLoading());
      const { id } = store.getState().game;
      axios.put(`http://3.238.70.10/api/game/update/${id}`, {},
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        })
        .then(() => {
          store.dispatch(setLoading());
          store.dispatch(clearInput('inputGameValue', ''));
        })
        .catch(() => {
          store.dispatch(setLoading());
        });
      break;
    }
    default:
      next(action);
  }
};
  // on passe l'action au suivant (middleware suivant ou reducer)

export default gameMiddleware;
