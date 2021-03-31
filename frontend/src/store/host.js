import { csrfFetch } from './csrf';

const SET_HOST= 'session/setHost';

const setHost = (host) => {
  return {
    type: SET_HOST,
     payload: host,
  }
}

export const host = (listing) => async (dispatch) => {
  const { location, price, images, image, title, description,userId } = listing;
  const formData = new FormData();
  formData.append("location", location);
  formData.append("price", price);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("userId", userId);

  if (images && images.length !== 0) {
    for (var i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
  }

  // for single file
  if (image) formData.append("image", image);


  const response = await csrfFetch("/api/host", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });
  const data = await response.json();
  dispatch(setHost(data.listing));
  return response;
};



const hostReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_HOST:
          return {...state, listing:action.payload}
          default:
          return state;
  }
}



export default hostReducer;
