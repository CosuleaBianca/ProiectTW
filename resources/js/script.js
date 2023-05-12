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
    pb.style.opacity = 0.3+scrollTop/800;
    // console.log(scrollTop);
    // console.log( 0.3+scrollTop/830)
 });
