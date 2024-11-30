import { createStore , applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers/index'

 const middleware = [thunk],
       initState = {},
    store = createStore(
    reducer,
    initState,
    compose(
      applyMiddleware(...middleware),
      
    )
  );

export default store    