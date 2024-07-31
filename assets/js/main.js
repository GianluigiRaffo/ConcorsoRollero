/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)

   toggle.addEventListener('click', () =>{
       // Add show-menu class to nav menu
       nav.classList.toggle('show-menu')

       // Add show-icon to show and hide the menu icon
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')

// Inizio Script per Descrizione a Scomparsa
document.addEventListener('DOMContentLoaded', function() {
    const curriculumLinks = document.querySelectorAll('.curriculum-link');
    
    curriculumLinks.forEach(link => {
        link.addEventListener('click', function() {
            const curriculum = this.nextElementSibling;
            if (curriculum.style.display === 'none' || curriculum.style.display === '') {
                curriculum.style.display = 'block';
                this.classList.add('open'); // Aggiunge la classe open per ruotare la freccia
            } else {
                curriculum.style.display = 'none';
                this.classList.remove('open'); // Rimuove la classe open per tornare alla posizione iniziale
            }
        });
    });
});

// Fine Script per Descrizione a Scomparsa

// Inizio Script per Effetto Parallasse
document.addEventListener('scroll', function () {
    const parallax = document.querySelector('.parallax__bg');
    let scrollPosition = window.pageYOffset;
    parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
});
// Fine Script per Effetto Parallasse

// Funzione per FAQ
function toggleAnswer(element) {
    const answer = element.nextElementSibling;
    const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

    document.querySelectorAll('.faq__answer').forEach(el => {
        el.style.maxHeight = '0';
        el.style.padding = '0 1rem';
        el.previousElementSibling.classList.remove('active');
    });

    if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.padding = '1rem';
        element.classList.add('active');
    } else {
        answer.style.maxHeight = '0';
        answer.style.padding = '0 1rem';
        element.classList.remove('active');
    }
}

// Fine Funzione per FAQ

  
  
  
  


