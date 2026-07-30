import React, { useContext, useEffect, useState } from "react";
import "./PlaceHolder.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const PlaceHolder = () => {

  const {
    getTotalCartamount,
    token,
    food_list,
    cartItem,
    url,
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItem[item._id] > 0) {
        orderItems.push({
          ...item,
          quantity: cartItem[item._id],
        });
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartamount() + 2,
    };

    try {
      const response = await axios.post(
        `${url}/api/order/place`,
        orderData,
        {
          headers: {
            token,
          },
        }
      );

      if (!response.data.success) {
        alert(response.data.message);
        return;
      }

      const razorOrder = response.data.order;
      const mongoOrderId = response.data.orderId;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: razorOrder.amount,

        currency: razorOrder.currency,

        name: "Food Delivery",

        description: "Food Order",

        image: "https://razorpay.com/assets/razorpay-logo.svg",

        order_id: razorOrder.id,

        prefill: {
          name: data.firstName + " " + data.lastName,
          email: data.email,
          contact: data.phone,
        },

        theme: {
          color: "#ff4c24",
        },

        handler: async function (paymentResponse) {

          try {

            const verifyResponse = await axios.post(
              `${url}/api/order/verify`,
              {
                orderId: mongoOrderId,
                razorpay_order_id:
                  paymentResponse.razorpay_order_id,
                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,
                razorpay_signature:
                  paymentResponse.razorpay_signature,
              },
              {
                headers: {
                  token,
                },
              }
            );

            if (verifyResponse.data.success) {

              alert("Payment Successful");

              window.location.href = "/myorders";

            } else {

              alert("Payment Verification Failed");

            }

          } catch (error) {

            console.log(error);

            alert("Verification Error");

          }

        },

        modal: {
          ondismiss: function () {
            alert("Payment Cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.log(error);

      alert("Something Went Wrong");

    }

  };

  const navigate=useNavigate();
  useEffect(()=>{
   if(!token){
  navigate('/cart')
   }
   else if(getTotalCartamount()===0){
    navigate('/cart')
   }
  },[token])



  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />

          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />

        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />

          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>

        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />

          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>

        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone Number"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>

          <div>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartamount()}</p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>
                ₹{getTotalCartamount() === 0 ? 0 : 2}
              </p>
            </div>

            <hr />

            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹
                {getTotalCartamount() === 0
                  ? 0
                  : getTotalCartamount() + 2}
              </b>
            </div>

          </div>

          <button type="submit">
            PROCEED TO PAYMENT
          </button>

        </div>
      </div>
    </form>
  );
};

export default PlaceHolder;