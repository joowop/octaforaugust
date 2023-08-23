import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Navi from './navi'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  return (
    <div className="Body">
      얍
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Navi />
      <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>

      </header>
         <Routes>
          <Route path="/" element={<Home />} /> {/* 경로가 / 인 경우 Home 컴포넌트 렌더링 */}
          {/* 더 많은 라우트 설정 */}
        </Routes>
        </BrowserRouter>
 </div>
  );
}

export default App;
