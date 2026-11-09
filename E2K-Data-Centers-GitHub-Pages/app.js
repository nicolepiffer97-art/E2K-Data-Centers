const button=document.querySelector('.menu');const nav=document.querySelector('#navigation');function closeMenu(){button.setAttribute('aria-expanded','false');nav.classList.remove('open')}button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){closeMenu();button.focus()}});window.matchMedia('(min-width:721px)').addEventListener('change',event=>{if(event.matches)closeMenu()});
const serviceTargets = new Map([
  ['#design', document.querySelector('#design')],
  ['#engineer', document.querySelector('#design')],
  ['#build', document.querySelector('#build')],
  ['#connect', document.querySelector('#connect')],
]);

function openService(hash) {
  const service = serviceTargets.get(hash);
  if (service) service.open = true;
}

window.addEventListener('hashchange', () => openService(location.hash));
openService(location.hash);
