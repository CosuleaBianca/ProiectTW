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
}

async function booksPageLoad(json){
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
        li.innerText = characters[i].name;
        ul.appendChild(li);
    }
    main.appendChild(ul);
}

async function gamesPageLoad(json){
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

 loadData("./resources/data/first-page.json",homePageLoad);
