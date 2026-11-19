function setupHeader(container) {
  if (!container) return;

  const menu = container.querySelector('.site-menu');
  const toggle = menu.querySelector('summary');
  const panel = menu.querySelector('nav');
  const page = location.pathname.split('/').pop() || 'index.html';
  const desktopNav = container.querySelector('.site-nav--desktop');

  for (const link of container.querySelectorAll('a')) {
    if (link.getAttribute('href') === page) {
      link.setAttribute('aria-current', 'page');
    } else if (link.dataset.sectionPages?.split(' ').includes(page)) {
      link.dataset.currentSection = '';
    }
  }

  document.addEventListener('pointerdown', (event) => {
    if (menu.open && !menu.contains(event.target)) menu.open = false;
  });

  menu.addEventListener('focusout', (event) => {
    if (menu.open && event.relatedTarget && !menu.contains(event.relatedTarget)) menu.open = false;
  });

  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    // Resolve the closed panel before opening so its animations restart on the first frame.
    if (!menu.open) void panel.offsetWidth;
    menu.open = !menu.open;
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !menu.open) return;
    menu.open = false;
    toggle.focus();
  });

  window.addEventListener('resize', () => {
    if (menu.open && desktopNav.offsetWidth) menu.open = false;
  });

  panel.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    menu.open = false;

    if (link.getAttribute('aria-current') === 'page' && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      toggle.focus();
    }
  });

  setupDesktopNavigation(desktopNav);
}

function setupDesktopNavigation(nav) {
  let openGroup = null;

  function showGroup(group) {
    if (openGroup === group) return;
    if (openGroup) {
      openGroup.toggle.setAttribute('aria-expanded', 'false');
      openGroup.dropdown.hidden = true;
    }
    openGroup = group;
    if (openGroup) {
      openGroup.toggle.setAttribute('aria-expanded', 'true');
      openGroup.dropdown.hidden = false;
    }
  }

  for (const element of nav.querySelectorAll('.site-nav__group')) {
    const toggle = element.querySelector('.site-nav__toggle');
    const dropdown = document.getElementById(toggle.getAttribute('aria-controls'));
    const group = { element, toggle, dropdown };
    toggle.hidden = false;

    element.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'mouse') showGroup(group);
    });
    element.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'mouse' && openGroup === group && !element.contains(document.activeElement)) showGroup(null);
    });
    element.addEventListener('focusout', (event) => {
      if (openGroup === group && !element.contains(event.relatedTarget) && !element.matches(':hover')) showGroup(null);
    });
    toggle.addEventListener('click', () => showGroup(openGroup === group ? null : group));
  }

  document.addEventListener('pointerdown', (event) => {
    if (openGroup && !openGroup.element.contains(event.target)) showGroup(null);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !openGroup) return;
    if (openGroup.element.contains(document.activeElement)) openGroup.toggle.focus();
    showGroup(null);
  });
  window.addEventListener('resize', () => {
    if (!nav.offsetWidth) showGroup(null);
  });
}

function setupHomeRegistration(header) {
  const heroButton = document.querySelector('.home-hero__cta');
  const headerButton = header?.querySelector('.site-header__cta');
  if (!heroButton || !headerButton) return;

  function updateHeaderButton() {
    // The sticky header covers the top of the viewport as the hero scrolls away.
    const heroButtonBottom = heroButton.getBoundingClientRect().bottom;
    const headerBottom = header.getBoundingClientRect().bottom;
    headerButton.classList.toggle('is-visible', heroButtonBottom <= headerBottom);
  }

  updateHeaderButton();
  window.addEventListener('scroll', updateHeaderButton, { passive: true });
  window.addEventListener('resize', updateHeaderButton);
  window.addEventListener('pageshow', updateHeaderButton);
}

function setupIbanCopy(button) {
  if (!button) return;

  const iban = document.getElementById('iban');
  const status = document.getElementById('iban-status');
  button.hidden = false;

  button.addEventListener('click', async () => {
    status.textContent = '';
    const accountNumber = iban.textContent.trim();

    try {
      await navigator.clipboard.writeText(accountNumber);
      status.textContent = 'IBAN copiato negli appunti.';
      return;
    } catch {
      // Fall back to selecting the visible value when Clipboard API access is unavailable.
    }

    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.selectNodeContents(iban);
      selection.removeAllRanges();
      selection.addRange(range);

      if (document.execCommand?.('copy')) {
        selection.removeAllRanges();
        status.textContent = 'IBAN copiato negli appunti.';
        return;
      }
    }

    status.textContent = 'Copia automatica non disponibile. Puoi copiare l’IBAN manualmente.';
  });
}

const header = document.getElementById('site-header');
setupHeader(header);
setupHomeRegistration(header);
setupIbanCopy(document.querySelector('[data-copy-iban]'));
