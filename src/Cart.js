import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function Cart(props) {
  console.log("Cart Props >>> ");
  console.log(props);
  const shoppingCart = <FontAwesomeIcon icon={faShoppingCart}/>
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // setCartData(props.cartData);
  useEffect(() => {
    let detailsapiurl = "https://apibyashu.herokuapp.com/api/cakecart";
    axios({
      url: detailsapiurl,
      method: "post",
      data: {},
      headers: {
        authtoken: props.token,
      },
    })
      .then((response) => {
        console.log("cart data", response.data);
        // setCartData(response.data.data);
        var total = 0;
        response.data.data.map(({ price }) => {
          total = total + price;
        });
        props.dispatch({
          type:"CAKES_CART",
          payload:response.data.data,
          total:total
      })
        // setTotalPrice(total);
      })
      .catch((error) => console.log(error));
  }, [props.token]);

  function removeProductFromCart(cakeid, index){
    let removeCartApi = "https://apibyashu.herokuapp.com/api/removecakefromcart"
    let data = {cakeid: cakeid}
    let token = localStorage.token
    axios({
        url:removeCartApi,
        method:"post",
        data: data,
        headers : {
            authtoken: token
        }
    }).then((response)=>{
        console.log("response of remove from cart api : ", response)
        if(response.data){
            alert(response.data.message)
            props.dispatch({
                type:"REMOVE_CART_DATA",
                array_index :index
            })
            
        }
    }, (error)=>{
        console.log("error response of remove from cart api : ",error)
    })
  }
  return (
    <div>
      <h1
        style={{
          margin: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
          paddingBottom: "20px",
          padding: "20px",
        }}
      >
        My Cart <span>{shoppingCart}</span>
      </h1>
      <div className="row" style={{ padding: "10px" }}>
        {props?.cartData?.length > 0 ? (
          <>
            <div className="col-sm-8 col-md-8 col-md-offset-1 container">
              <table className="table table-hover">
                <tbody>
                  {props?.cartData?.length > 0 &&
                    props?.cartData.map((cart, index) => {
                      return (
                        <tr key={index}>
                          <td className="text-center">
                            <img
                              className="media-object"
                              src={cart?.image}
                              style={{ width: "100px", height: "115px" }}
                            />{" "}
                          </td>
                          <td className="text-center">
                            <div className="media-body">
                              <h4 className="media-heading">
                                <a>{cart?.name}</a>
                              </h4>
                            </div>
                          </td>
                          <td className="text-center">
                            <strong>${cart.price}</strong>
                          </td>
                          <td className="text-center">
                            <button type="button" className="btn btn-danger" onClick={() => removeProductFromCart(cart.cakeid, index)}>
                              {/** ON Click Syntax on above line indicates that we need to create onClick function for every 
                               * 
                              */}
                              <span className="glyphicon glyphicon-remove"></span>{" "}
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="col-sm-4 col-md-4">
              <div
                style={{
                  border: "1px solid black",
                  display: "flex",
                  justifyContent: "space-around",
                  paddingTop: "10px",
                }}
              >
                <p style={{ textAlign: "center" }}>
                  Total Item <br /> {props?.cartData?.length}
                </p>
                <p style={{ textAlign: "center" }}>
                  Total Price <br />$ {props?.total}
                </p>
              </div>
              <Link to="/checkout">
                <button
                  style={{ display: "flex", float: "right", margin: "100px" }}
                  className="btn btn-success"
                >
                  Checkout
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="alert alert-danger container" role="alert">
            <h4 className="alert-heading" style={{ textAlign: "center" }}>
              CART IS EMPTY!
            </h4>
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>
                Plaese add some cake to cart{!props?.token && ", Please login"}
              </p>

              <p className="mb-0">
                Sweet Shopping!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(function (state, props) {
  console.log('Cart Data >>> ',state);
  console.log('Cart Props >>> ',props);
  let cd = state?.cartData;
  return {
    token: state?.user?.token,
    cartData:[...cd],
    total:state?.total
  };
})(Cart);
