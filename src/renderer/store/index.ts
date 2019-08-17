import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'


import { reducer as playListReducer } from './pages/PlayList'

const rootReducer = combineReducers({
  playList: playListReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)
