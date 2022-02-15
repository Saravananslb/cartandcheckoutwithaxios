import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import './styles/bootstrap.min.css';
import './styles/common.css';
import { payload } from "./config";

const BASE_URL = 'http://13.235.87.215:4000';

function App() {

  useEffect(() => {
    axios.post(BASE_URL + '/api/v1/user/login', payload)
            .then(function (response) {
                if (response.data.success) {
                    localStorage.setItem("username", response.data.data.username)
                    localStorage.setItem("userId", response.data.data.userId);
                    localStorage.setItem("token", response.data.data.token);
                    // window.location.href = "/cart";
                }
            })
            .catch(function (error) {
                console.log(error);
            });
  }, [])

	return (
		<Router>
			<Routes>
				<Route
					exact
					path="/cart"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<Cart />
						</Suspense>
					}
				/>
				<Route
					exact
					path="/checkout"
					element={
						<Suspense fallback={<div className="loader"></div>}>
							<Checkout />
						</Suspense>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
