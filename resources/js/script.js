class Book {
    constructor(book){
        this.coverURL = book.coverURL;
        this.title = book.title;
        this.description = book.description;
        this.numberOfPages = book.numberOfPages;
        this.dateOfPublication = book.dateOfPublication;
    }
    // TODO: metode
}

class Character {
    constructor(character){
        this.portraitURL = character.portraitURL;  
        this.firstName = character.firstName;
        this.lastName = character.lastName;
        this.dateOfBirth = character.dateOfBirth;
        this.alive = character.alive;
        this.dateOfDeath = character.dateOfDeath;
        this.bloodStatus = character.bloodStatus;
        this.maritalStatus = character.maritalStatus;
        this.titles = character.titles;
        this.species = character.species;
        this.gender = character.gender;
        this.family = character.family;
        this.occupation = character.occupation;
        this.house = character.house;
        this.quote = character.quote;
        this.description = character.description;
    }
    // TODO: metode
    getShortName(){
        let firstNames = this.firstName.split(" ");
        let shortName = firstNames[0] + " " + this.lastName;
        return shortName; 
    }

    getFullName(){
        let fullName = this.firstName + " " + this.lastName;
        return fullName;
    }

    getDateOfDeath(){
        if(this.alive == "true") var deathDate = "-";
        else{
            let bd = this.dateOfBirth.split(" ");
            let dd= this.dateOfDeath.split(" ");
            let years = parseInt(dd[2]) - parseInt(bd[2]);

            var deathDate = this.dateOfDeath + " (" + years.toString() + " yrs)";
        }
        return deathDate;
    }
}

class Film {
    constructor(film){
        this.title = film.title;
        this.coverURL = film.coverURL;
        this.description = film.description;
        this.releaseDate = film.releaseDate;
        this.runtime = film.runtime;
    }
    // TODO: metode
}

const navButton = document.getElementById('nav-toggle');
const navMenu = document.querySelector('div.options ul');
//console.log(navMenu);

navButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    // console.log('ascund')  
})

let navMenuOptions = navMenu.childNodes;
//console.log(navMenuOptions);
for(i=0;i<navMenuOptions.length;i++){
    let child=navMenuOptions[i];
    if(child.nodeName == 'LI'){
        //console.log(child);
        child.addEventListener('click', () => {
            if(child.innerText == 'Home'){
                loadDataJSON("./resources/data/home.json", homePageLoad);
                navMenu.classList.toggle('show');
                //console.log('apas home')
            }
            else if(child.innerText == 'Books'){
                loadDataJSON("./resources/data/books.json", booksPageLoad);
                navMenu.classList.toggle('show');
                //console.log('apas books')
            }
            else if(child.innerText == 'Films'){
                loadDataJSON("./resources/data/films.json", filmsPageLoad);
                navMenu.classList.toggle('show');
                //console.log('apas films')
            }
            else if(child.innerText == 'Characters'){
                loadDataJSON("./resources/data/characters.json", charactersPageLoad);
                navMenu.classList.toggle('show');
                //console.log('apas Characters')
            }
            else if(child.innerText == 'Game'){
                loadDataXML("./resources/data/games.xml",gamePageLoadXML);
                // loadDataJSON("./resources/data/game.json", gamePageLoad);
                navMenu.classList.toggle('show');
                //console.log('apas Games')
            }
            
        })
    }
}

window.addEventListener("scroll", function () {
    let pb = document.getElementById("pb");
    let scrollTop = window.pageYOffset;
    pb.style.opacity = 0.3+scrollTop/930;
    // console.log(scrollTop);
    // console.log( pb.style.opacity)
 });

 //incarcare date din JSON 
async function loadDataJSON(url,callBackFnJSON){
    await fetch(url)
        .then(response => response.json())
        .then(json => callBackFnJSON(json));
}

function loadDataXML(url,callBackFnXML){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200)
            callBackFnXML(this.responseXML);
    };
    xhttp.open("GET",url, true);
    xhttp.send();
}

async function homePageLoad(json){
    sessionStorage.setItem("section", 1);

    const data = await json;
    document.getElementById("section-title").innerText = data.title;

    const main = document.getElementById("content");
    main.replaceChildren();

    const h2 = document.createElement("h2");
    h2.innerText = data.subtitle;
    main.appendChild(h2);

    let h3 = document.createElement("h3");
    h3.innerText = data.introduction.welcome;
    main.appendChild(h3);

    let introductionParagraphs = data.introduction.paragraphs;
    for(const paragraph of introductionParagraphs){
        let p = document.createElement("p");
        p.innerText = paragraph;
        main.appendChild(p);
    }
    
    //add houses data
    let houses = data.houses.houses_system;
    
    let div = document.createElement("div");
    
    h3 = document.createElement("h3");
    h3.innerText = data.houses.details.title;
    div.appendChild(h3);
    
    let p = document.createElement("p");
    p.innerText= data.houses.details.introduction;
    div.appendChild(p);

    let houseContainer = document.createElement("div");    
    for(const house of houses){
        houseContainer = document.createElement("div");
        houseContainer.classList.add("house");
        houseContainer.classList.add(house.name.toLowerCase())
        let textContainer = document.createElement("div");
        h3 = document.createElement("h3");
        h3.innerText = house.name + " House";
        textContainer.appendChild(h3);
    
        let pre = document.createElement("p");
        pre.style.whiteSpace = "pre-wrap";
        pre.innerText = `\t${house.name} valued ${house.values[0]}, ${house.values[1]} and ${house.values[2]}. It's emblematic animal was the ${house.animal}, and it's colors were ${house.colors[0]}, and ${house.colors[1]}. \n\t${house.ghost} was the House Ghost, and the founder of the house was ${house.founder}. \n\t${house.name} correspounded to the element of ${house.element}, and the common room was ${house.common_room}. Some of the notable members of the house were: `;
        textContainer.appendChild(pre);
        
        let ul = document.createElement("ul");
        let li = document.createElement("li");
        for(const member of house.members){
            li = document.createElement("li");
            li.innerText = member;
            ul.appendChild(li)
        }
        textContainer.appendChild(ul);
        let logo = document.createElement("img");
        logo.setAttribute("src", house.logo);
        logo.classList.add("house-logo")
        houseContainer.appendChild(textContainer);
        houseContainer.appendChild(logo)
        div.appendChild(houseContainer);
    }
    main.appendChild(div);
}

async function booksPageLoad(json){
    sessionStorage.setItem("section", 2);

    const data = await json;
    document.getElementById("section-title").innerText = data.title;

    const main = document.getElementById("content");
    main.replaceChildren();
    const p = document.createElement("p");
    p.innerText = data.introduction;
    main.appendChild(p);

    const books = data.books;
    for (let i = 0; i < books.length; i++) {
        const book = new Book(books[i]);
        let divCard = document.createElement("div");
        divCard.classList.add("book-card");
        let h2 = document.createElement("h2");
        h2.innerText = book.title;
        divCard.appendChild(h2);

        let img = document.createElement("img");
        img.setAttribute("src",book.coverURL);
        img.setAttribute("alt","Book cover");
        divCard.appendChild(img);

        let div = document.createElement("div");
        div.classList.add("book-card-content");
        let p = document.createElement("p");
        p.innerText = book.description;
        div.appendChild(p);
        p = document.createElement("p");
        p.innerText = book.numberOfPages + " pages";
        div.appendChild(p);
        p = document.createElement("p");
        p.innerText ="First published " + book.dateOfPublication;
        div.appendChild(p);
        divCard.appendChild(div);

        main.appendChild(divCard);
    }
}

async function filmsPageLoad(json){
    sessionStorage.setItem("section", 3);

    const data = await json;
    document.getElementById("section-title").innerText = data.title;

    const main = document.getElementById("content");
    main.replaceChildren();
    const p = document.createElement("p");
    p.innerText = data.introduction;
    main.appendChild(p);

    const films = data.films;
    for(const film of films){
        let divCard = document.createElement("div");
        divCard.classList.add("film-card");
        let h2 = document.createElement("h2");
        h2.innerText = film.title;
        divCard.appendChild(h2);

        let img = document.createElement("img");
        img.setAttribute("src",film.coverURL);
        img.setAttribute("alt","Film cover");
        divCard.appendChild(img);

        let div = document.createElement("div");
        div.classList.add("film-card-content");
        let p = document.createElement("p");
        p.innerText = film.description;
        div.appendChild(p);
        p = document.createElement("p");
        p.innerText="Runtime: " + film.runtime;
        div.appendChild(p);
        p = document.createElement("p");
        p.innerText="Release date " + film.releaseDate;
        div.appendChild(p);
        divCard.appendChild(div)
        
        main.appendChild(divCard);
    }
}

async function charactersPageLoad(json){
    sessionStorage.setItem("section", 4);

    const data = await json;
    document.getElementById("section-title").innerText = data.title;

    const main = document.getElementById("content");
    main.replaceChildren();
    const p = document.createElement("p");
    p.innerText = data.introduction;
    main.appendChild(p);

    const ul = document.createElement("ul");
    let div = document.createElement("div");
    div.classList.add('character-link');
    const characters = data.characters;
    for (let i = 0; i < characters.length; i++) {
        const character = new Character(characters[i]);

        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href","character.html");
        let img = document.createElement("img");
        img.setAttribute("src",character.portraitURL);
        img.setAttribute("alt","Portrait");
        a.appendChild(img)
        let span = document.createElement("span");
        span.innerText = character.getShortName();
        a.appendChild(span);
        li.appendChild(a);
        li.setAttribute("id","ch"+i);
        ul.appendChild(li);
        li.addEventListener('click',() => {
            localStorage.setItem("character",JSON.stringify(character));
        })
    }
    div.appendChild(ul);
    main.appendChild(div);
}

async function gamePageLoad(json){
    sessionStorage.setItem("section", 5);

    const data = await json;
    const section = document.getElementById("section-title");
    section.replaceChildren();
    const h1 = document.createElement("h1");
    h1.innerText = data.title;
    section.appendChild(h1);

    const main = document.getElementById("content");
    main.replaceChildren();
    const h2 = document.createElement("h2");
    h2.innerText = data.subtitle;
    main.appendChild(h2);

    const ul = document.createElement("ul");
    const games = data.content;
    for (let i = 0; i < games.length; i++) {
        let li = document.createElement("li");
        li.innerText = games[i].name + ":" + games[i].description;
        ul.appendChild(li);
    }
    main.appendChild(ul);
}

function gamePageLoadXML(xml){
    sessionStorage.setItem("section",5);

    const game = xml.getElementsByTagName("game")[0];
    let title = game.getElementsByTagName("title")[0].innerHTML;
    let subtitileImg = game.getElementsByTagName("subtitleImg")[0].innerHTML;
    let details = game.getElementsByTagName("details")[0];
    let name = details.getElementsByTagName("name")[0].innerHTML;
    let developer = details.getElementsByTagName("developer")[0].innerHTML;
    let platforms = details.getElementsByTagName("platforms")[0];
    let platformsArray = platforms.getElementsByTagName("platform");
    let genre = details.getElementsByTagName("genre")[0].innerHTML;
    let introduction = details.getElementsByTagName("introduction")[0].innerHTML;
    let description = details.getElementsByTagName("description")[0].innerHTML;
    let features = details.getElementsByTagName("features")[0];
    let featuresArray = features.getElementsByTagName("feature");


    document.getElementById("section-title").innerHTML = title;

    const main = document.getElementById("content");
    main.replaceChildren();
    //main.setAttribute("style","background-image: "+backgroundImg)
    
    let div = document.createElement("div");
    div.className = "game-details";
    let h4 = document.createElement("h4");
    h4.innerText = "Game:";
    div.appendChild(h4);
    let span = document.createElement("span");
    span.innerText = name;
    div.appendChild(span);
    main.appendChild(div);

    div = document.createElement("div");
    div.className = "game-details";
    h4 = document.createElement("h4");
    h4.innerText = "Developer:";
    div.appendChild(h4);
    span = document.createElement("span");
    span.innerText = developer;
    div.appendChild(span);
    main.appendChild(div);
    
    div = document.createElement("div");
    div.className = "game-details";
    div.classList.add("game-list")
    h4 = document.createElement("h4");
    h4.innerText = "Platforms:";
    div.appendChild(h4);
    let ul = document.createElement("ul");
    for(let i=0;i<platformsArray.length;i++){
       let li = document.createElement("li");
       li.innerText = platformsArray[i].innerHTML;
       ul.appendChild(li);
    }
    div.appendChild(ul);
    main.appendChild(div);

    div = document.createElement("div");
    div.className = "game-details";
    h4 = document.createElement("h4");
    h4.innerText = "Genre:";
    div.appendChild(h4);
    span = document.createElement("span");
    span.innerText = genre;
    div.appendChild(span);

    main.appendChild(div);

    let p = document.createElement("p");
    p.innerText = introduction;
    main.appendChild(p);

    p = document.createElement("p");
    p.innerText = description;
    main.appendChild(p);

    divContainer = document.createElement("div");
    divContainer.className ="game-container";
    let img = document.createElement("img");
    img.setAttribute("src",subtitileImg);
    divContainer.appendChild(img);
    let divCards = document.createElement("div");
    divCards.className = "game-cards";
    for(let i=0;i<featuresArray.length;i++){
        let divCard = document.createElement("div");
        divCard.className = "game-card";
        let h4 = document.createElement("h4");
        h4.innerText = featuresArray[i].getElementsByTagName("title")[0].innerHTML;
        let p = document.createElement("p");
        p.innerText = featuresArray[i].getElementsByTagName("description")[0].innerHTML;
        let img = document.createElement("img");
        img.setAttribute("src",featuresArray[i].getElementsByTagName("image")[0].innerHTML);
        divCard.appendChild(img);
        divCard.appendChild(h4);
        divCard.appendChild(p);
        divCards.appendChild(divCard);
    }
    divContainer.appendChild(divCards);
    main.appendChild(divContainer);

        
}

function pageLoad(){
    drawLogo();

    if(localStorage.getItem("theme")==null)
        localStorage.setItem("theme","light");

    let theme=localStorage.getItem("theme");
    var body=document.querySelector("body");
    body.className=theme;

    if(theme == "light") drawMoon(svg);
    else drawSun(svg);

    page=sessionStorage.getItem("section");

    if(page==2) loadDataJSON("./resources/data/books.json", booksPageLoad);
    else if(page==3) loadDataJSON("./resources/data/films.json", filmsPageLoad);
    else if(page==4) loadDataJSON("./resources/data/characters.json", charactersPageLoad);
    //else if(page==5) loadDataJSON("./resources/data/game.json", gamePageLoad);
    else if(page==5) loadDataXML("./resources/data/games.xml",gamePageLoadXML);
    else loadDataJSON("./resources/data/home.json",homePageLoad);
}
 
function drawLogo(){
    var canvas = document.getElementById("logo");
        var ctx = canvas.getContext("2d");

        //fulger
        ctx.strokeStyle = "black";
        ctx.lineWidth=3;
        ctx.beginPath();
        
        ctx.moveTo(30, 10);
        ctx.lineTo(10, 44);
        ctx.lineTo(24, 40);
        ctx.lineTo(22, 60);
        ctx.lineTo(40, 26);
        ctx.lineTo(26, 30);
        ctx.lineTo(30, 10);

        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "#f5d018";
        ctx.fill();
}


function changeTheme(){
    let theme=localStorage.getItem("theme");
    var svg = document.getElementById('svg');
    var body=document.querySelector("body");
    if(theme == "light"){
        body.className="dark";
        localStorage.setItem("theme","dark");
        drawSun(svg);
    }
    else{
        body.className="light";
        localStorage.setItem("theme","light");
        drawMoon(svg);
    }
}

var svgns = "http://www.w3.org/2000/svg";

function drawMoon(svg){
    svg.replaceChildren();

    var shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", 25);
    shape.setAttributeNS(null, "cy", 25);
    shape.setAttributeNS(null, "r",  23);
    shape.setAttributeNS(null, "fill", "black");
    svg.appendChild(shape);

    shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", 38);
    shape.setAttributeNS(null, "cy", 25);
    shape.setAttributeNS(null, "r",  18);
    shape.setAttributeNS(null, "fill", "#BFC0C0");
    svg.appendChild(shape);

}

function drawSun(svg){
    svg.replaceChildren();

    var shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", 25);
    shape.setAttributeNS(null, "cy", 25);
    shape.setAttributeNS(null, "r",  15);
    shape.setAttributeNS(null, "fill", "white");
    svg.appendChild(shape);

    shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", 25);
    shape.setAttributeNS(null, "cy", 3);
    shape.setAttributeNS(null, "r",  3);
    shape.setAttributeNS(null, "fill", "white");
    svg.appendChild(shape);
    shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", 25);
    shape.setAttributeNS(null, "cy", 48);
    shape.setAttributeNS(null, "r",  3);
    shape.setAttributeNS(null, "fill", "white");
    svg.appendChild(shape);

    shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", 3);
    shape.setAttributeNS(null, "cy", 25);
    shape.setAttributeNS(null, "r",  3);
    shape.setAttributeNS(null, "fill", "white");
    svg.appendChild(shape);
    shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", 48);
    shape.setAttributeNS(null, "cy", 25);
    shape.setAttributeNS(null, "r",  3);
    shape.setAttributeNS(null, "fill", "white");
    svg.appendChild(shape);

    shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", 9);
    shape.setAttributeNS(null, "cy", 9);
    shape.setAttributeNS(null, "r",  3);
    shape.setAttributeNS(null, "fill", "white");
    svg.appendChild(shape);
    shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", 42);
    shape.setAttributeNS(null, "cy", 42);
    shape.setAttributeNS(null, "r",  3);
    shape.setAttributeNS(null, "fill", "white");
    svg.appendChild(shape);

    shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", 42);
    shape.setAttributeNS(null, "cy", 9);
    shape.setAttributeNS(null, "r",  3);
    shape.setAttributeNS(null, "fill", "white");
    svg.appendChild(shape);
    shape = document.createElementNS(svgns, "circle");
    shape.setAttributeNS(null, "cx", 9);
    shape.setAttributeNS(null, "cy", 42);
    shape.setAttributeNS(null, "r",  3);
    shape.setAttributeNS(null, "fill", "white");
    svg.appendChild(shape);
}
