const navButton = document.getElementById('nav-toggle');
const navMenu = document.querySelector('ul');

navButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    console.log('ascund')  
})
