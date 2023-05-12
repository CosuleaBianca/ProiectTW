const navButton = document.getElementById('nav-toggle');
const navMenu = document.querySelector('div.options ul');
console.log(navMenu);

navButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    console.log('ascund')  
})
