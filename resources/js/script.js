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
                loadData("./resources/data/test1.json", homePageLoad);
                //console.log('apas home')
            }
            else if(child.innerText == 'Books'){
                loadData("./resources/data/test2.json", booksPageLoad);
                //console.log('apas books')
            }
            else if(child.innerText == 'Films'){
                loadData("./resources/data/test3.json", filmsPageLoad);
                //console.log('apas films')
            }
            else if(child.innerText == 'Characters'){
                loadData("./resources/data/test4.json", charactersPageLoad);
                //console.log('apas Characters')
            }
            else if(child.innerText == 'Games'){
                loadData("./resources/data/test5.json", gamesPageLoad);
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
    const h1 = document.createElement("h1");
    h1.innerText = data.subtitle;
    main.appendChild(h1);

    let p = document.createElement("p");
    p.innerText = data.content.introduction;
    main.appendChild(p);

    p = document.createElement("p");
    p.innerText = data.content.content;
    main.appendChild(p);
}

async function booksPageLoad(json){
    const data = await json;
    document.getElementById("section-title").innerText = data.title;

    const main = document.getElementById("content");
    main.replaceChildren();
    const h1 = document.createElement("h1");
    h1.innerText = data.subtitle;
    main.appendChild(h1);

    const ul = document.createElement("ul");
    const books = data.content;
    for (let i = 0; i < books.length; i++) {
        let li = document.createElement("li");
        li.innerText = books[i].title + ":" + books[i].description;
        ul.appendChild(li);
    }
    main.appendChild(ul);
}

async function filmsPageLoad(json){
    const data = await json;
    document.getElementById("section-title").innerText = data.title;

    const main = document.getElementById("content");
    main.replaceChildren();
    const p = document.createElement("p");
    p.innerText = data.introduction;
    main.appendChild(p);

    const ul = document.createElement("ul");
    const films = data.content;
    for (let i = 0; i < films.length; i++) {
        let li = document.createElement("li");
        li.innerText = films[i].title + ":" + films[i].description;
        ul.appendChild(li);
    }
    main.appendChild(ul);
}

async function charactersPageLoad(json){
    const data = await json;
    document.getElementById("section-title").innerText = data.title;

    const main = document.getElementById("content");
    main.replaceChildren();
    const h1 = document.createElement("h1");
    h1.innerText = data.subtitle;
    main.appendChild(h1);

    const ul = document.createElement("ul");
    const characters = data.content;
    for (let i = 0; i < characters.length; i++) {
        let li = document.createElement("li");
        li.innerText = characters[i].name + ":" + characters[i].description;
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

 loadData("./resources/data/test1.json",homePageLoad);
