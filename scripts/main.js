import { AddUser, CheckAuth, GetProfiles, GetUsers } from "./auth.js"
import { GetNews } from "./news.js"
import { generateString, monthNames } from "./utils.js"
import { GetWeather } from "./weather.js"


const countries = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve"]


const curr_page = window.location.pathname
const domain = window.location.hostname


const InitUsers = () => {
    console.log("Initializing User...")
    const users_newspoc = GetUsers()
    if(!users_newspoc) {
        const new_user = {
            id: generateString(10),
            username: "Rifat Noor",
            password: "sadd"
        }
        AddUser(new_user)
    }
}



const Update = () => {
    console.log("Updating..")
    Clock()

    if(!CheckAuth()) {
        if(curr_page != "/auth.html") {
            console.log("Go to login page")
            window.location.href = "/auth.html"
        }
    } else {
        if(curr_page == "/auth.html") {
            console.log("Go to home page")
            window.location.href = "/"
        }
    }
}



const Clock = () => {
    const hour_el = document.getElementById("hour")
    const minute_el = document.getElementById("minute")
    const second_el = document.getElementById("second")

    const day_el = document.getElementById("day")
    const month_el = document.getElementById("month")
    const year_el = document.getElementById("year")

    if(!hour_el || !minute_el || !second_el || !day_el || !month_el || !year_el) {
        return 
    }


    const d = new Date()

    hour_el.innerText = d.getHours().toString().length == 1 ? "0"+d.getHours() : d.getHours()
    minute_el.innerText = d.getMinutes().toString().length == 1 ? "0"+d.getMinutes() : d.getMinutes()
    second_el.innerText = d.getSeconds().toString().length == 1 ? "0"+d.getSeconds() : d.getSeconds()

    day_el.innerText = d.getDate().toString().length == 1 ? "0"+d.getDate() : d.getDate()
    month_el.innerText = monthNames[d.getMonth()]
    year_el.innerText = d.getFullYear()
}

const renderCountriesOptions = () => {
    const select_el = document.querySelector("#navbar select")

    if(!select_el) {
        return
    }

    countries.forEach(country_code => {
        let new_el = document.createElement("option")
        new_el.innerText = country_code
        select_el.appendChild(new_el)
    });
    
}

setInterval(Update,1000)

Update()
GetNews()
GetProfiles()
GetWeather()
InitUsers()


export {InitUsers, renderCountriesOptions}
