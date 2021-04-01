import { csrfFetch } from './csrf';

const SET_HOST= 'session/setHost';

const setHost = (host) => {
  return {
    type: SET_HOST,
     payload: host,
  }
}

export const host = (listing) => async (dispatch) => {
  const { location, price, images, pic, title, description,userId } = listing;
  const formData = new FormData();
  formData.append("location", location);
  formData.append("price", price);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("userId", userId);

  // for single file
  if (pic) formData.append("pic", pic);

  console.log("formData:",formData)

  const response = await csrfFetch("/api/host", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await response.json();
  dispatch(setHost(data.listing));
};



const hostReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_HOST:
          return { ...state, listing: action.payload }
          default:
          return state;
  }
}



export default hostReducer;
