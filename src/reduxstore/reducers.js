
//Reducers always have two params state and action
var dmart = function(state,action){
    switch (action.type) {
        case "LOGIN":{
            state = {...state}
            state['isloggedin'] = true
            state['user'] = action.payload
            console.log('COMES IN LOGGED IN LOGIC')
            return state;
        }
        case "INIT_USER":{
            state = {...state}
            state['isloggedin'] = true
            state['user'] = action.payload
            console.log('SET USER')
            return state;
        }
        case "CAKES_CART": {
            state = { ...state };
            state["cartData"] = action.payload;
            state["total"] = action.total;
            console.log("cart total", state.total);
      
            return state;
        }
        case "LOGOUT": {
            console.log("logout reducer");
            state = { ...state };
            localStorage.clear();
            state["isloggedin"] = false;
            state["user"] = {};
            return state;
          }
        case "REMOVE_CART_DATA": {
            console.log("Remove Cart Data");
            state = {...state}
            state['cartData'].splice(action.array_index, 1)
            return state
          }
        default:
            return state;
    }
};

export default dmart