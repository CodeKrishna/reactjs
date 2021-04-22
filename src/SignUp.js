import { event } from "jquery";
import { Component } from "react"
import  axios  from "axios"

class SignUp extends Component {
    constructor(){
        super()
        this.state={
            onlineUser : 0,
            errorMessage:null
        }
        // alert('in Constructor');
    }
    
    user = {}
    // componentDidMount(){
    //     alert('Mounted');
    // }
    // componentDidUpdate(){
    //     alert('Update');
    // }
    // componentWillUnmount(){
    //     alert('Unmount');
    // }
    getName = (event)=>{
        this.user.name = event.target.value;
    }
    getEmail = (event)=>{
        this.user.email = event.target.value
    }

    getPassword = (event)=>{
        this.user.password = event.target.value
    }

    register = ()=>{
        console.log(this.user);
        if(!this.user.email || !this.user.password || !this.user.name){
            this.setState({
                errorMessage:"Please Fill Details"
            })
        }else{
            //Call HTTP Requests
            let apiUrl = "https://apibyashu.herokuapp.com/api/register";
            axios({
                url:apiUrl,
                method:"post",
                data:this.user
            }).then((response)=>{
                console.log("response")
                console.log(response)
            },(error)=>{
                console.log("Error",error)
            })
            // this.setState({
            //     errorMessage:null
            // })
        }
        console.log(this.user);
    }

    goOnline = ()=>{
        this.setState({
            onlineUser  : this.state.onlineUser +1
        })
    }

    render(){
        var signUpFormStyle = {
            width:"50%",
            marginLeft:"25%"
        };
        return(
            <div>
                {/* Hey users {this.state.onlineUser} */}
                <div style={signUpFormStyle}>
                    <div class="form-group">
                        <label for="nameHelp">Name</label>
                        <input type="text" class="form-control" id="name" aria-describedby="nameHelp" onChange={this.getName}/>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input type="email" class="form-control" id="email" aria-describedby="emailHelp" onChange={this.getEmail}/>
                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input type="password" class="form-control" id="password" onChange={this.getPassword}/>
                    </div>
                    <div style={{color:"red"}}>
                        {this.state.errorMessage}
                     </div>
                    <button type="submit" class="btn btn-primary" onClick={this.register}>Submit</button>

                </div>
                {/* <input onChange={this.getEmail}></input> */}
                {/* <button onClick={this.goOnline}>Go Online</button> */}
            </div>
        )
    }
}

export default SignUp