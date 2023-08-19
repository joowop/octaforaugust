`use strict`

const axios = require("axios")
const cheerio = require("cheerio")
const puppeteer = require("puppeteer")
const fs = require('fs');
const { count } = require("console");

(async()=>{
const browser = await puppeteer.launch({
    headless: false,
})

const page = await browser.newPage();

await page.setViewport({
    width: 1440,
    height: 1080
})
await page.goto('https://product.kyobobook.co.kr/detail/S000203243955', {
    waitUntil: 'load'

});
const html = await page.content()
const $ = cheerio.load(html)

let categories = $("#scrollSpyProdInfo > div.product_detail_area.book_intro > div.intro_book > ul > li.category_list_item")

let categories_list = {}
    categories.children('a').each((i, el)=>{
        if(!categories_list[$(el).text()]){
            categories_list[$(el).text()] = 0
        }
    })

console.log(categories_list)

await browser.close()
})();
