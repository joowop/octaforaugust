const BASE_URL = "http://127.0.0.1:5000"

export const API = {
    MAIN : `${BASE_URL}`,
    LIBRARIAN: `${BASE_URL}/librarian`,
    CHECK_BOOKS_ARRANGEMENT : `${BASE_URL}/librarian/check_books`,
    MISSING_BOOKS: `${BASE_URL}/librarian/missing_books`,
    USER: `${BASE_URL}/user`,
    FIND_BOOKS: `${BASE_URL}/user/find_books`,
    RECOMMEND: `${BASE_URL}/user/recommend_books`
}