import { Link ,withRouter } from 'react-router-dom';
import { useState } from "react";
import { connect } from "react-redux";


function Navbar(props){
    // console.log("navbar props >>>> ",props)
    var [checkIsLoggedIn,setLoginStatus] = useState();
    var [searchStr,setSearchStr] = useState('');
    let getSearchStr = (event)=>{
        setSearchStr(event.target.value);
        console.log(searchStr);
        // searchStr = event.target.value;
    }
    let Search = function(event) {
        event.preventDefault();
        let url = 'search?searchtext=' + searchStr;
        console.log(url)
        props.history.push(url);
    }
    let logout = function (event) {
        // setLoginStatus(false)
        // props.informLogout({
        //     isLoggedIn:false
        // })
        // event.preventDefault();
        props.dispatch({ 
            type: "LOGOUT" 
        });
        props.history.push("/");
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/*
             This is done by normal event passing in react
             {props?.user && <span>Hello {props?.user}</span>} */}

             
             {/*This is done by Redux we are getting userName when user is loggedIn we are dispatching data to store 
             and we use that data in Navbar by using connect method we are calling that MapStateToProps menas mapping the state with props of component 
             If client asks what is mean by MapStateToProps that is means we are sync up store data with component props, if there is changes happend in 
             data store which are mapped with component then that props gets updated
                */}
             {props?.userName && <span>Welcome {props?.userName}</span>}
            
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="/"><a className="nav-link" href="#">My Cake Shop<span className="sr-only">(current)</span></a></Link>
                    </li>
                </ul>
                <div className="row">
                    {/* <div className="col-md-8"> */}
                        <input style={{width:"50%"}} className="form-control mr-sm-2" type="search" onChange={getSearchStr} placeholder="Search" aria-label="Search"/>
                        <Link to={"/search?cake="+searchStr}><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></Link>
                        <Link to={"/cart"}><button className="btn btn-outline-warning my-2 my-sm-0" type="submit">Cart</button></Link>
                        {/* {!props?.checkIsLoggedIn && <Link to="/login"><button className="btn btn-primary my-2 my-sm-0" type="submit">Login</button></Link>}
                        {props?.checkIsLoggedIn  && <Link to="/login"><button className="btn btn-danger my-2 my-sm-0" type="submit" onClick={logout}>Logout</button></Link>} */}
                        {props.checkIsLoggedIn  ?<div> <Link to="/login"><button className="btn btn-danger my-2 my-sm-0" type="submit" onClick={logout}>Logout</button></Link>
                        </div>:<div><Link to="/login"><button className="btn btn-primary my-2 my-sm-0" type="submit">Login</button></Link></div>}

                    {/* </div> */}
                    {/* <div className="col-md-2">
                        <Link to="/login"><button className="btn btn-primary my-2 my-sm-0" type="submit">Login</button></Link>
                    </div>
                    <div className="col-md-2">
                        <Link to="/signup"><button className="btn btn-danger my-2 my-sm-0" type="submit">Sign Up</button></Link>
                    </div> */}
                </div>
            </div>
            </nav>
    )
}

// export default Navbar
export default connect(function (state,props) {
    //in this function state means data of store 
    //and props means the data of Login Component
    console.log("Comes in Navbar",state)
    return{
        userName:state && state['user']['name'],
        checkIsLoggedIn:state && state.isloggedin
    }
})(withRouter(Navbar))