import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import SignUp from './SignUp';
import Login from './Login';
import { useState ,useEffect } from 'react';
import Search from "./Search.js";
import CakeDetails from "./CakeDetails";
import { BrowserRouter as Router ,Route,Redirect, Switch} from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import Cart from "./Cart";
import Checkout from "./Checkout";

function App(props) {
  // var [userDetails,setUser] = useState();
  // var [loginStatus,setLoginStatus] = useState(false);
  // function LoginDone(data){
  //   console.log(data)
  //   setUser(data.name);
  //   setLoginStatus(data.isLoggedIn);
  // }
  // function LogoutDone(data){
  //   console.log('isLoggedOut')
  //   console.log(data)
  //   setLoginStatus(data.isLoggedIn);
  // }
  useEffect(() => {
    document.title = `Cake Shop | ${props.user?.name || "App"}`;

    if (localStorage.token && !props.user) {
      var token = localStorage.token;
      let getuserapi = "https://apibyashu.herokuapp.com/api/getuserdetails";
      axios({
        url: getuserapi,
        method: "get",
        headers: {
          authtoken: token,
        },
      })
        .then((response) => {
          console.log("get user response", response.data);
          props.dispatch({ type: "INIT_USER", payload: response.data.data });
        })
        .catch((error) => console.log(error));

        //Get Cart Details
        let cartDetailsUrl = "https://apibyashu.herokuapp.com/api/cakecart";
        axios({
          url: cartDetailsUrl,
          method: "post",
          data: {},
          headers: {
            authtoken: token,
          },
        })
          .then((response) => {
            var total = 0;
            response.data.data.map(({ price }) => {
              total = total + price;
            });
            props.dispatch({
              type: "CAKES_CART",
              payload: response.data.data,
              total:total
            });
          })
          .catch((error) => console.log(error));
    }
  }, [props.user,props.token]);
  // useEffect(()=>{
  //   if(localStorage.token && !props.user){
  //     var token = localStorage.token;
  //     axios({
  //       "method":"GET",
  //       "url":"https://apibyashu.herokuapp.com/api/getuserdetails",
  //       headers:{
  //         authtoken:token
  //       }
  //     }).then((response)=>{
  //       console.log("User details  >>> ",response);
  //       props.dispatch({
  //         type:"SET_USER",
  //         payload:response.data.data
  //       })
  //     },(error)=>{
  //       console.log("Error comes in get user details api >>> ",error)
  //     })
  //   }
  // },[props.userDetails]);
   return (
    // <div className="App">
    //   <SignUp />
    //   <Login informlogin={LoginDone} />
    //   <Search />
    //   <Navbar />
    //   <Home />
    // </div>
    <div>
      <Router>
        {/* <Navbar user={userDetails} checkIsLoggedIn={loginStatus} informLogout={LogoutDone}/> */}
        <Navbar />
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            {/*
              those component which we pass as props in route tag those getting some extra features like belwo
              <Route path="/login" exact component={Login} /> 
            */}
            {/*
              those component which we pass as tag in route tag to get router properties use withRouter params while export Login
              <Route path="/login" exact component={Login} /> 
            */}
            {/* <Route path="/login" exact ><Login informlogin={LoginDone} loginStatus={loginStatus}/></Route>  */}
            <Route path="/login" exact ><Login/></Route> 
            <Route path="/signup" exact component={SignUp} />
            <Route path="/search" exact component={Search} />
            <Route path="/cake/:cakeid" exact component={CakeDetails} />
            <Route path="/cart" exact component={Cart} />
            <Route path="/checkout" component={Checkout} />
            {/* Here switch case is used because when we got path then execute that did break if route is not found then default it 
          redirect to / root path like on click of Forgot password we dont have any component */}
            <Route path="/*">
              <Redirect to="/"></Redirect>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default connect(function(state,props) {
  console.log("Login State Info >>>>>>>>. ",state);
  return{
    user:state?.user,
    loginStatus:state?.isloggedin
  }
})(App);
