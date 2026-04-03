// ─── Blog infinite scroll ──────────────────────────────────────────────────
(function () {
  var grid       = document.getElementById('post-grid');
  var sentinel   = document.getElementById('scroll-sentinel');
  var loader     = document.getElementById('quantum-loader');
  var pagination = document.querySelector('.pagination');

  if (!grid || !sentinel || !window.IntersectionObserver) return;

  var page = 1, loading = false, exhausted = false;
  var MAX_PAGES = 3;

  new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting || loading || exhausted) return;
    loadMore();
  }, { rootMargin: '300px' }).observe(sentinel);

  function loadMore() {
    loading = true;
    loader.hidden = false;
    page++;
    setTimeout(function () {
      appendCards(6);
      loader.hidden = true;
      loading = false;
      if (page >= MAX_PAGES) {
        exhausted = true;
        sentinel.remove();
      }
    }, 1200);
  }

  // Mock post data (cycles for additional pages)
  var mockPosts = [
    { cat: 'Terapie Manuală',   title: 'Tensiunea musculară cronică — de unde vine și cum o tratăm',     excerpt: 'Mușchii contractați permanent nu se relaxează singuri. Află mecanismele tensiunii cronice și protocoalele terapeutice care funcționează.', date: '2026-01-25', dateDisplay: '25 ianuarie 2026', read: '6 min citire', bg: '#6B2337' },
    { cat: 'Postură & Durere',  title: 'Postura corectă nu înseamnă să stai drept tot timpul',           excerpt: 'Mitul posturii perfecte și ce spune cu adevărat terapia manuală despre echilibrul postural dinamic al corpului.', date: '2026-01-18', dateDisplay: '18 ianuarie 2026', read: '5 min citire', bg: '#2A6E60' },
    { cat: 'Sistem Nervos',     title: 'Cum activezi sistemul nervos parasimpatic prin masaj',            excerpt: 'Trecerea din starea de alertă în starea de recuperare este posibilă. Descoperă tehnicile care stimulează nervul vag și calmul profund.', date: '2026-01-11', dateDisplay: '11 ianuarie 2026', read: '7 min citire', bg: '#3A8B7A' },
    { cat: 'Ritualuri',         title: 'Protocolul de reechilibrare musculo-articulară explicat',         excerpt: 'Ce include un protocol de 120 de minute și de ce această abordare completă dă rezultate pe care masajul standard nu le poate oferi.', date: '2026-01-04', dateDisplay: '4 ianuarie 2026', read: '5 min citire', bg: '#8B3048' },
    { cat: 'Nutriție & Corp',   title: 'Hidratarea și efectele ei asupra țesutului conjunctiv',          excerpt: 'Fascia uscată devine rigidă și dureroasă. Cum influențează hidratarea calitatea țesutului conjunctiv și eficiența terapiei.', date: '2025-12-28', dateDisplay: '28 decembrie 2025', read: '4 min citire', bg: '#4DA596' },
    { cat: 'Terapie Manuală',   title: 'Drenajul limfatic manual — beneficii și indicații',              excerpt: 'Mai mult decât estetică — drenajul limfatic manual susține imunitatea, recuperarea post-operatorie și echilibrul fluidelor din corp.', date: '2025-12-21', dateDisplay: '21 decembrie 2025', read: '6 min citire', bg: '#A8445F' },
  ];

  function appendCards(n) {
    var frag = document.createDocumentFragment();
    var revealEls = [];
    for (var i = 0; i < n; i++) {
      var post = mockPosts[(((page - 2) * n) + i) % mockPosts.length];
      var card = makeCard(post);
      frag.appendChild(card);
      revealEls.push(card);
    }
    grid.appendChild(frag);
    // Announce new cards to screen readers
    var loadStatus = document.getElementById('load-status');
    if (loadStatus) {
      loadStatus.textContent = n + ' articole noi au fost încărcate.';
    }
    // Stagger reveal
    revealEls.forEach(function (el, idx) {
      el.style.transitionDelay = (idx % 3) * 0.05 + 's';
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { el.classList.add('visible'); });
      });
    });
    // Re-apply active filter to newly loaded cards
    if (typeof grid._applyFilter === 'function') grid._applyFilter();
  }

  function makeCard(post) {
    var article = document.createElement('article');
    article.className = 'post-card reveal';
    article.dataset.cat = post.cat;
    article.innerHTML =
      '<div class="post-body">' +
        '<div class="post-card-header">' +
          '<span class="post-cat-pill">' + post.cat + '</span>' +
          '<time class="post-date" datetime="' + post.date + '">' + post.dateDisplay + '</time>' +
        '</div>' +
        '<h2 class="post-title"><a href="#">' + post.title + '</a></h2>' +
        '<p class="post-excerpt">' + post.excerpt + '</p>' +
      '</div>';
    return article;
  }
})();

// ─── Blog filter & search ──────────────────────────────────────────────────
(function () {
  var grid = document.getElementById('post-grid');
  if (!grid) return;

  var activeCat = 'all';
  var searchQuery = '';
  var searchTimer = null;

  // Expose so infinite scroll can re-apply after loading new cards
  grid._applyFilter = applyFilter;

  // Category filter buttons
  var filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) {
        b.classList.remove('filter-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('filter-btn--active');
      btn.setAttribute('aria-pressed', 'true');
      activeCat = btn.dataset.cat;
      applyFilter();
    });
  });

  // Search input with debounce
  var searchInput = document.getElementById('blog-search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(function () {
        searchQuery = searchInput.value.trim().toLowerCase();
        applyFilter();
      }, 240);
    });
  }

  function applyFilter() {
    var cards = grid.querySelectorAll('.post-card');
    var noResults = document.getElementById('blog-no-results');
    var visibleCount = 0;
    var showQueue = [];

    cards.forEach(function (card) {
      var cat = card.dataset.cat || '';
      var text = (
        (card.querySelector('.post-title') ? card.querySelector('.post-title').textContent : '') + ' ' +
        (card.querySelector('.post-excerpt') ? card.querySelector('.post-excerpt').textContent : '')
      ).toLowerCase();

      var catMatch = activeCat === 'all' || cat === activeCat;
      var searchMatch = !searchQuery || text.indexOf(searchQuery) !== -1;
      var matches = catMatch && searchMatch;

      if (matches) {
        visibleCount++;
        if (card.style.display === 'none') {
          // Was hidden — queue to animate in
          showQueue.push(card);
        } else {
          // Already in layout — cancel any pending hide
          card.classList.remove('filter-out');
        }
      } else {
        // Should be hidden
        if (card.style.display !== 'none' && !card.classList.contains('filter-out')) {
          card.classList.add('filter-out');
          (function (c) {
            setTimeout(function () {
              // Only collapse if still filtered out
              if (c.classList.contains('filter-out')) {
                c.style.display = 'none';
              }
            }, 280);
          })(card);
        }
      }
    });

    // Stagger animate-in for cards coming out of display:none
    showQueue.forEach(function (card, i) {
      card.style.display = '';
      card.classList.add('filter-out'); // start invisible
      (function (c, idx) {
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            setTimeout(function () {
              c.classList.remove('filter-out');
            }, idx * 50);
          });
        });
      })(card, i);
    });

    // No-results state
    if (noResults) {
      noResults.classList.toggle('visible', visibleCount === 0);
    }
  }
})();
