import React, { useState} from "react";
import { Navigation } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import { Button, Footer } from "flowbite-react";
import { Chatbot } from "./components"
function App(){

  const [click, setClick] = useState(false)

  const handleChatbotClick = () =>{
    setClick(!click)
  }

  return(
    <>
    <div className="max-w-auto">
      <header>
      <div className="relative">
              {click && <Chatbot option="/librarian/qa_chatbot"/>}
              <Button className="fixed -bottom-0 -right-0 m-8" onClick={handleChatbotClick}> Q/A</Button>
            </div>
        <Router>
          <Navigation />
        </Router>
      </header>
        <footer>
         
            <Footer />
      </footer>
    </div>
    </>
  );
}

export default App;