import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/index'
import Main from './pages/Main/Main';
import { Librarian } from './pages/Librarian';
import { LibraryUser } from './pages/LibraryUser';

function App() {
  return (
    <>    
    <Router>
      <header>
        <Navigation />
      </header>
      <body>
        <Routes>
          {/* 각 경로에 해당하는 컴포넌트를 라우트로서 렌더링 */}
          <Route index element={<Main/>} />
          <Route path="/librarian" element={<Librarian/>} />
          <Route path="/libraryUser" element={<LibraryUser/>} />
        </Routes>
      </body>
    </Router>
    </>

  );
}

export default App;
