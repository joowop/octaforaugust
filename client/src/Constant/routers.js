
import { Librarian } from "../pages/Librarian";
import { LibraryUser } from "../pages/LibraryUser";
import { CheckCollections, Organization } from "../pages/Librarian/Sidemenu";
import { FindBook, RecommendBook } from "../pages/LibraryUser/Sidemenu"
import { Main } from "../pages/Main"

const ROUTE_PATH_LIST = {
    "Main": {path: '/', component: Main, label: 'Main'},
    "LibrarianMain": {path: '/librarian', component: Librarian, label: 'Librarian Main'},
    "LibrarianCheckCollection": {path: '/librarian/check', component: CheckCollections, label: 'CheckCollection'},
    "LibrarianOrganization": {path: '/librarian/organize', component: Organization, label: 'Organization'},
    "LibraryUserMain": {path: '/library-user', component: LibraryUser, label: 'LibraryUser Main'},
    "FindBook": {path: '/library-user/find', component: FindBook, label: 'FindBook'},
    "RecommendBook": {path: '/library-user/recommend', component: RecommendBook, label: 'RecommendBook'},
}
export default ROUTE_PATH_LIST