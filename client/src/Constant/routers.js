import React from 'react'
import {CheckCollections, LiveOrganization, Organization} from '../pages/Librarian/Sidemenu'
import {FindBook, RecommendBook} from '../pages/LibraryUser/Sidemenu'
import { Main } from '../pages/Main'
import { Librarian } from '../pages/Librarian'
import { LibraryUser } from '../pages/LibraryUser'
import {All, One, Now} from '../pages/Librarian/Sidemenu/OrgarnizeCollections'

const ROUTE_PATH_LIST = {
    "Main": {path: '/', component: <Main/>, label: 'Main'},
    "LibrarianMain": {path: '/librarian', component: <Librarian />, label: 'Librarian Main'},
    "LibrarianCheckCollection": {path: '/librarian/check', component: <CheckCollections/>, label: 'CheckCollection'},
    "LibrarianOrganization": {path: '/librarian/organize', component: <Organization/>, label: 'Organization'},
    "OrganizeAll":{path: 'librarian/organize/all', component: <All />, label: 'OrganizeAll'},
    "OrganizeOne":{path: 'librarian/organize/one', component: <One />, label: 'OrganizeOne'},
    "OrganizeNow":{path: 'librarian/organize/now', component: <Now />, label: 'OrganizeNow'},
    "LibrarianLiveOrganization": {path: '/librarian/live-organize', component: <LiveOrganization/>, label: 'Organization'},
    "LibraryUserMain": {path: '/library-user', component: <LibraryUser/>, label: 'LibraryUser Main'},
    "FindBook": {path: '/library-user/find', component: <FindBook/>, label: 'FindBook'},
    "RecommendBook": {path: '/library-user/recommend', component: <RecommendBook/>, label: 'RecommendBook'},
}
export default ROUTE_PATH_LIST