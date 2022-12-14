
'https://newsapi.org/v2/everything?q=Apple&from=2022-12-09&sortBy=popularity&apiKey=afebf1ea55464655b8d6b44367a09353'
'https://newsapi.org/v2/top-headlines?country=us&apiKey=afebf1ea55464655b8d6b44367a09353'
'https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=afebf1ea55464655b8d6b44367a09353'

import { formatDate, monthNames, monthShortNames } from "./utils.js"


const base_url = "https://newsapi.org/v2/"
// const api_key = "afebf1ea55464655b8d6b44367a09353" // Rifatnoor
const api_key = "aa5b334198c3416eaa0ba2142d84a0c9" // Bananatree
let q = "Apple&from=2022-12-09"
let sortBy = "popularity"
let country = "us"
let sources = "bbc-news"
let default_new_image = "https://puducherry-dt.gov.in/wp-content/themes/district-theme-2/images/news.jpg"



var typingTimer;
var doneTypingInterval = 1000;
const search_news_el = document.querySelector("input[name='search_news']")

if(search_news_el) {
    search_news_el.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(SearchNews, doneTypingInterval);
    })
    search_news_el.addEventListener('keydown', () => {
        clearTimeout(typingTimer);
    })
}

const SearchNews = () => {
    console.log("Searchng...")
    
    if (!search_news_el) {
        console.log("search_news_el not found")
        return
    }

    if(search_news_el.value == "") {
        GetNews()
        return
    }

    let url = `${base_url}everything?q=${search_news_el.value}&apiKey=${api_key}`
    
    SendNewsApiReq(url)
}

const ChangeCountry = (event) => {
    country = event.target.value
    GetNews()
}

const GetNews = () => {

    let url = `${base_url}top-headlines?country=${country}&apiKey=${api_key}`
    
    SendNewsApiReq(url)
}

const SendNewsApiReq = (url) => {
    var req = new Request(url);
    fetch(req)
        .then((response) => response.json())
        .then((responseJSON) => {
            console.log(responseJSON);

            renderNews(responseJSON.articles)
        })
}


const renderNews = (news) => {
    if(!news) {
        renderBigNews()
        return
    }


    if(news.length > 1) {
        console.log(news)
        renderBigNews(news[0])
        news.shift();
    } else {
        renderBigNews()
    }
    
    const news_container = document.getElementById("news_container")

    if(!news_container) {
        console.log("news_container not found")
        return
    }

    news_container.innerHTML = ''

    news.forEach(item => {
        news_container.appendChild(makeNewsCard(item))
    });
}

const renderBigNews = (big_news) => {
    const big_news_img = document.querySelector("#big_news img")
    const big_news_title = document.querySelector("#big_news #title")
    const big_news_authod = document.querySelector("#big_news #author")
    const big_news_date = document.querySelector("#big_news #date")


    if(!big_news_img || !big_news_title || !big_news_authod || !big_news_date) {
        return
    }
    
    if(!big_news) {
        big_news_img.src = default_new_image,
        big_news_title.innerText = ""
        big_news_authod.innerText = ""
        big_news_date.innerText = ""
    } else {

        formatDate(big_news.publishedAt)
        
        big_news_img.src = big_news.urlToImage ?? default_new_image
        big_news_title.innerText = big_news.title ?? ""
        big_news_authod.innerText = big_news.author ?? ""
        big_news_date.innerText = formatDate(big_news.publishedAt) ?? ""
    }
}

const makeNewsCard = (news_item) => {
    let new_el = document.createElement("div")
    new_el.classList.add("news_card")
    new_el.classList.add("shadow")

    new_el.innerHTML = `
        <div class="news_image_container">
            <img src="${news_item?.urlToImage ? news_item?.urlToImage : default_new_image}" alt="">
        </div>
        <div class="news_card_content">
            <div class="news_card_text">${news_item?.title?.substring(0, 70) ?? ""}...</div>
            <div class="flex between i_center">
                <div>${formatDate(news_item?.publishedAt) ?? ""}</div>
                <a href="${news_item?.url}" target="_blank">More</a>
            </div>
        </div>
    `

    return new_el
}


export {GetNews, SearchNews, ChangeCountry}