//toggle for active and non active
const navBar = document.querySelector('.nav-bar');

document.getElementById('menu').onclick = () => {
    navBar.classList.toggle('active');
};

const menu = document.getElementById('menu');

document.addEventListener('click', (e) => {
    if(!menu.contains(e.target) && !navBar.contains(e.target)){
        navBar.classList.remove('active');
    }
});