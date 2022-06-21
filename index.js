const redux = require("redux")
const createStore = redux.createStore

// action type
const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"

// action creator fn
function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  }
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    quantity: qty,
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
        ...state,
        numOfCakes: state.numOfCakes - 1,
      }
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.quantity,
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

store.dispatch(restockCake(3))

//Handles unregistering of listeners via the fn returned by subscribe(listener)
unSubcribe()
