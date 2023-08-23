import React from 'react';
import SideBar from '../../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import { FindBooks, RecommendBooks } from './Sidemenu';

function Librarian() {
  return (
    <>
        <div> Library User </div>
        <SideBar menu= "library_user"/>
        <Routes>
          <Route path="/librarian/find" component={<FindBooks/>} /> {/* 경로 앞에 /librarian 추가 */}
          <Route path="/librarian/recomment" component={<RecommendBooks/>} /> {/* 경로 앞에 /librarian 추가 */}
        </Routes>
    </>
  );
}

export default Librarian;