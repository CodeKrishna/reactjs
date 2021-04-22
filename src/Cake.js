import { Link } from 'react-router-dom';
function Cake(props){
    // console.log(props)
    return(
            <div class="card" style={{width: "18rem",marginBottom:"10px"}}>
            <Link to={"/cake/"+props.cakedata.cakeid}><img src={props.cakedata.image} style={{height:"200px",paddingTop:"10px"}} class="card-img-top" alt="..."/></Link>
            <div class="card-body">
                <h5 class="card-title">{props.cakedata.name}</h5>
            </div>
            </div>
    )
}

export default Cake