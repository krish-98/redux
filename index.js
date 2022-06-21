// object type
const CAKE_ORDERED = "CAKE_ORDERED"

// fn creator
function orderCake() {
  return {
    type: CAKE_ORDERED,
  }
}

// reducer = (previousState, action) => newState

const initialState = {
  numOfCakes: 10,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        numOfCakes: state.numOfCakes - 1,
      }
    default:
      return state
  }
}
