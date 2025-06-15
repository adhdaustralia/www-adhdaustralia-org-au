function initCarousel() {
  const splideEl   = document.querySelector('.splide');
  const postSlides = document.querySelector('.post-slides');
  const tagSlides  = document.querySelector('.tag-slides');

  if (tagSlides && postSlides) {
    postSlides.querySelectorAll('li').forEach(slide => tagSlides.appendChild(slide));
    postSlides.remove();
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

(function deferCarouselInit(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})(initCarousel);