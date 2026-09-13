'use strict';

// Content is present in the HTML; JavaScript only enhances navigation and filtering.
const archive = document.getElementById('publication-archive');
const filters = document.querySelector('.publication-filters');
const publications = [...document.querySelectorAll('.publication-list > li')];
const publicationCount = document.querySelector('.publication-count');

if (archive && filters && publicationCount) {
  const buttons = [...filters.querySelectorAll('button')];
  filters.hidden = false;

  function filterPublications(category) {
    let count = 0;
    for (const publication of publications) {
      publication.hidden = category !== 'all' && publication.dataset.category !== category;
      if (!publication.hidden) count += 1;
    }
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.filter === category));
    }
    publicationCount.textContent = `${count} papers and manuscripts · * Equal contribution`;
  }

  for (const button of buttons) {
    button.addEventListener('click', () => filterPublications(button.dataset.filter));
  }
  for (const link of document.querySelectorAll('[data-open-publications]')) {
    link.addEventListener('click', () => {
      archive.open = true;
      filterPublications('all');
    });
  }

  function revealLinkedPublication() {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target && (archive.contains(target) || target.id === 'publications')) {
      archive.open = true;
      filterPublications('all');
      requestAnimationFrame(() => target.scrollIntoView());
    }
  }
  window.addEventListener('hashchange', revealLinkedPublication);
  revealLinkedPublication();
}
