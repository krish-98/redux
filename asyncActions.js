const redux = require("redux")
const thunkMiddleware = require("redux-thunk").default
const axios = require("axios")
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware

const initialState = {
  isLoading: false,
  users: [],
  error: "",
}

// Actions
const FETCH_USERS_REQUESTED = "FETCH_USERS_REQUESTED"
const FETCH_USERS_SUCCEEDED = "FETCH_USERS_SUCCEEDED"
const FETCH_USERS_FAILED = "FETCH_USERS_FAILED"

// Action creators
const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUESTED,
  }
}

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCEEDED,
    payload: users,
  }
}

const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILED,
    payload: error,
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUESTED:
      return {
        ...state,
        isLoading: true,
      }
    case FETCH_USERS_SUCCEEDED:
      return {
        isLoading: false,
        users: action.payload,
        error: "",
      }
    case FETCH_USERS_FAILED:
      return {
        isLoading: false,
        users: [],
        error: action.payload,
      }
    default:
      return state
  }
}

// thunkMiddleware gives the ability to return a function instead of action object
// It is allowed to make a api call and side effects in action creators
// And it receives dispatch method as argument

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersRequest)
    axios
      .get("https://jsonplaceholder.typicode.com/user")
      .then((res) => {
        const users = res.data.map((user) => user.id)
        dispatch(fetchUsersSuccess(users))
      })
      .catch((err) => {
        dispatch(fetchUsersFailure(err.message))
      })
  }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())
