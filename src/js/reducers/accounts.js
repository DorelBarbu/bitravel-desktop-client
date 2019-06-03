import { GET_ACCOUNTS, GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_ERROR } from '../constants/action-types';

const initialState = {
  accounts: [],
  loadingAccounts: false,
  accountsError: null
};

function accountsReducer(state = initialState, action) {
  if(action.type === GET_ACCOUNTS) {
    return {
      ...state,
      accounts: [],
      loadingAccounts: true,
      accountsError: null
    };
  }
  if(action.type === GET_ACCOUNTS_SUCCESS) {
    return {
      ...state,
      accounts: action.payload,
      loadingAccounts: false,
      accountsError: null
    };
  }
  if(action.type === GET_ACCOUNTS_ERROR) {
    return {
      ...state,
      accounts: [],
      loadingAccounts: false,
      accountsError: true
    };
  }
  return state;
}

export default accountsReducer;