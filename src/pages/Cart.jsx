import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { increaseQty, decreaseQty, removeFromCart } from "../reduxToolKit-store/productSlice";
import { BsCartX } from "react-icons/bs";
import "./Cart.css";
const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartItems);

  // Calculate totals
  const originalPrice = cart.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const finalPrice = cart.reduce((acc, item) => acc + item.finalPrice * item.quantity, 0);
  const discount = originalPrice - finalPrice;

  return (
    <div className="container-fluid">
      {cart.length === 0 ? (
        // ✅ Empty Cart UI
        <div>
          <div className="textttt">
            {/* <i className="fa-sharp fa-solid fa-cart-xmark lllttr" style={{color: "#e60a0a"}}></i> */}
            <BsCartX className="gjhjgf " />
          </div>
          <h1 className="text-center text-white text-4xl font-bold pt-18">
            Your cart is empty
          </h1>
          <div className="w-full flex justify-center mt-4 ghhh">
            <Link to="/Allproduct" className="qpqp" >
              <button className="bg-red-500 border rounded-4 text-4xl flex text-white fonbol items-center gap-5 font-bold py-4 px-8">
                <FaArrowLeftLong />
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      ) : (
        // ✅ Cart UI with Items
        <div className="row justify-content-center my-3">
          {/* Order Summary */}
          <div
            className="col-12 col-sm-4 order-sm-2"
            style={{
              backgroundColor: "rgb(35, 35, 35)",
              height: "fit-content",
              padding: "10px 20px",
            }}
          >
            <h4 className="text-white">Order Summary ({cart.length} items)</h4>
            <br />
            <div className="d-flex justify-content-between text-white">
              <p>Original Price</p>
              <p>₹{originalPrice.toLocaleString()}</p>
            </div>
            <div className="d-flex justify-content-between text-white">
              <p>Discount</p>
              <p style={{ color: "rgb(0, 254, 0)" }}>- ₹{discount.toLocaleString()}</p>
            </div>
            <div className="d-flex justify-content-between text-white">
              <p>Delivery</p>
              <p style={{ color: "rgb(0, 254, 0)" }}>Free</p>
            </div>
            <hr style={{ width: "100%", color: "white" }} />
            <br />
            <div className="d-flex justify-content-between text-white">
              <h4>Total Price</h4>
              <h4 style={{ color: "white" }}>₹{finalPrice.toLocaleString()}</h4>
            </div>
            <br />
            <button
              style={{
                backgroundColor: "#ff4500",
                color: "white",
                width: "100%",
                border: "none",
                borderRadius: "3px",
                fontWeight: 700,
                height: "35px",
              }}
            >
              Checkout
            </button>
          </div>

          {/* Cart Items */}
          <div className="col-12 col-sm-8 order-sm-1 mb-3">
            <div className="overflow-y-scroll y_scrolling">
              {cart.map((item) => (
                <div key={item.id}>
                  <div className="d-flex flex-column flex-sm-row justify-content-evenly align-items-center mt-3">
                    <img
                      className="image_scroling"
                      src={item.images[0]}
                      alt={item.title}
                      style={{ width: "100px", height: "100px", objectFit: "contain" }}
                    />
                    <span className="text-center text-sm-start my-2 ms-lg-5">
                      <h5 className="text-white fs-3 fw-bold">{item.title}</h5>
                      <p className="card-text text-white fs-3 fw-bold">
                        ₹{item.finalPrice}
                        <span className="text-muted ms-1">
                          <s className="font_mute_cart">₹{item.originalPrice}</s>
                        </span>
                      </p>
                      {/* Quantity Buttons */}
                       <div className="input-group mx-auto mx-sm-0" style={{ width: "200px" }}>
                        <button
                          style={{ width: "50px" }}
                          className="border-end-0 btn btn-outline-secondary text-light"
                          onClick={() => dispatch(decreaseQty(item))}
                        >
                          -
                        </button>
                        <input
                          style={{
                            borderTop: "1px solid rgba(255, 255, 255, 0.5)",
                            borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                            borderLeft: "none",
                            borderRight: "none",
                            backgroundColor: "black",
                            color: "white",
                            textAlign: "center",
                          }}
                          type="number"
                          className="form-control"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          style={{ width: "50px" }}
                          className="border-start-0 btn btn-outline-secondary text-light"
                          onClick={() => dispatch(increaseQty(item))}
                        >
                          +
                        </button>
                      </div>
                    </span>
                    {/* Remove Item */}
                    <div className="my-2 my-sm-0 pe-md-5">
                      <i
                        className="fa-regular fa-trash-can fa-xl me-3"
                        style={{ color: "#ffffff", cursor: "pointer" }}
                        onClick={() => dispatch(removeFromCart(item))}
                      ></i>
                  </div>
                  </div>
                  <br />
                  <hr style={{ color: "white", width: "90%", margin: "0 auto" }} />
             </div>              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;