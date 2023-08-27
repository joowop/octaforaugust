import React from "react";
import { Navigation } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import { Footer } from "flowbite-react";

function App(){
  return(
    <>
    <div className="max-w-auto">
      <header>
        <Router>
          <Navigation />
        </Router>
      </header>
        <footer>
          <Footer container />
      </footer>
    </div>
    </>
  );
}

export default App;