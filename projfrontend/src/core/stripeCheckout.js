import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";

//for stripe goto npm and search >> react-stripe-checkout

const StripeCheckout = ({
	products,
	setreload = (f) => f,
	reload = undefined,
}) => {
	const [data, setdata] = useState({  
		loading: false,
		success: false,
		error: "",
        address:""
	});

    const token = isAutheticated()&&isAutheticated().token;
    const userId = isAutheticated()&&isAutheticated().user_id;


    const getFinalAmount=()=>{
        let amount =0;
        products.map((val)=>{
            amount+=val.price;
        })
       
            return amount;
        }

        const makepayment = ()=>{
            //code
            const body={
                token,
                products
            }
            const headers ={
                "Content-Type":"application/json"
            }

            return fetch(`${API}/stripePayment,{
                method:"POST",
                headers,
                body:JSON.stringify(body)
            }`).then(response=>{
                    console.log(response)
                    //call further methods
            }).catch(err=>console.log(err))
        }

       const showStripeBUtton=()=>{
            return isAutheticated()?(
                <StripeCheckoutButton 
                name="The Imageur Co."
                stripeKey="pk_test_51ITjQKFmplgPDZEwp5PE8lUxrpQbVPRCtsSBQv0s0YRrsc8e2qpXyS3wkxQkSezmXEUk7uVehLvXJuNk3LYtlO3U00mwvnVVn8"
                token={makepayment()}
                amount= {getFinalAmount*100}
                shippingAddress
                billingAddress 
                bitcoin
                
                >
                <button className="btn btn-success">Pay with Stripe</button>
                </StripeCheckoutButton>
            ):(
                <Link to="/signin">
                     <button className="btn btn-warning">Signin to Continue </button>
                </Link>
            )
        }

	return (
		<div>
			<h3>Stripe checkout {getFinalAmount()}</h3>
            {showStripeBUtton() }
		</div>
	);
};

export default StripeCheckout;
