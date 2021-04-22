
import {connect} from 'react-redux'
function CartSummary(props){
    
    var TotalPrice = 0
    return(
        <div>
            <h3 className="text-center p-4 mt-2">Your Cart</h3>
            { props.cartDetails?.length > 0 ? 
            <div className="row mx-5 px-5">
                <div className="col-sm-12">
                    {props.cartDetails.map((each,index) => {
                        TotalPrice += each.price
                        return(

                            <div className="row p-2 border border-bottom-0">
                                <div className="col-sm-4" style={{fontWeight:"500"}}>
                                
                                    <div style={{width:"70px", height: "70px", margin:"auto"}}><img src={each.image} className="card-img-top" alt="..." /></div>
                                    
                                </div>
                                <div className="col-sm-4 text-center" style={{fontWeight:"500"}}>{each.name}</div>
                                
                                <div className="col-sm-4 text-center" style={{fontWeight:"500"}}>
                                    {each.price}
                                </div>

                            </div>
                            
                        )

                    })}
                    <div className="row p-2 border">
                        <div className="col-sm-4 text-center" style={{fontWeight:"500"}}>Total(USD)</div>
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4 text-center" style={{fontWeight:"500"}}>{TotalPrice}</div>

                    </div>
                </div>
            </div>
            
            : 
            <div className="border m-5 p-5 text-center text-secondary" style={{fontWeight:"500", backgroundColor: "rgba(0,0,0,.03)", fontSize: "22px"}}>
                <span>Your cart is empty.</span>
            </div>}

        </div>
        
    )
}

export default connect(function(state, props){
    return {
        cartDetails : state?.cartData
    }
})(CartSummary);