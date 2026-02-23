// MonPortfolio — Main JavaScript

(function () {
  // Theme toggle
  var themeToggle = document.getElementById('theme-toggle');
  var root = document.documentElement;

  function getPreferredTheme() {
    var saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    themeToggle.setAttribute('aria-label',
      theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'
    );
  }

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener('click', function () {
    var current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    var next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  // Navbar toggle
  const toggle = document.getElementById('navbar-toggle');
  const menu = document.getElementById('navbar-menu');

  toggle.addEventListener('click', function () {
    const isOpen = menu.classList.toggle('navbar__menu--open');
    toggle.classList.toggle('navbar__toggle--open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  menu.querySelectorAll('.navbar__link').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('navbar__menu--open');
      toggle.classList.remove('navbar__toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
  // Load projects from JSON
  function loadProjects() {
    var grid = document.getElementById('projects-grid');

    fetch('data/projects.json')
      .then(function (response) {
        if (!response.ok) throw new Error(response.status);
        return response.json();
      })
      .then(function (projects) {
        grid.innerHTML = projects.map(function (project) {
          var tags = project.languages.map(function (lang) {
            return '<li class="project-card__tag">' + lang + '</li>';
          }).join('');

          return (
            '<article class="project-card">' +
              '<div class="project-card__banner"></div>' +
              '<div class="project-card__body">' +
                '<h3 class="project-card__title">' +
                  '<a href="' + project.url + '" target="_blank" rel="noopener noreferrer" aria-label="Voir le projet ' + project.name + '">' + project.name + '</a>' +
                '</h3>' +
                '<p class="project-card__description">' + project.description + '</p>' +
                '<ul class="project-card__tags">' + tags + '</ul>' +
                '<a href="' + project.url + '" class="project-card__link" target="_blank" rel="noopener noreferrer" aria-label="Voir ' + project.name + ' sur GitHub">Voir sur GitHub &rarr;</a>' +
              '</div>' +
            '</article>'
          );
        }).join('');
        observeSections('#projects');
      })
      .catch(function (err) {
        console.error('Erreur chargement projets:', err);
        grid.innerHTML = '<p class="projects-error" role="alert">Impossible de charger les projets.</p>';
        observeSections('#projects');
      });
  }

  loadProjects();

  // Fade-in sections on scroll
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in--visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  function observeSections(selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      if (!el.classList.contains('fade-in')) {
        el.classList.add('fade-in');
        observer.observe(el);
      }
    });
  }

  observeSections('.hero, main > section:not(#projects)');

})();
