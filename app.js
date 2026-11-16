const button=document.querySelector('.menu');const nav=document.querySelector('#navigation');function closeMenu(){button.setAttribute('aria-expanded','false');nav.classList.remove('open')}button.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));document.addEventListener('keydown',event=>{if(event.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){closeMenu();button.focus()}});window.matchMedia('(min-width:721px)').addEventListener('change',event=>{if(event.matches)closeMenu()});

const servicePanels = [...document.querySelectorAll('.service-panel')];
const serviceControls = document.querySelector('.service-controls');
const serviceCounter = document.querySelector('.service-counter');
let activeService = 0;

function showService(index) {
  activeService = (index + servicePanels.length) % servicePanels.length;
  servicePanels.forEach((panel, position) => {
    panel.hidden = position !== activeService;
  });
  serviceCounter.textContent = `${activeService + 1} / ${servicePanels.length}`;
}

function showLinkedService() {
  const target = document.getElementById(location.hash.slice(1));
  const index = servicePanels.indexOf(target?.closest('.service-panel'));
  if (index !== -1) showService(index);
}

showService(0);
showLinkedService();
serviceControls.hidden = false;
serviceControls.querySelectorAll('[data-service-step]').forEach(button => {
  button.addEventListener('click', () => showService(activeService + Number(button.dataset.serviceStep)));
});
window.addEventListener('hashchange', showLinkedService);
