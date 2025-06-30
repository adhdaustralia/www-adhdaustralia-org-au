function initCarousel() {
  const splideEl   = document.querySelector('.splide');
  const postSlides = document.querySelector('.post-slides');
  const tagSlides  = document.querySelector('.tag-slides');

  if (tagSlides && postSlides) {
    postSlides.querySelectorAll('li').forEach(slide => tagSlides.appendChild(slide));
    postSlides.remove();
  }

  if (tagSlides) {
    const slides = Array.from(tagSlides.querySelectorAll('li.tag-slide'));
    slides
      .sort((a, b) => {
        const aSeg = a.dataset.slug?.toLowerCase() || '';
        const bSeg = b.dataset.slug?.toLowerCase() || '';
        const aIdx = prioritySegments.indexOf(aSeg);
        const bIdx = prioritySegments.indexOf(bSeg);
        return (aIdx === -1 ? Infinity : aIdx) - (bIdx === -1 ? Infinity : bIdx);
      })
      .forEach(slide => tagSlides.appendChild(slide));
  }

  if (tagSlides) {
    tagSlides.querySelectorAll('.post-card-excerpt').forEach(el => {
      const txt = el.textContent.trim();
      const idx = txt.indexOf('.');
      if (idx > 0) {
        el.textContent = txt.slice(0, idx + 1);
      }
    });
  }

  if (splideEl?.querySelectorAll('.splide__slide').length) {
    new Splide(splideEl, {
      type        : 'loop',
      perPage     : 5,
      perMove     : 1,
      autoplay    : true,
      interval    : 3500,
      pauseOnHover: false,
      pagination  : false,
      arrows      : false,
      speed       : 900,
      padding     : 0,
      gap         : 0,
      easing      : 'ease-in-out',
      breakpoints : { 1024: { perPage: 2 }, 640: { perPage: 1 } }
    }).mount();
  }
}

// Defer initCarousel until DOM is ready
(function deferCarouselInit(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})(initCarousel);