`use strict`

const axios = require("axios")
const cheerio = require("cheerio")
const puppeteer = require("puppeteer")
const fs = require('fs');


//지연함수
async function sleep(ms){
    const wakeUpTime = Date.now() + ms;
    while(Date.now() < wakeUpTime){}
}



async function Paging_crawling(href, time){

    let book_url_by_page = []

    const browser = await puppeteer.launch({
        headless: false,
    })

    const page = await browser.newPage();
    

    await page.setViewport({
        width: 1440,
        height: 1080
    })
   
    await page.goto(href,{
        waitUntil: 'load'
    })
    
    await sleep(time)

    const html = await page.content()
    const $ = cheerio.load(html)

    
    //해당 페이지 내에 있는 모든 책 url 가져오기
    for(let i= 1; i < 21; i++){
        let url_a_tag = $(`#homeTabAll > div.switch_prod_wrap.view_type_list > ol > li:nth-child(${i}) > div.prod_area > div.prod_info_box > a`)
        let url_text = $(url_a_tag).attr("href")
        
        if(url_text){
            book_url_by_page.push(url_text)
        }
    }
    
    await browser.close()

    return book_url_by_page
}

async function detail_crawling(href){


    const book_detail = {}

    const browser = await puppeteer.launch({
        headless: false,
    })

    const page = await browser.newPage();

    await page.setViewport({
        width: 1440,
        height: 1080
    })
    
    await page.goto(href, {
        waitUntil: 'load'

    });

    const html = await page.content()
    const $ = cheerio.load(html)
    
    //저자
    let authers =[]
    let get_authors = $('#contents > div.prod_detail_header > div > div.prod_detail_view_wrap > div.prod_detail_view_area > div:nth-child(1) > div > div.prod_author_box.auto_overflow_wrap > div.auto_overflow_contents > div > div > a')
    get_authors.map((idx, el)=>{
        authers.push(el.children[0]["data"])
    })

    let title = $('#contents > div.prod_detail_header > div > div.prod_detail_title_wrap > div > div.prod_title_box.auto_overflow_wrap > div.auto_overflow_contents > div > h1 > span').text()
    let score = $('#ReviewList1 > div.klover_review_box > div.klover_box_left > div.box_top > div > div.caption > span > span.val').text()
    
    let kloba_reviews= []
    //0: 집중돼요 1:도움돼요, 2: 쉬웠어요, 3: 최고예요, 4: 추천해요
    for(let i=1; i < 6; i++){
        let kloba_review = $(`#ReviewList1 > div.klover_review_box > div.klover_box_right > div.box_bottom > div > div:nth-child(${i}) > div > span`).text()
        kloba_reviews.push(Number(kloba_review.slice(0,-1)))
    }

    //함께 구매한 책
    let related_books = []
    for(let i=1; i< 6; i++){
        let related_book = $(`#scrollSpyProdInfo > div.product_detail_area.product_related > div.round_gray_box > div > ul > li:nth-child(${i}).prod_item> div > div.prod_info_box > a > span`).text()
        related_books.push(related_book)
    }

    //book isbn
    let isbn = $('#scrollSpyProdInfo > div.product_detail_area.basic_info > div.tbl_row_wrap > table > tbody > tr:nth-child(1) > td').text()
    let published_date = $('#scrollSpyProdInfo > div.product_detail_area.basic_info > div.tbl_row_wrap > table > tbody > tr:nth-child(2) > td').text()
    let book_pages = $('#scrollSpyProdInfo > div.product_detail_area.basic_info > div.tbl_row_wrap > table > tbody > tr:nth-child(3) > td').text()
    // book category 
    let categories = $("#scrollSpyProdInfo > div.product_detail_area.book_intro > div.intro_book > ul > li.category_list_item")

    let categories_list = {}
    categories.children('a').each((i, el)=>{
        if(!categories_list[$(el).text()]){
            categories_list[$(el).text()] = 0
        }
    })

    let review_box = $('#ReviewList1 > div.tab_wrap.type_sm > div.tab_content > div > div.comment_list > div:nth-child(1)')
    let review = $(review_box).find('.comment_text_box').text()
    book_detail["category"] = Object.keys(categories_list)
    book_detail["title"] = title
    book_detail["authers"] = authers
    book_detail["score"] = score
    book_detail["kloba_review"] = kloba_reviews
    book_detail["isbn"] = isbn
    book_detail["published_date"] = published_date.trim()
    book_detail["book_pages"] = book_pages
    book_detail["review"] = review

    browser.close()
    return book_detail
}


async function get_all_page_books_url(first, last, sleep_time, category_number){

    let current_page = first
    let last_page = last
    let book_url_list_from_all_pages = []

    while (current_page < last_page){
        try{
            let page_url = `https://product.kyobobook.co.kr/category/KOR/${category_number}#?page=${current_page}&type=all&per=20&sort=new`
            let book_urls_by_page = await Paging_crawling(page_url, sleep_time)
            book_url_list_from_all_pages.push(...book_urls_by_page)
            await sleep(3000)
            current_page +=1
        }catch(e){
            console.error(e)
            await sleep(3000)
        }
    }

    return book_url_list_from_all_pages
    
}

async function book_detail_list(first, last_page, book_urls, main_genre){

    let book_obj_arr = []
    
    for(let i=0; i <book_urls.length ; i++){
        
        try{
            let book = await detail_crawling(book_urls[i])
            book_obj_arr.push(book)
            await sleep(3000)
        }catch(e){
            console.error(e, Date.now(), "book details_crawling error")
        }
    }

        const jsonData = JSON.stringify(book_obj_arr, null, 2)

        fs.writeFileSync(`${main_genre}_${first}_to_${last_page-1}_page_data.json`, jsonData)
}




// 첫번째 인자 시작페이지, 두번째 인자 마지막페이지 


async function main(first, last, sleep_time, main_genre, category_number){

    const book_url_list_from_all_pages = await get_all_page_books_url(first, last+1, sleep_time, category_number)

    if(book_url_list_from_all_pages.length > 0){

        await book_detail_list(first, last+1, book_url_list_from_all_pages, main_genre)
    }
}

//시작페이지 // 끝페이지 // 페이지 로딩 시간 지연 // 파일 이름(장르)('/' 슬래시 안들어가게하기 ) // 소분류 카테고리 주소번호(문자열)
main(1, 19, 5000, "공포호러소설", '010104');


//https://product.kyobobook.co.kr/category/KOR/010105#?page=1&type=all&sort=new
//                                             ^^^^^^ 이부분 이 소분류 카테고리 주소번호