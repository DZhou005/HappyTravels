import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
// const SET_HOST= 'session/setHost'

const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// const setHost = (host) => {
//   return {
//     type: SET_HOST,
//      payload:host,
//   }
// }


export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    // case SET_HOST:
    //       newState = Object.assign({}, state);
    //       newState.host = action.payload;
    //       return newState;
      case SET_USER:
        newState = Object.assign({}, state);
        newState.user = action.user;
        return newState;
        case REMOVE_USER:
          newState = Object.assign({}, state);
          newState.user = null;
          return newState;
          default:
            return state;
          }

      };

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const signup = (user) => async (dispatch) => {
  const { username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// export const host = (listing) => async (dispatch) => {
//   const { location, price, pic, title, description } = listing;
//   const response = await csrfFetch("/api/host/", {
//     method: "POST",
//     headers: {"Content-Type": "multipart/form-data"},
//     body: JSON.stringify({
//       location,
//       price,
//       pic,
//       title,
//       description
//     }),
//   });
//   const data = await response.json();
//   console.log(data)
//   dispatch(setHost(data.listing));
//   return response;
// };



export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

export default sessionReducer;
