import React from 'react';
import { ROUTE_PATH_LIST } from '../../../../Constant';
import { Navbar } from 'flowbite-react';
import { Link, Outlet } from 'react-router-dom';

function OrganizingCollections() {
  return (
    <>
      <Navbar>
        <Link to={ROUTE_PATH_LIST.OrganizeAll.path}>모든 장서 정리</Link>
        <Link to={ROUTE_PATH_LIST.OrganizeOne.path}>책장 정리</Link>
        <Link to={ROUTE_PATH_LIST.OrganizeNow.path}>책장 정리 Beta</Link>
      </Navbar>

      <Outlet/>
    </>
  );
}

export default OrganizingCollections;
