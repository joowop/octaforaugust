import React from 'react';
import { Outlet } from 'react-router-dom';
function LibraryUser() {
  return (
    <>
    <div>LibraryUser</div>
    <Outlet/>
    </>
  );
}

export default LibraryUser;