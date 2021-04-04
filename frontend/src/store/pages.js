import { csrfFetch } from './csrf';

const ALL_PAGES = 'pages/ALL_PAGES';

const allPages = page => {
  return {
    type: ALL_PAGES,
      payload: page,

  }
}

export const getAllPages = () => async dispatch => {
  const response = await csrfFetch(`/api/pages`)

  if (response.ok) {
    const pages = await response.json();
    dispatch(allPages(pages))
  }
}

const PagesReducer = (state = {}, action) => {
  switch(action.type) {
    case ALL_PAGES: {
      const newState = { allListings: action.payload }
      return newState;
    }
    default:
      return state;
  }
}


export default PagesReducer;
