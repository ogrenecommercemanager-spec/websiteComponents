import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import './index.css';

import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Checkout from "./pages/Checkout.jsx";
import ShippingAndReturns from "./pages/policyPages/ShippingAndReturns.jsx";
import PrivacyPolicy from "./pages/policyPages/PrivacyPolicy.jsx";
import FAQ from "./pages/policyPages/FAQ.jsx"

import ScrollToAnchor from "./components/ScrollToAnchor/ScrollToAnchor.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import CartSideBar from "./components/CartSideBar/CartSideBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ScentDescription from "./components/ScentDescription/ScentDescription.jsx";
import PopUp from "./components/PopUp/PopUp.jsx";
import LogIn from "./components/LogIn/LogIn.jsx";
import LogOut from "./components/LogIn/LogOut.jsx";

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
    });

    return unsubscribe;
  }, []);
  
  const [cartOpen, setCartOpen] = useState(false);
  const toggleCart = () => setCartOpen(!cartOpen);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/Checkout") {
      setCartOpen(false);
    }
  }, [location.pathname]);

  const [candles, setCandles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCandles() {
      const snapshot = await getDocs(collection(db, `businesses/${businessID}/listings`));
      
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCandles(data);
      setLoading(false);
    }
    fetchCandles();
  }, []);

  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);


  const navigate = useNavigate();
  
  const addToCart = (product) => {
    if (currentUser === null) {
      alert("Must be signed in to buy");
      navigate("/LogIn");
      return
    }

    updateCandleCount(1)
    setCart(prev => {
      const exists = prev.find(item => item.id == product.id);
      if (exists) {
        return prev.map(item => 
          item.id == product.id ? { ...item, quantity: item.quantity + 1} : item);
      }
      return [...prev, {...product, quantity:1}];
    });

    const uniqueId = Date.now()

    const newNotification = {
      id: uniqueId,
      message: `${product.name} added to cart`,
      isExiting: false,
    }


    setNotifications(prev => [...prev, newNotification]);

    setTimeout(() => {
      setNotifications(prev => 
        prev.map(note => note.id === uniqueId ? {...note, isExiting: true} : note)
      );
    }, 3600);

    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== uniqueId));
    }, 4000);
  };

  const [numCandles, setNumCandles] = useState(0);

  const updateCandleCount = (delta) => {
    setNumCandles(prev => prev + delta)
  };

  const toggleQuantity = (id, delta) => {
    updateCandleCount(delta)
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.id == id) {
          return { ...item, quantity: item.quantity + delta};
        }
        return item;
      });
      return updatedCart.filter(item => item.quantity > 0);
    });
  }

  const total = cart.reduce((accumulate, item) => {
    return accumulate + (item.price * item.quantity);
  }, 0);

  const [filter, setFilter] = useState("all");

  const changeFilter = (newCollection) => {
    setFilter(newCollection);
  };

  const [isScentDescriptionActive, setIsScentDescriptionActive] = useState(false);
  const toggleDescription = () => setIsScentDescriptionActive(!isScentDescriptionActive);
  const [scentInfo, setScentInfo] = useState({});

  const clickOverLay = () => {setIsScentDescriptionActive(false); setCartOpen(false);};

  return(
    <div>
        {(isScentDescriptionActive || cartOpen) ? <button id="overLay" onClick={() => clickOverLay()}></button> : ""}
        <ScrollToAnchor />
        <NavBar onCartClick={toggleCart}
                cart={cart}
                location={location}
                currentUser={currentUser}
                />
        <CartSideBar toggleCart={toggleCart}
                      isOpen={cartOpen} 
                      cart={cart} 
                      toggleQuantity={toggleQuantity}
                      total={total}
                      setCartOpen={setCartOpen}/>
        <ScentDescription 
                isScentDescriptionActive={isScentDescriptionActive}
                toggleDescription={toggleDescription}
                scentInfo={scentInfo}
                addToCart={addToCart}
        />
        <PopUp 
          notifications={notifications}
          setNotifications={setNotifications}
        />
        <Routes>
          <Route path="/" element={<Home  changeFilter={changeFilter}
                                          location={location}
                                          cart={cart}
                                          currentUser={currentUser}/>}/>
          <Route path="/Shop" element={<Shop  candles={candles} 
                                              loading={loading} 
                                              addToCart={addToCart} 
                                              filter={filter}
                                              changeFilter={changeFilter}
                                              toggleDescription={toggleDescription}
                                              setScentInfo={setScentInfo}/>}/>
          <Route path="/Checkout" element={<Checkout  total={total}
                                                      cart={cart}
                                                      toggleQuantity={toggleQuantity}
                                                      setCart={setCart}
                                                      numCandles={numCandles}
                                                      currentUser={currentUser}/>}/>
          <Route path="/FAQ" element={<FAQ />} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/ShippingAndReturns" element={<ShippingAndReturns />} />
          <Route path="/LogIn" element={currentUser === null ? <LogIn /> : <LogOut />}/>
        </Routes>
        <Footer 
          changeFilter={changeFilter}
        />
    </div>
  )
}

export default App
