class Character {
    constructor(character){
        this.portraitURL = character.portraitURL;  
        this.name = character.name;
        this.quote = character.quote;
        this.description = character.description;
            this.fullName = character.fullName;
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
    }
    // TODO: metode
    getDateOfDeath(){
        if(!this.alive) return this.dateOfDeath
    }
}

function loadPage(){
    let characterJSON = localStorage.getItem("character");
    if(characterJSON != null) {
        var character = new Character(JSON.parse(localStorage.getItem("character")));
        console.log(character);
    }
    document.getElementById("portraitURL").setAttribute("src",character.portraitURL);
    document.getElementById("full-name").innerText = character.fullName;
    document.getElementById("dateOfBirth").innerText = character.dateOfBirth;
    if(character.alive == "true")
        document.getElementById("dateOfDeath").innerText = '-';
    else document.getElementById("dateOfDeath").innerText = character.dateOfDeath;
    document.getElementById("bloodStatus").innerText = character.bloodStatus;
    document.getElementById("maritalStatus").innerText = character.maritalStatus;
    let titlesList = document.getElementById("titles");
    titlesList.replaceChildren();
    for(title of character.titles){
        let li=document.createElement("li");
        li.innerText = title;
        titlesList.appendChild(li);
    }
    document.getElementById("species").innerText = character.species;
    document.getElementById("gender").innerText = character.gender;
    let familyList = document.getElementById("family");
    familyList.replaceChildren();
    for(member of character.family){
        let li=document.createElement("li");
        li.innerText = member;
        familyList.appendChild(li);
    }
    let occupationList = document.getElementById("occupation");
    occupationList.replaceChildren();
    for(occupation of character.occupation){
        let li=document.createElement("li");
        li.innerText = occupation;
        occupationList.appendChild(li);
    }
    document.getElementById("house").innerText = character.house;
    document.getElementById("name").innerText = character.name;
    document.getElementById("quote").innerText = character.quote;
    document.getElementById("description").innerText = character.description;
}

loadPage();