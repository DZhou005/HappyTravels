import { csrfFetch } from './csrf';

const CURRENT_ONE = 'booking/CURRENT_ONE';
const UPDATE_POST = 'booking/UPDATE_POST'


const currentBooking = booking => ({
  type: CURRENT_ONE,
  payload:booking,
})

const update = booking => ({
  type: UPDATE_POST,
  booking,
})

export const getOneHost = (id) => async dispatch => {
  const response = await csrfFetch(`/api/host/${id}`);

  if (response.ok) {
    const book = await response.json();
    dispatch(currentBooking(book))
  }
};


const initialState = {
  list: [],
  types: []
};

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

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_ONE: {
      const newState = { ...state, ["currentBooking"]: action.payload}
      return newState;
    }
    default:
            return state;
  }
}

export default bookingReducer;
