const button=document.querySelector('.menu');const nav=document.querySelector('#navigation');function closeMenu(){button.setAttribute('aria-expanded','false');nav.classList.remove('open')}button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){closeMenu();button.focus()}});window.matchMedia('(min-width:721px)').addEventListener('change',event=>{if(event.matches)closeMenu()});

const carousel = document.querySelector('.service-carousel');
const slides = [...carousel.querySelectorAll('.service-card')];
const dots = [...carousel.querySelectorAll('.service-dot')];
const previous = carousel.querySelector('.service-prev');
const next = carousel.querySelector('.service-next');
const pagination = carousel.querySelector('.service-pagination');
const playback = carousel.querySelector('.service-playback');
const announcement = carousel.querySelector('.service-announcement');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const rotationDelay = 6000;
let current = 0;
let playing = !reducedMotion.matches;
let hovered = false;
let timer;

function scheduleRotation() {
  window.clearTimeout(timer);
  if (playing && !hovered && !document.hidden) {
    timer = window.setTimeout(() => showSlide(current + 1), rotationDelay);
  }
}

function setPlayback(enabled) {
  playing = enabled;
  playback.classList.toggle('is-paused', !playing);
  playback.setAttribute('aria-label', playing ? 'Pause automatic rotation' : 'Start automatic rotation');
  scheduleRotation();
}

function showSlide(index, announce = false) {
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, position) => {
    const active = current === position;
    slide.classList.toggle('is-current', active);
    slide.inert = !active;
    dots[position].setAttribute('aria-current', String(active));
  });
  if (announce) {
    const title = slides[current].querySelector('h3').textContent;
    announcement.textContent = `${title}, ${current + 1} of ${slides.length}`;
  }
  scheduleRotation();
}

function selectServiceFromHash() {
  const id = location.hash === '#engineer' ? 'design' : location.hash.slice(1);
  const index = slides.findIndex(slide => slide.id === id);
  if (index !== -1) {
    setPlayback(false);
    showSlide(index);
  }
}

carousel.classList.add('is-enhanced');
for (const control of [playback, previous, next, pagination]) control.hidden = false;
showSlide(0);
setPlayback(playing);
selectServiceFromHash();

previous.addEventListener('click', () => showSlide(current - 1, true));
next.addEventListener('click', () => showSlide(current + 1, true));
dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index, true)));
playback.addEventListener('click', () => setPlayback(!playing));

carousel.addEventListener('focusin', event => {
  if (event.target !== playback) setPlayback(false);
});
carousel.addEventListener('keydown', event => {
  if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
  event.preventDefault();
  setPlayback(false);
  showSlide(current + (event.key === 'ArrowLeft' ? -1 : 1), true);
});
carousel.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse') {
    hovered = true;
    scheduleRotation();
  }
});
carousel.addEventListener('pointerleave', event => {
  if (event.pointerType === 'mouse') {
    hovered = false;
    scheduleRotation();
  }
});
document.addEventListener('visibilitychange', scheduleRotation);
reducedMotion.addEventListener('change', event => setPlayback(!event.matches));
window.addEventListener('hashchange', selectServiceFromHash);
