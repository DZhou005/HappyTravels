import { csrfFetch } from './csrf';

const SET_HOST= 'session/setHost'

const setHost = (host) => {
  return {
    type: SET_HOST,
     payload:host,
  }
}

export const host = (listing) => async (dispatch) => {
  console.log("hello")
  const { location, price, pic, title, description,userId } = listing;
  console.log("userId:",userId)
  const response = await csrfFetch("/api/host", {
    method: "POST",
    body: JSON.stringify({
      location,
      price,
      pic,
      title,
      description,
      userId
    }),
  });
  const data = await response.json();
  dispatch(setHost(data.listing));
  return response;
};

const hostReducer = (state = {}, action) => {

  switch (action.type) {
    case SET_HOST:
          // newState = Object.assign({}, state);
          // newState.host = action.payload;
          // return newState;
          return {...state, listing:action.payload}
          default:
          return state;

  }
}

export default hostReducer;
