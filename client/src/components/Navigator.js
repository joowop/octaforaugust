import React from "react";
import { Dropdown, Navbar } from 'flowbite-react';
import {RouteList} from '../components'
import {ROUTE_PATH_LIST} from "../Constant";


function Navigation(){
    return (
        <>
        <Navbar fluid rounded>
            <Navbar.Brand href="/">
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Sophia
                </span>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Dropdown inline label={<div>사서 이용자</div>}>
                    <Navbar.Link href={ROUTE_PATH_LIST.LibrarianLiveOrganization.path}>
                        장서 실시간 점검
                    </Navbar.Link>
                    <Navbar.Link href={ROUTE_PATH_LIST.LibrarianCheckCollection.path}>
                        장서 점검
                    </Navbar.Link>
                    <Navbar.Link href={ROUTE_PATH_LIST.LibrarianOrganization.path}>
                        장서 정리
                    </Navbar.Link>
                </Dropdown>
                <Dropdown inline label={<div>도서관 이용자</div>}>
                    <Navbar.Link href={ROUTE_PATH_LIST.FindBook.path}>
                        도서 찾기
                    </Navbar.Link>
                    <Navbar.Link href={ROUTE_PATH_LIST.RecommendBook.path}>
                        도서 추천
                    </Navbar.Link> 
                </Dropdown>
            </Navbar.Collapse>
        </Navbar>
        < RouteList />
        </>

    )
}

export default Navigation;