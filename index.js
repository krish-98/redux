const redux = require("redux")
const createStore = redux.createStore

// object type
const CAKE_ORDERED = "CAKE_ORDERED"

// action creator fn
function orderCake() {
  // action type
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

// Redux store

// holds app's state
const store = createStore(reducer)

// getState() -> allows us to access the state
console.log("Initial state", store.getState())

// registers listeners via subscribe(listener)
const unSubcribe = store.subscribe(() =>
  console.log("Update state", store.getState())
)

// dispatch(action) method allows us to update the state
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())

//Handles unregistering of listeners via the fn returned by subscribe(listener)
unSubcribe()
