import store from "./reduxstore/store";

export function FirstMiddlware(store){
    return function (next) {
        return function (action) {
            console.log("Data Before Middlewares >>> ", action.type,store.getState());
            var result = next(action)
            console.log("After Middleware >>> ", store.getState());
            return result;     
        }
    }
}

//another syntax for middleware calls
// export let logger = store=>next=>action=>{
//     console.log("Data Before Middlewares >>> ", action.type,store.getState());
//     var result = next(action)
//     console.log("After Middleware >>> ", store.getState());
//     return result;
// }
