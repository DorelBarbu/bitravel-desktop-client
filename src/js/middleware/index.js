import { ADD_ARTICLE } from '../constants/action-types';

const forbiddenWords = ['spam', 'money'];

function forbiddenWordsMiddleware({ dispatch }) {
  return function(next) {
    return function(action) {
      // do stuff
      if (action.type === ADD_ARTICLE) {
        const foundWord = forbiddenWords.filter(word =>
          action.payload.title.includes(word)
        );
        if (foundWord.length) {
          return dispatch({ type: 'FOUND_BAD_WORD' });
        }
      }
      return next(action);
    };
  };
}

export default forbiddenWordsMiddleware;
