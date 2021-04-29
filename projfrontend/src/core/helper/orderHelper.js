import { API } from "../../backend";

export const createOrder = (userId, token, orderData) => {
	return fetch(`${API}/orders/create/${userId}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type ": "application/json",
			Authorisation: `Bearer ${token}`,
		},
		body: JSON.stringify({ order: orderData }),
	})
		.then((response) => {
			return response.json();
		})
		.catch((err) => console.log(err));
};


//empty cart after user done with payment
export const emptyCart = next =>{
if (typeof window!==undefined){
    localStorage.removeItem("cart");
    next();
}
}