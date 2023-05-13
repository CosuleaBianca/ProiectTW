const navButton = document.getElementById('nav-toggle');
const navMenu = document.querySelector('div.options ul');
console.log(navMenu);

navButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    // console.log('ascund')  
})

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

    // const ul = document.createElement("ul");
    // let li = document.createElement("li");
    // li.innerText = (data.content)[0].title + ":" + (data.content)[0].description;
    // ul.appendChild(li);
    // li = document.createElement("li");
    // li.innerText = (data.content)[1].title + ":" + (data.content)[1].description;
    // ul.appendChild(li);
    // main.appendChild(ul);
 }

 loadData("./resources/data/test2.json",booksPageLoad);
