import { createStore ,applyMiddleware } from "redux";
import dmart from "./reducers"
import { FirstMiddlware } from "../Middlwares.js"
// import { logger } from "../Middlwares.js"

// var middlwares = applyMiddleware(logger)
var middlwareslog = applyMiddleware(FirstMiddlware)
export default createStore(dmart)
// var store = createStore(dmart);

// store.dispatch({
//     type:"login"
// })
// console.log("............",store.getState());

// store.dispatch({
//     type:"LOGIN",
//     payload:{email:"krishna@gmail.com",name:"Krishna"}
// })
// console.log("After Loing Done >>> ",store.getState());

// export default store