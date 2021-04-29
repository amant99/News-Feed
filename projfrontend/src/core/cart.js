import React, { useState, useEffect } from "react";
import "../styles.css";

import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./stripeCheckout"



const  Cart=()=> {

const [products,setProducts] = useState([])
const [reload, setreload]    = useState(false)


useEffect(() => {
    setProducts(loadCart());
  }, [reload]);



const loadAllProducts = () =>{
    return(
        <div>
            <h2>This section is to load products</h2>
            {products.map((product,index)=>{
                return(
                    <Card
                    key={index}                  //very important and hard to debug error
                    product={product}
                    addtoCart={false}
                    removeFromCart={true }
                    reload={reload}
                    setreload={setreload}
                    />
                )
            })}
        </div>
    )
}

const loadCheckout = () =>{
    return(
        <div>
            <h2>This section is for checkout</h2>
        </div>
    )
}

  return (
    <Base title="Cart Page" description="Ready to CheckOut">
      <div className="row text-center">
        
        <div className="row">
         <div className="col-6">{loadAllProducts()}</div>
         <div className="col-6 text-white" >
             <StripeCheckout
             products={products}
             setreload={setreload}
             reload={false}
             />
            
         </div>
        </div>
      </div>
    </Base>
  );
}


export default Cart;