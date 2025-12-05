import React from "react";
import "./Advantages.css";
// import "./Advantages.css";

const Advantages = () => {
  return (
    <div className="container p-4">
      <h3 style={{ textAlign: "center", color: "white" }} className="p-4">
        Our Advantages
      </h3>

      <div className="d-flex gap-2 flex-nowrap">
        <div className="feature-card bg-dark">
          <i className="fa-solid fa-truck-fast icon-box"></i>
          <div className="text-box">
            <p className="feature-title">Express Delivery</p>
            <p className="feature-text">Ship in 24 Hours</p>
          </div>
        </div>

        <div className="feature-card">
          <i className="fa-solid fa-shield-halved icon-box"></i>
          <div className="text-box">
            <p className="feature-title">Brand Warranty</p>
            <p className="feature-text">100% Original products</p>
          </div>
        </div>

        <div className="feature-card">
          <i className="fa-solid fa-tags icon-box"></i>
          <div className="text-box">
            <p className="feature-title">Exciting Deals</p>
            <p className="feature-text">On All prepaid orders</p>
          </div>
        </div>

        <div className="feature-card">
          <i className="fa-solid fa-credit-card icon-box"></i>
          <div className="text-box">
            <p className="feature-title">Secure Payments</p>
            <p className="feature-text">SSL/Secure certificate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advantages;
