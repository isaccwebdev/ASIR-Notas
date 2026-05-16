const mainEl = document.getElementById('main');
let cur = 'cloud';

function go(doc) {
  cur = doc;
  document.getElementById('tab-c').className = 'doc-tab' + (doc==='cloud' ? ' act-c' : '');
  document.getElementById('tab-h').className  = 'doc-tab' + (doc==='hw'    ? ' act-h' : '');
  document.getElementById('ng-c').className   = 'nav-group' + (doc==='cloud' ? ' on' : '');
  document.getElementById('ng-h').className   = 'nav-group' + (doc==='hw'    ? ' on' : '');
  document.getElementById('pg-cloud').className = 'page' + (doc==='cloud' ? ' on' : '');
  document.getElementById('pg-hw').className    = 'page' + (doc==='hw'    ? ' on' : '');
  mainEl.scrollTop = 0;
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('hl-c','hl-h'));
}

function jump(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

// active link highlighting
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    const isC = id.startsWith('cc');
    const isH = id.startsWith('hw');
    if (!isC && !isH) return;
    const ng = document.getElementById(isC ? 'ng-c' : 'ng-h');
    ng.querySelectorAll('.nav-link').forEach(l => l.classList.remove('hl-c','hl-h'));
    ng.querySelectorAll('.nav-link').forEach(l => {
      if (l.getAttribute('onclick') === `jump('${id}')`) {
        l.classList.add(isC ? 'hl-c' : 'hl-h');
        l.scrollIntoView({block:'nearest', behavior:'smooth'});
      }
    });
  });
}, {root: mainEl, rootMargin: '-15% 0px -70% 0px'});

document.querySelectorAll('.sec[id]').forEach(s => io.observe(s));