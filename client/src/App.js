import React, { useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Routes from "./routes.js";
import AuthApi from "./AuthApi.js";

function App() {
  const [auth, setAuth] = useState(false);
  return (
    <div className="container">
      <Header />
      <AuthApi.Provider>
        <BrowserRouter>
          <main>
            <Routes />
          </main>
        </BrowserRouter>
      </AuthApi.Provider>
      <Footer />
    </div>
  );
}

export default App;
