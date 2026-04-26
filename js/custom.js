document.addEventListener('DOMContentLoaded', function () {
    if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
    }

    if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    window.scrollTo(0, 0);

    var navToggle = document.querySelector('.nav-toggle');
    var siteNav = document.querySelector('.site-nav');
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));
    var yearNode = document.getElementById('current-year');
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));

    if (yearNode) {
        yearNode.textContent = String(new Date().getFullYear());
    }

    if (navToggle && siteNav) {
        navToggle.addEventListener('click', function () {
            var isOpen = siteNav.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                siteNav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if (!('IntersectionObserver' in window) || !sections.length) {
        return;
    }

    var activateLink = function (id) {
        navLinks.forEach(function (link) {
            var isActive = link.getAttribute('href') === '#' + id;
            link.classList.toggle('is-active', isActive);
        });
    };

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                activateLink(entry.target.id);
            }
        });
    }, {
        rootMargin: '-35% 0px -50% 0px',
        threshold: 0.1
    });

    sections.forEach(function (section) {
        observer.observe(section);
    });
});