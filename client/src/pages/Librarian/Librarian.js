import React from 'react';
import SideBar from '../../components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import { Organization, CheckCollections } from './Sidemenu';

function Librarian() {
  return (
    <>
        <div> Librarian </div>
        <SideBar menu= "librarian"/>
        <Routes>
          <Route path="/librarian/organize" component={<Organization/>} /> {/* 경로 앞에 /librarian 추가 */}
          <Route path="/librarian/check" component={<CheckCollections/>} /> {/* 경로 앞에 /librarian 추가 */}
        </Routes>
    </>
  );
}

export default Librarian;