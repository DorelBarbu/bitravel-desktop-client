import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import forbiddenWordsMiddleware from '../middleware';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(forbiddenWordsMiddleware, thunk))
);

export default store;