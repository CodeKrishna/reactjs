import React from "react";
import { Route } from "react-router";
import Address from "./Address"
import Payment from "./Payment";
import Order from "./Order";
import CartSummary from "./CartSummary";
import { Link, useRouteMatch } from "react-router-dom";

function Checkout() {
  let route = useRouteMatch();
  console.log("dsfsd", route.url);
  var url = route.url;
  var path = route.path;
  return (
    <>
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
        Checkout
      </h1>
      <div className="row" style={{ padding: "20px" }}>
        <div className="col-md-4">
          <Link to={url}><li>Cart Summery</li></Link>

          <Link to={url + "/address"}><li>Address</li></Link>

          <Link to={url + "/payment"}><li>Payment </li></Link>

          <Link to={url + "/order"}><li>Order </li></Link>
        </div>
        <div className="col-md-8">
          <Route exact path={path} component={CartSummary} />
          <Route exact path={path + "/address"} component={Address} />
          <Route exact path={path + "/payment"} component={Payment} />
          <Route exact path={path + "/order"} component={Order} />
        </div>
      </div>
    </>
  );
}

export default Checkout;
