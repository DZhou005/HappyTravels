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
  const { location, price, pic, title, description } = listing;
  const response = await csrfFetch("/api/listings/", {
    method: "POST",
    headers: {"Content-Type": "multipart/form-data"},
    body: JSON.stringify({
      location,
      price,
      pic,
      title,
      description
    }),
  });
  const data = await response.json();
  console.log(data)
  dispatch(setHost(data.listing));
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
