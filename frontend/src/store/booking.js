import { csrfFetch } from './csrf';

const CURRENT_ONE = 'booking/CURRENT_ONE';
const REMOVE_POST = 'booking/REMOVE_POST';
const SET_REVIEW = 'booking.SET_REVIEW';


const currentBooking = booking => ({
  type: CURRENT_ONE,
  payload:booking,
})

const remove = (id) => ({
  type: REMOVE_POST,
  id,
})

const setReview = (review) => {
  return {
    type: SET_REVIEW,
    review,
  }
}


export const getOneHost = (id) => async dispatch => {
  const response = await csrfFetch(`/api/host/${id}`);

  if (response.ok) {
    const book = await response.json();
    dispatch(currentBooking(book))
  }
};

export const deletePost = (id) => async dispatch => {
  const response = await csrfFetch(`/api/host/${id}`, {
    method: 'delete',
  });

  if(response.ok) {
    const post = await response.json();
    dispatch(remove(post.id))
  }

}


export const updateListing = (data) => async dispatch => {
  const { location, price, images, pic, title, description,userId } = data;
  const formData = new FormData();
  formData.append("location", location);
  formData.append("price", price);
  formData.append("title", title);
  formData.append("description", description);
  formData.append("userId", userId);

  // for single file
  if (pic) formData.append("pic", pic);

  const response = await csrfFetch(`/api/host/${data.id}`, {
    method: 'put',
    headers: {'Content-Type': 'multipart/form-data',},
    body: formData,
  })
  if (response) {
    const listing = await response.json();
    dispatch(currentBooking(listing[1]));
    return listing;
  }
}

export const review = (comment) => async (dispatch) => {

  const response = await csrfFetch(`/api/host/${comment.bookingId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
   if(response.ok) {
     const data = await response.json();
     dispatch(setReview(data))
     return data;
   }
 }



const bookingReducer = (state = {}, action) => {
  switch (action.type) {
    case CURRENT_ONE: {
      const newState = { ...state, ["currentBooking"]: action.payload}
      return newState;
    }
    case REMOVE_POST: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case SET_REVIEW:
      let reviews = [...state.review]
      return { ...state, listing: action.review }
      default:
      return state;
  }
}

export default bookingReducer;
