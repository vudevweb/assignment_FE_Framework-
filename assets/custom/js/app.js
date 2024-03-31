
const header_cus = document.querySelector('.header_cus');

function handleScroll() {
    if(window.scrollY >= 150) {
        header_cus.classList.add('header_cus_fixed');
    } else {
        header_cus.classList.remove('header_cus_fixed');
    }
}

window.addEventListener('scroll', handleScroll);
