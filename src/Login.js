import {useState,useEffect} from 'react';
import axios from "axios"
import { Link ,withRouter} from 'react-router-dom';
import { connect } from "react-redux";

//lets say we dont want to call effect on udpate we will pass a second argument 
function Login(props){
    // console.log(props);
        useEffect(()=>{
            // alert("Mounted and updated")
        },[]);
        var [error,setError] = useState();
        var [user,setUser] = useState({});
        let getEmail = (event)=>{
            setUser({
                ...user,
                email:event.target.value,
                password:user.password
            })
            user.email = event.target.value
        }

        let getPassword = (event)=>{
            setUser({
                ...user,
                email:user.email,
                password:event.target.value
            })
            user.password = event.target.value
        }
        let login = ()=>{
            console.log(user);
            if(user.email == "krishna.nalawade3295@gmail.com" && user.password == "Pass@1234"){
                setError('Login Success')
                let apiUrl = "https://apibyashu.herokuapp.com/api/login";
                axios({
                    url:apiUrl,
                    method:"post",
                    data:user
                }).then((response)=>{
                    console.log("response")
                    console.log(response)
                    if(response.data.token){
                        localStorage.token = response.data.token;
                        localStorage.email = response.data.email;
                        // props.informlogin({
                        //     name:"Krishna",
                        //     isLoggedIn:true
                        // });
                        props.dispatch({
                            type:"LOGIN",
                            payload:response.data
                        })
                        props.history.push("/");
                    }else{
                        alert('Invalid Credential')
                    }
                },(error)=>{
                    console.log("Error",error)
                })
            }else{
                setError("Invalid Login")
            }
        }
        var loginFormStyle = {
            width:"50%",
            marginLeft:"25%"
        };
        return(
            <div>
                {/* Hey users {this.state.onlineUser} */}
                <div style={loginFormStyle}>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" onChange={getEmail}/>
                        {user && <label>{user?.email}</label>}
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="password" onChange={getPassword}/>
                        {user && <label>{user?.password}</label>}
                    </div>
                    <div style={{color:"red"}}>
                        {error}
                     </div>
                     <div style={{float:"right"}}>
                        <Link to="/forgot">Forgot Password</Link>
                     </div>
                     <div>
                        <Link to="/signup">New User? Click Here</Link>
                     </div>
                    <button type="submit" class="btn btn-primary" onClick={login}>Submit</button>

                </div>
                {/* <input onChange={this.getEmail}></input> */}
                {/* <button onClick={this.goOnline}>Go Online</button> */}
            </div>
        )
}

Login = withRouter(Login)
export default connect()(Login)
// export default withRouter(Login)
// export default connect(function(state,props) {//in this function state means data of store 
    //and props means the data of Login Component
//     user:state && state['user']['name']
// })(Login)
