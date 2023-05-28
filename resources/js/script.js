const navButton = document.getElementById('nav-toggle');
const navMenu = document.querySelector('div.options ul');
//console.log(navMenu);

navButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    // console.log('ascund')  
})

let navMenuOptions = navMenu.childNodes;
console.log(navMenuOptions);
for(i=0;i<navMenuOptions.length;i++){
    let child=navMenuOptions[i];
    if(child.nodeName == 'LI'){
        //console.log(child);
        child.addEventListener('click', () => {
            if(child.innerText == 'Home'){
                loadData("./resources/data/first-page.json", homePageLoad);
                navMenu.classList.toggle('show');
                //console.log('apas home')
            }
            else if(child.innerText == 'Books'){
                loadData("./resources/data/test2.json", booksPageLoad);
                navMenu.classList.toggle('show');
                //console.log('apas books')
            }
            else if(child.innerText == 'Films'){
                loadData("./resources/data/test3.json", filmsPageLoad);
                navMenu.classList.toggle('show');
                //console.log('apas films')
            }
            else if(child.innerText == 'Characters'){
                loadData("./resources/data/test4.json", charactersPageLoad);
                navMenu.classList.toggle('show');
                //console.log('apas Characters')
            }
            else if(child.innerText == 'Games'){
                loadData("./resources/data/test5.json", gamesPageLoad);
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
async function loadData(url,callBackFnJSON){
    await fetch(url)
        .then(response => response.json())
        .then(json => callBackFnJSON(json));
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
        let divCard = document.createElement("div");
        divCard.classList.add("book-card");
        let h1 = document.createElement("h1");
        h1.innerText = books[i].title;
        divCard.appendChild(h1);

        let img = document.createElement("img");
        img.setAttribute("src",books[i].coverURL);
        img.setAttribute("alt","Book cover");
        divCard.appendChild(img);

        let div = document.createElement("div");
        div.classList.add("book-card-content");
        let p = document.createElement("p");
        p.innerText = books[i].description;
        div.appendChild(p);
        p = document.createElement("p");
        p.innerText = books[i].numberOfPages + " pages";
        div.appendChild(p);
        p = document.createElement("p");
        p.innerText ="First published " + books[i].dateOfPublication;
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
        let h1 = document.createElement("h1");
        h1.innerText = film.title;
        divCard.appendChild(h1);

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
    const characters = data.characters;
    for (let i = 0; i < characters.length; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href","character.html");
        a.innerText = characters[i].name;
        li.appendChild(a);
        li.setAttribute("id","ch"+i);
        ul.appendChild(li);
    }
    main.appendChild(ul);
}

async function gamesPageLoad(json){
    sessionStorage.setItem("section", 5);

    const data = await json;
    document.getElementById("section-title").innerText = data.title;

    const main = document.getElementById("content");
    main.replaceChildren();
    const h1 = document.createElement("h1");
    h1.innerText = data.subtitle;
    main.appendChild(h1);

    const ul = document.createElement("ul");
    const games = data.content;
    for (let i = 0; i < games.length; i++) {
        let li = document.createElement("li");
        li.innerText = games[i].name + ":" + games[i].description;
        ul.appendChild(li);
    }
    main.appendChild(ul);
}

function pageLoad(){
    page=sessionStorage.getItem("section");

    if(page==2) loadData("./resources/data/test2.json", booksPageLoad);
    else if(page==3) loadData("./resources/data/test3.json", filmsPageLoad);
    else if(page==4) loadData("./resources/data/test4.json", charactersPageLoad);
    else if(page==5) loadData("./resources/data/test5.json", gamesPageLoad);
    else loadData("./resources/data/first-page.json",homePageLoad);
}
 
