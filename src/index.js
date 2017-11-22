import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, } from "react-snapshot";

render(<App />, document.getElementById("root"));

if (navigator && navigator.serviceWorker && navigator.serviceWorker.getRegistrations) {
	navigator.serviceWorker.getRegistrations().then(function(registrations) {
		for(let registration of registrations) {
			registration.unregister()
		} })
}


