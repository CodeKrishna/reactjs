import {useState,useEffect} from 'react';
import Cake from './Cake';
import axios from "axios";
import { useLocation, useParams } from 'react-router-dom';
// Importing Module
import queryString from 'query-string'

function Search(props){
    let location = useLocation();
    console.log(props);
    console.log(location);
    let QueryParams = queryString.parse(location.search)
    console.log(QueryParams);
    var [cakesSearchResult,setCakes] = useState([]);
    let apiUrl = "https://apibyashu.herokuapp.com/api/allcakes";
    
    useEffect(()=>{
        let searchUrl = "https://apibyashu.herokuapp.com/api/searchcakes?q="+QueryParams.cake;
        axios({
            method:"get",
            url:searchUrl
        }).then((response)=>{
                console.log('All cakes >>>> ',response.data)
                setCakes(response.data.data)
        },(error)=>{
        console.log("Error From all cakes >>> ".error);
        })
    },[props.location.search]);

    return (
        <div>
            <div className = "row">
                {cakesSearchResult?.length > 0 ? cakesSearchResult.map((each,index)=>{
                    return  <Cake cakedata={each} key={index}/>
                }): <div>No Records Found</div>}
            </div>
        </div>
    )
}

export default Search