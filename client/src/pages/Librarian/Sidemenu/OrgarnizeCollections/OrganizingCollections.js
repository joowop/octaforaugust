import React from 'react';
import { ROUTE_PATH_LIST } from '../../../../Constant';
import { Navbar } from 'flowbite-react';
import { Link, Outlet } from 'react-router-dom';

function OrganizingCollections() {
  return (
    <>
      <Navbar className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        <li className='mr-2'>
        <Link to={ROUTE_PATH_LIST.OrganizeAll.path} className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">모든 장서 정리</Link>
        </li>
        <li className='mr-2'>
        <Link to={ROUTE_PATH_LIST.OrganizeOne.path} className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">책장 정리</Link>
        </li>
        <li className='mr-2'>
        <Link to={ROUTE_PATH_LIST.OrganizeNow.path} className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">책장 정리 Beta</Link>
        </li>
      </ul>
      </Navbar>
      <Outlet/>
    </>
  );
}

export default OrganizingCollections;
