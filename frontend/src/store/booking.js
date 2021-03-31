import { csrfFetch } from './csrf';

const CURRENT_ONE = 'booking/CURRENT_ONE';


const currentBooking = booking => ({
  type: CURRENT_ONE,
  payload:booking,
})

export const getOneHost = (id) => async dispatch => {
  console.log("here")
  const response = await csrfFetch(`/api/host/${id}`);
  const data = await response.json()
  console.log(data,"this is data")
  if (data) {
    console.log(data, "=============================")
    dispatch(currentBooking(data))
  }
};
const initialState = {
  list: [],
  types: []
};

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
