/*=============== SHOW MENU ===============*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId)

    if (!toggle || !nav) return

    toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu')
        toggle.classList.toggle('show-icon')

        if (!nav.classList.contains('show-menu')) {
            nav.querySelectorAll('.dropdown__item.show-dropdown').forEach((item) => {
                item.classList.remove('show-dropdown')
            })
        }
    })
}

const setupMobileDropdowns = () => {
    const dropdownItems = document.querySelectorAll('.dropdown__item')
    if (!dropdownItems.length) return

    dropdownItems.forEach((item) => {
        const trigger = Array.from(item.children).find((child) => child.classList && child.classList.contains('nav__link'))
        if (!trigger) return

        trigger.addEventListener('click', () => {
            if (window.innerWidth > 1118) return

            const isOpen = item.classList.contains('show-dropdown')

            dropdownItems.forEach((dropdownItem) => {
                dropdownItem.classList.remove('show-dropdown')
            })

            if (!isOpen) {
                item.classList.add('show-dropdown')
            }
        })
    })
}

const loadSharedHeader = async () => {
    const headerContainer = document.getElementById('site-header')
    if (!headerContainer) return

    try {
        const response = await fetch('header.html')
        if (!response.ok) throw new Error('Header non trovato')

        headerContainer.innerHTML = await response.text()
        showMenu('nav-toggle', 'nav-menu')
        setupMobileDropdowns()
    } catch (error) {
        console.error('Impossibile caricare header.html:', error)
    }
}

const loadSharedFooter = async () => {
    const footerContainer = document.getElementById('site-footer')
    if (!footerContainer) return

    try {
        const response = await fetch('footer.html')
        if (!response.ok) throw new Error('Footer non trovato')

        footerContainer.innerHTML = await response.text()
    } catch (error) {
        console.error('Impossibile caricare footer.html:', error)
    }
}

const loadSharedCtaIscrizione = async () => {
    const ctaContainer = document.getElementById('shared-cta-iscrizione')
    if (!ctaContainer) return

    try {
        const response = await fetch('cta-iscrizione.html')
        if (!response.ok) throw new Error('CTA iscrizione non trovata')

        ctaContainer.innerHTML = await response.text()
    } catch (error) {
        console.error('Impossibile caricare cta-iscrizione.html:', error)
    }
}

// Inizio Script per Descrizione a Scomparsa
document.addEventListener('DOMContentLoaded', function() {
    loadSharedHeader();
    loadSharedFooter();
    loadSharedCtaIscrizione();

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
    if (!parallax) return;
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

  
  
  
  


