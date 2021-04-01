import { csrfFetch } from './csrf';

const CURRENT_ONE = 'booking/CURRENT_ONE';


const currentBooking = booking => ({
  type: CURRENT_ONE,
  payload:booking,
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
  console.log("data:", data.id)
  const response = await csrfFetch(`/api/host/${data.id}`, {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  if (response.ok) {
    const listing = await response.json();
    dispatch(currentBooking(listing));
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
