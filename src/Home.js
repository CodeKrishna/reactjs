// function which return view/html it is become a component and 
// export that function
// import that in caps and use it as html tag
//every tag must be closed
import {useState,useEffect} from 'react';
import Carousel from './Carousel';
import Cake from './Cake';
import axios from "axios"
import cakes from "./Data.js"

var obj1 = {
    name:'Chocolate truffle',
    image:'cake6.jpeg'
}
var obj2 = {
    name:'Chocolate truffle',
    image:'cake8.jpeg'
}
var obj3 = {
    name:'Chocolate truffle',
    image:'cake8.jpeg'
}

function Home(){
    var [cakes,setCakes] = useState([]);
    let apiUrl = "https://apibyashu.herokuapp.com/api/allcakes";
    useEffect(()=>{
        axios({
            method:"get",
            url:apiUrl
        }).then((response)=>{
            // console.log('All cakes >>>> ',response.data)
                setCakes(response.data.data)
        },(error)=>{
        console.log("Error From all cakes >>> ".error);
        })
    },[])
    return (
        <div>
            <Carousel />
            <div className = "row">
                {cakes?.length > 0 && cakes.map((each,index)=>{
                    return  <Cake cakedata={each} key={index} />
                })}
            {/* Passing Object  */}
            {/* <Cake cakedata={obj1}/>
            <Cake cakedata={obj2}/>
            <Cake cakedata={obj3}/>
            <Cake cakedata={obj1}/>
            <Cake cakedata={obj2}/>
            <Cake cakedata={obj3}/> */}
            {/* below is property passing  */}
            {/* <Cake name="Chocolate Truffle" image="cake6.jpeg"/>
            <Cake name="Chocolate Truffle" image="cake8.jpeg"/>
            <Cake name="Chocolate Truffle" image="cake8.jpeg"/>
            <Cake name="Chocolate Truffle" image="cake8.jpeg" /> */}
            </div>
        </div>
    )
}

export default Home