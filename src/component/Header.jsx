import React, { useState, useRef, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { globalContext } from "../myCongtext/MyContext";

const Header = () => {
  const navigate = useNavigate();

  // Redux cart
  const cart = useSelector((state) => state.cartItems.cart || []);
  const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

  // Context products (safe default)
  const { data: products = [] } = useContext(globalContext) || {};

  // UI states
  const [showModal, setShowModal] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  const signupRef = useRef(null);
  const loginRef = useRef(null);

  const handleShow = () => {
    setShowModal(true);
    setDropdownOpen(false);
  };
  const handleClose = () => setShowModal(false);

  const toggleToLogin = () => {
    setIsSignup(false);
    setTimeout(() => loginRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const toggleToSignup = () => {
    setIsSignup(true);
    setTimeout(() => signupRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  // Safe search filtering
  const filteredProducts = (products || []).filter((p) =>
    (p.title || "").toLowerCase().includes(searchText.toLowerCase())
  );

  // handle clicking a product (close search and navigate)
  const handleProductClick = (id) => {
    setSearchText("");
    setSearchOpen(false);
    navigate(`/product/${id}`);
  };

  // prevent form submit default inside modal forms
  const preventSubmit = (e) => e.preventDefault();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 bg-black">
        <div className="container-fluid d-flex justify-content-between align-items-center flex-wrap">
          <Link className="navbar-brand navlogo1 text-nowrap text-white" to="/">
            Tech-Shop
          </Link>

          <div className="d-flex align-items-center icon-group me-md-4 ms-auto">
            <span
              className="pe-md-5 px-2"
              title="Search"
              role="button"
              aria-pressed={searchOpen}
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <FaSearch size={20} />
            </span>

            <div className="position-relative d-inline-block text-white pe-md-5 px-2">
              <Link to="/cart" className="linknoness" aria-label="Cart">
                <FaShoppingCart size={20} />
                <span className="ooo badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              </Link>
            </div>

            <div className="position-relative userspa">
              <FaUser
                size={22}
                color="white"
                style={{ cursor: "pointer" }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              />

              {dropdownOpen && (
                <div
                  className="position-absolute end-0 mt-3 bg-dark text-white p-3 rounded boooo"
                  style={{ width: "18rem", zIndex: 999 }}
                >
                  <h4 className="mb-1">Hello!</h4>
                  <p className="mb-3">Access account and manage orders</p>
                  <Button variant="danger" className="w-100 mb-3" onClick={handleShow}>
                    Login / Signup
                  </Button>
                  <hr className="text-mut" />
                  <p className="mb-0">Please Login</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {searchOpen && (
        <div
          className="position-absolute start-50 translate-middle-x w-50 searchboxx bg-dark p-3 rounded shadow"
          style={{ top: "70px", zIndex: 100 }}
        >
          <div className="position-relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="form-control text-white bg-dark border border-light pe-5"
              aria-label="Search products"
            />

            {searchText && (
              <button
                onClick={() => {
                  setSearchText("");
                  setSearchOpen(false);
                }}
                className="btn btn-sm btn-link text-white position-absolute top-50 end-0 translate-middle-y me-2"
                style={{ textDecoration: "none" }}
                aria-label="Clear search"
              >
                ✖
              </button>
            )}
          </div>

          {searchText && filteredProducts.length > 0 && (
            <ul className="list-group mt-2">
              {filteredProducts.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProductClick(p.id)}
                  className="list-group-item list-group-item-action bg-dark text-white borderseconf text-start"
                  style={{ border: "none" }}
                >
                  {p.title}
                </button>
              ))}
            </ul>
          )}

          {searchText && filteredProducts.length === 0 && (
            <p className="text-muted mt-2">No products found</p>
          )}
        </div>
      )}

      <Modal show={showModal} onHide={handleClose} centered size="md">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header border-0">
            <button type="button" className="btn-close btn-close-white" onClick={handleClose} />
          </div>
          <div className="modal-body px-5">
            {isSignup ? (
              <div ref={signupRef}>
                <h4 className="fw-bold mb-3 text-center">Sign Up</h4>
                <Button
                  variant="secondary"
                  className="w-100 mb-3 text-start"
                  style={{ background: "white", color: "black" }}
                  onClick={toggleToLogin}
                >
                  Already have an account? <span className="text-info fw-bolder">Login</span>
                </Button>

                <Form onSubmit={preventSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="Username" className="bg-dark text-white" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" className="bg-dark text-white" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Password" className="bg-dark text-white" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Confirm Password" className="bg-dark text-white" />
                  </Form.Group>
                  <Button type="submit" className="btn btn-danger w-100 mb-3" style={{ padding: "12px", fontSize: "1.2rem" }}>
                    Sign Up
                  </Button>
                </Form>
              </div>
            ) : (
              <div ref={loginRef}>
                <h4 className="fw-bold mb-3 text-center">Log In</h4>
                <Button
                  variant="secondary"
                  className="w-100 mb-3 text-start"
                  style={{ background: "white", color: "black" }}
                  onClick={toggleToSignup}
                >
                  Don't have an account? <span className="text-info fw-bolder">Sign Up</span>
                </Button>

                <Form onSubmit={preventSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" className="bg-dark text-white" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Password" className="bg-dark text-white" />
                  </Form.Group>
                  <Button type="submit" className="btn btn-danger w-100 mb-3" style={{ padding: "12px", fontSize: "1.2rem" }}>
                    Log In
                  </Button>
                </Form>
              </div>
            )}

            <div className="text-center my-3">or login with</div>
            <div className="d-flex justify-content-between">
              <Button className="w-100 mx-1 button_facebook">Facebook</Button>
              <Button className="w-100 mx-1 button_google">Google</Button>
              <Button className="w-100 mx-1 button_twitter">Twitter</Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;
