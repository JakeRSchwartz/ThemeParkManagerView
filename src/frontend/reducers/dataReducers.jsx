export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REGISTERED':
      return { ...state, registered: action.payload }
    default:
      return state
  }
}
