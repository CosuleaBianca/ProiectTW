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
        if(this.alive == true) var deathDate = "-";
        else{
            let bd = this.dateOfBirth.split(" ");
            let dd= this.dateOfDeath.split(" ");
            let years = parseInt(dd[2]) - parseInt(bd[2]);

            var deathDate = this.dateOfDeath + " (" + years.toString() + " yrs)";
        }
        return deathDate;
    }
}

function loadPage(){
    let theme=localStorage.getItem("theme");
    var body=document.querySelector("body");
    body.className=theme;

    let characterJSON = localStorage.getItem("character");
    if(characterJSON == null) {
        document.getElementById("name").innerText = "Pagina indisponibila!";
        var q = document.getElementsByClassName("content");
        var a = document.createElement("a");
        a.setAttribute("href","/index.html");
        a.innerText="Apasa aici.";
        q[0].appendChild(a);
        
    }
    else {
        var character = new Character(JSON.parse(localStorage.getItem("character")));

        document.getElementById("portraitURL").setAttribute("src",character.portraitURL);
        document.getElementById("full-name").innerText = character.getFullName();
        document.getElementById("dateOfBirth").innerText = character.dateOfBirth;
        document.getElementById("dateOfDeath").innerText = character.getDateOfDeath();
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
        document.getElementById("name").innerText = character.getShortName();
        document.getElementById("quote").innerText = character.quote;
        let descriptionList=document.getElementById("description");
        descriptionList.replaceChildren();
        for(description of character.description){
            let p=document.createElement("p");
            p.innerText = description;
            descriptionList.appendChild(p);
        }
    }
}

loadPage();
