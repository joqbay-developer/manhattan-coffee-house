

const LINKS__MENU = document.querySelectorAll('a[href^="#"]');


  LINKS__MENU.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const element = event.target;
      const id = element.getAttribute('href');
      document.querySelector(id).scrollIntoView({
        behavior:'smooth',
      });
    });
  });