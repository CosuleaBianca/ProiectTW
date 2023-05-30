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
        let fullName = this.firstName+" " + this.lastName;
        return fullName;
    }

    getDateOfDeath(){
        if(this.alive == true) deathDate = "-";
        else{
            bd = this.dateOfBirth.split(" ");
            dd= this.dateOfDeath.split(" ");
            years = parseInt(bd[2]) - parseInt(dd[2]);

            deathDate = this.dateOfDeath + "(" + years.toString() + ")";
        }
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
                loadDataJSON("./resources/data/game.json", gamePageLoad);
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
    const section = document.getElementById("section-title");
    section.replaceChildren();
    const h1 = document.createElement("h1");
    h1.innerText = data.title;
    section.appendChild(h1);


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
    const section = document.getElementById("section-title");
    section.replaceChildren();
    const h1 = document.createElement("h1");
    h1.innerText = data.title;
    section.appendChild(h1);

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
    const section = document.getElementById("section-title");
    section.replaceChildren();
    const h1 = document.createElement("h1");
    h1.innerText = data.title;
    section.appendChild(h1);

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

    const game = xml.getElementByTagName("game")[0];
    let title = game.getElementByTagName("title")[0].innerText;
    let subtitle = game.getElementByTagName("subtitle")[0].innerText;
    let details = game.getElementByTagName("details")[0];
    let name = game.getElementByTagName("name")[0].innerText;
    let developer = game.getElementByTagName("developer")[0].innerText;
    let platforms = game.querySelectorAll("platforms platform");
    let genre = game.getElementByTagName("genre")[0].innerText;
    let releaseDate = game.getElementByTagName("releaseDate")[0].innerText;
    let introduction = game.getElementByTagName("introduction")[0].innerText;
    let description = game.getElementByTagName("description")[0].innerText;
    let features = game.querySelectorAll("features feature");
        

}

function pageLoad(){
    page=sessionStorage.getItem("section");

    if(page==2) loadDataJSON("./resources/data/books.json", booksPageLoad);
    else if(page==3) loadDataJSON("./resources/data/films.json", filmsPageLoad);
    else if(page==4) loadDataJSON("./resources/data/characters.json", charactersPageLoad);
    else if(page==5) loadDataJSON("./resources/data/game.json", gamePageLoad);
    else loadDataJSON("./resources/data/home.json",homePageLoad);
}
 
