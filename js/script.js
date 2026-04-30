/* ════════════════════════════════════════
   1. APP STATE
════════════════════════════════════════ */
const APP = {
  lang:     (window.ENV && ENV.DEFAULT_LANG) || 'fr',
  services: null,
  i18n:     null,
  chatOpen: false,
  chatFirstOpen: false,
  quote: { svcId: null, subId: null, answers: {}, base: 0, options: 0 },
};
let sending = false;

/* ════════════════════════════════════════
   RÉALISATIONS DATA
════════════════════════════════════════ */
const PROJECTS_DATA = [
  {
    id: 'shoptn', cat: 'ecommerce', icon: '🛒', imgCls: 'rz-img-ecom',
    pills: [
      { lbl: { fr: 'E-Commerce', en: 'E-Commerce', ar: 'تجارة إلكترونية' }, cls: 'rz-pill-ecom' },
      { lbl: { fr: 'Design',     en: 'Design',      ar: 'تصميم'           }, cls: 'rz-pill-design' }
    ],
    title: { fr: 'Tounexa',     en: 'Tounexa',      ar: 'Tounexa' },
    desc:  {
      fr: 'Marketplace multi-vendeurs avec paiements en ligne, dashboard analytics et app mobile.',
      en: 'Multi-vendor marketplace with online payments, analytics dashboard and mobile app.',
      ar: 'منصة متعددة البائعين مع مدفوعات إلكترونية ولوحة تحليلات وتطبيق موبايل.'
    },
    stats: [
      { v: '+340%', l: { fr: 'CA en 6 mois',  en: 'Revenue in 6 months', ar: 'إيرادات في 6 أشهر' } },
      { v: '1 200', l: { fr: 'produits',       en: 'products',            ar: 'منتج'              } },
      { v: '4 sem.',l: { fr: 'livraison',      en: 'delivery',            ar: 'تسليم'             } }
    ]
  },
  {
    id: 'opsdesk', cat: 'saas', icon: '☁️', imgCls: 'rz-img-saas',
    pills: [
      { lbl: { fr: 'SaaS', en: 'SaaS', ar: 'SaaS'              }, cls: 'rz-pill-saas' },
      { lbl: { fr: 'IA',   en: 'AI',   ar: 'ذكاء اصطناعي'      }, cls: 'rz-pill-ai'   }
    ],
    title: { fr: 'OpsDeski CRM', en: 'OpsDeski CRM', ar: 'OpsDeski CRM' },
    desc:  {
      fr: 'CRM sur mesure pour agences avec scoring IA des prospects et rapports automatiques.',
      en: 'Custom CRM for agencies with AI prospect scoring and automated reports.',
      ar: 'نظام CRM مخصص للوكالات مع تقييم ذكي للعملاء وتقارير آلية.'
    },
    stats: [
      { v: '3×',    l: { fr: 'productivité', en: 'productivity', ar: 'إنتاجية' } },
      { v: '850',   l: { fr: 'utilisateurs', en: 'users',        ar: 'مستخدم'  } },
      { v: '8 sem.',l: { fr: 'livraison',    en: 'delivery',     ar: 'تسليم'   } }
    ]
  },
  {
    id: 'medpro', cat: 'website', icon: '🌐', imgCls: 'rz-img-website',
    pills: [
      { lbl: { fr: 'Site Web', en: 'Website', ar: 'موقع ويب' }, cls: 'rz-pill-site' },
      { lbl: { fr: 'SEO',      en: 'SEO',     ar: 'SEO'       }, cls: 'rz-pill-ecom' }
    ],
    title: { fr: 'BookMed', en: 'BookMed', ar: 'BookMed  ' },
    desc:  {
      fr: 'Site vitrine + prise de RDV en ligne avec SEO optimisé — +210% de trafic organique.',
      en: 'Showcase site + online booking with advanced SEO — +210% organic traffic.',
      ar: 'موقع عرض + حجز مواعيد مع تحسين محركات البحث — +210% زيارات.'
    },
    stats: [
      { v: '+210%',  l: { fr: 'trafic',    en: 'traffic',    ar: 'زيارات'  } },
      { v: '95/100', l: { fr: 'PageSpeed', en: 'PageSpeed',  ar: 'السرعة'  } },
      { v: '2 sem.', l: { fr: 'livraison', en: 'delivery',   ar: 'تسليم'   } }
    ]
  },
  {
    id: 'delivfast', cat: 'mobile', icon: '📱', imgCls: 'rz-img-mobile',
    pills: [
      { lbl: { fr: 'Mobile', en: 'Mobile', ar: 'موبايل' }, cls: 'rz-pill-mobile' },
      { lbl: { fr: 'Design', en: 'Design', ar: 'تصميم'  }, cls: 'rz-pill-design' }
    ],
    title: { fr: 'DelivriFast App', en: 'DelivriFast App', ar: 'تطبيق DelivriFast' },
    desc:  {
      fr: 'Application iOS + Android de livraison avec tracking temps réel et paiement intégré.',
      en: 'iOS + Android delivery app with real-time tracking and integrated payment.',
      ar: 'تطبيق توصيل iOS + Android مع تتبع آني ودفع متكامل.'
    },
    stats: [
      { v: '4.8★', l: { fr: 'App Store', en: 'App Store', ar: 'App Store' } },
      { v: '12K',  l: { fr: 'téléch.',   en: 'downloads', ar: 'تحميل'    } },
      { v: '10 sem.',l:{ fr: 'livraison', en: 'delivery',  ar: 'تسليم'    } }
    ]
  },
  {
    id: 'novafinance', cat: 'design', icon: '🎨', imgCls: 'rz-img-design',
    pills: [
      { lbl: { fr: 'Branding', en: 'Branding', ar: 'هوية'  }, cls: 'rz-pill-design' },
      { lbl: { fr: 'UI/UX',    en: 'UI/UX',    ar: 'UI/UX'  }, cls: 'rz-pill-ecom'   }
    ],
    title: { fr: 'MetOva Finance', en: 'MetOva Finance', ar: ' MetOva Finance' },
    desc:  {
      fr: 'Identité visuelle complète + kit UI pour une fintech — logo, couleurs, typographie, composants.',
      en: 'Complete visual identity + UI kit for a fintech — logo, colors, typography, components.',
      ar: 'هوية بصرية كاملة + مجموعة UI لشركة fintech — شعار، ألوان، خطوط، مكونات.'
    },
    stats: [
      { v: '100%', l: { fr: 'cohérence',   en: 'consistency',  ar: 'اتساق'    } },
      { v: '6',    l: { fr: 'supports',    en: 'deliverables', ar: 'مخرجات'   } },
      { v: '1 sem.',l:{ fr: 'livraison',   en: 'delivery',     ar: 'تسليم'    } }
    ]
  },
  {
    id: 'autoreport', cat: 'ai', icon: '🤖', imgCls: 'rz-img-ai',
    pills: [
      { lbl: { fr: 'IA',            en: 'AI',          ar: 'ذكاء اصطناعي' }, cls: 'rz-pill-ai'   },
      { lbl: { fr: 'Automatisation',en: 'Automation',  ar: 'أتمتة'         }, cls: 'rz-pill-saas' }
    ],
    title: { fr: 'AutoBI', en: 'AutoBI', ar: 'AutoBI' },
    desc:  {
      fr: 'Dashboard analytique avec IA pour génération automatique de rapports et alertes prédictives.',
      en: 'Analytics dashboard with AI for automatic report generation and predictive alerts.',
      ar: 'لوحة تحليلات بذكاء اصطناعي لتوليد تقارير آلية وتنبيهات تنبؤية.'
    },
    stats: [
      { v: '-80%', l: { fr: 'temps rapport', en: 'report time',  ar: 'وقت التقرير' } },
      { v: '15',   l: { fr: 'intégrations',  en: 'integrations', ar: 'تكامل'        } },
      { v: '6 sem.',l:{ fr: 'livraison',     en: 'delivery',     ar: 'تسليم'        } }
    ]
  }
];

let RZ_CURRENT_CAT = 'all';

/* ════════════════════════════════════════
   2. DATA LOADING
════════════════════════════════════════ */
async function loadData() {
  try {
    const [s, i] = await Promise.all([
      fetch('data/services.json').then(r => r.json()),
      fetch('data/translations.json').then(r => r.json()),
    ]);
    APP.services = s;
    APP.i18n     = i;
    console.log('✅ Data loaded — services:', s.services.length, 'categories');
  } catch (err) {
    console.error('❌ Data load error:', err);
    const qa = document.getElementById('q-svc-grid');
    if (qa) qa.innerHTML = '<p style="color:red;padding:20px">Erreur de chargement des données. Ouvrez avec un serveur local (ex: npx serve .)</p>';
  }
}

/* ════════════════════════════════════════
   3. i18n — FR / EN / AR  +  RTL
════════════════════════════════════════ */
function injectArabicFont() {
  if (document.getElementById('arabic-font')) return;
  const link = document.createElement('link');
  link.id   = 'arabic-font';
  link.rel  = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap';
  document.head.appendChild(link);
}

function setLang(lang) {
  APP.lang = lang;
  const isAr = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir  = isAr ? 'rtl' : 'ltr';
  document.body.dataset.lang     = lang;
  if (isAr) {
    injectArabicFont();
    document.body.style.fontFamily = "'Noto Naskh Arabic', 'Space Grotesk', sans-serif";
  } else {
    document.body.style.fontFamily = "'Space Grotesk', sans-serif";
  }
  ['fr','en','ar'].forEach(l => {
    document.getElementById('btn-' + l)?.classList.toggle('on', l === lang);
  });
  renderAll();
}

function renderAll() {
  if (!APP.i18n) return;
  renderNav();
  renderHero();
  renderSolutions();
  renderMissions();
  renderProcess();
  renderRealisations();
  renderQuoteHeader();
  renderAbout();
  renderContact();
  renderFooter();
  renderChatbotTexts();
  if (APP.quote.svcId) {
    renderServiceButtons();
    renderQuoteService(APP.quote.svcId, false);
  } else {
    renderServiceButtons();
    const qa = document.getElementById('q-area');
    if (qa) qa.innerHTML = `<div class="q-empty">${gl('quote','empty')}</div>`;
  }
  if (APP.quote.subId) renderQuestions();
}

function gl(section, key) {
  const obj = APP.i18n?.[section]?.[key];
  if (!obj) return '';
  return obj[APP.lang] || obj.fr || '';
}

/* ── NAV ── */
function renderNav() {
  setText('nav-sol',  gl('nav','solutions'));
  setText('nav-mis',  gl('nav','missions'));
  setText('nav-real', gl('nav','realisations'));
  setText('nav-abo',  gl('nav','about'));
  setText('nav-quo',  gl('nav','quote'));
  setText('nav-con',  gl('nav','contact'));
  setText('nav-cta',  gl('nav','cta'));
}

/* ── HERO ── */
function renderHero() {
  setText('hero-badge', gl('hero','badge'));
  const h1 = document.getElementById('hero-h1');
  if (h1) {
    if (APP.lang === 'en') {
      h1.innerHTML = `${gl('hero','h1b')} <em>${gl('hero','h1em')}</em>`;
    } else {
      h1.innerHTML = `${gl('hero','h1a')} <em>${gl('hero','h1em')}</em>`;
    }
  }
  setText('hero-sub',  gl('hero','sub'));
  setText('hero-desc', gl('hero','desc'));
  const btn1 = document.getElementById('hero-btn1');
  if (btn1) btn1.innerHTML = `${gl('hero','btn1')} <span class="arr">→</span>`;
  setText('hero-btn2', gl('hero','btn2'));
  setText('hero-m1l',  gl('hero','m1l'));
  setText('hero-m2l',  gl('hero','m2l'));
  setText('hero-m3l',  gl('hero','m3l'));
  setText('hero-m4l',  gl('hero','m4l'));
}

/* ── SOLUTIONS ── */
function renderSolutions() {
  const s = APP.i18n.solutions;
  if (!s) return;
  setText('sol-tag',  s.tag?.[APP.lang] || '');
  const t = document.getElementById('sol-title');
  if (t) t.innerHTML = `${s.title?.[APP.lang] || ''} <em>${s.title_em?.[APP.lang] || ''}</em>`;
  setText('sol-desc',      s.desc?.[APP.lang] || '');
  setText('sol-pole1',     s.pole1?.[APP.lang] || '');
  setText('sol-pole2',     s.pole2?.[APP.lang] || '');
  setText('sol-adv-title', s.adv_title?.[APP.lang] || '');
  setText('sol-adv1b',     s.adv1b?.[APP.lang] || '');
  setText('sol-adv1t',     s.adv1t?.[APP.lang] || '');
  setText('sol-adv2b',     s.adv2b?.[APP.lang] || '');
  setText('sol-adv2t',     s.adv2t?.[APP.lang] || '');
  setText('sol-adv3b',     s.adv3b?.[APP.lang] || '');
  setText('sol-adv3t',     s.adv3t?.[APP.lang] || '');
  const it = s.items;
  if (it) {
    ['marketing','website','design','automation','saas','products','partnerships','ecommerce'].forEach(id => {
      setText(`si-${id}`,  it[id]?.[APP.lang] || '');
      setText(`sid-${id}`, it[`${id}_d`]?.[APP.lang] || '');
    });
  }
}

/* ── MISSIONS ── */
function renderMissions() {
  const m = APP.i18n.missions;
  if (!m) return;
  setText('mis-tag',  m.tag?.[APP.lang] || '');
  const t = document.getElementById('mis-title');
  if (t) t.innerHTML = `${m.title?.[APP.lang] || ''} <em>${m.title_em?.[APP.lang] || ''}</em>`;
  setText('mis-desc', m.desc?.[APP.lang] || '');
  setText('dev-t',    m.dev_t?.[APP.lang] || '');
  setText('mkt-t',    m.mkt_t?.[APP.lang] || '');
  setText('mng-t',    m.mng_t?.[APP.lang] || '');
  for (let i = 1; i <= 4; i++) {
    setText(`dev${i}`, m[`dev${i}`]?.[APP.lang] || '');
    setText(`mkt${i}`, m[`mkt${i}`]?.[APP.lang] || '');
    setText(`mng${i}`, m[`mng${i}`]?.[APP.lang] || '');
  }
}

/* ── PROCESS ── */
function renderProcess() {
  const p = APP.i18n.process;
  if (!p) return;
  setText('proc-tag',  p.tag?.[APP.lang] || '');
  const t = document.getElementById('proc-title');
  if (t) t.innerHTML = `${p.title?.[APP.lang] || ''} <em>${p.title_em?.[APP.lang] || ''}</em>`;
  setText('proc-desc', p.desc?.[APP.lang] || '');
  for (let i = 1; i <= 5; i++) {
    setText(`s${i}t`, p[`s${i}t`]?.[APP.lang] || '');
    setText(`s${i}d`, p[`s${i}d`]?.[APP.lang] || '');
  }
}

/* ════════════════════════════════════════
   RÉALISATIONS
════════════════════════════════════════ */
function renderRealisations() {
  renderRzTexts();
  renderRzGrid();
}

function renderRzTexts() {
  const r = APP.i18n?.realisations;
  if (!r) return;
  setText('rz-tag',     r.tag?.[APP.lang]     || '');
  setText('rz-desc',    r.desc?.[APP.lang]    || '');
  setText('rz-cta-sub', r.cta_sub?.[APP.lang] || '');

  const ctaBtn = document.getElementById('rz-cta-btn');
  if (ctaBtn) ctaBtn.innerHTML = `${r.cta_btn?.[APP.lang] || ''} <span class="arr">→</span>`;

  const t = document.getElementById('rz-title');
  if (t) t.innerHTML = `${r.title?.[APP.lang] || ''} <em>${r.title_em?.[APP.lang] || ''}</em>`;

  /* Filtre labels */
  ['all','ecommerce','saas','website','mobile','design','ai'].forEach(c => {
    setText('rz-f-' + c, r['f_' + c]?.[APP.lang] || '');
  });
}

function initRzFilters() {
  document.querySelectorAll('.rz-filter').forEach(btn => {
    btn.addEventListener('click', function () {
      RZ_CURRENT_CAT = this.dataset.cat;
      document.querySelectorAll('.rz-filter').forEach(b => b.classList.remove('on'));
      this.classList.add('on');
      renderRzGrid();
    });
  });
}

function renderRzGrid() {
  const grid = document.getElementById('rz-grid');
  if (!grid) return;
  const lang = APP.lang;
  const filtered = RZ_CURRENT_CAT === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.cat === RZ_CURRENT_CAT);

  grid.innerHTML = filtered.map((p, idx) => `
    <div class="rz-card reveal" style="transition-delay:${idx * 60}ms">
      <div class="rz-card-img ${p.imgCls}">${p.icon}</div>
      <div class="rz-card-body">
        <div class="rz-card-pills">
          ${p.pills.map(pill => `<span class="rz-pill ${pill.cls}">${pill.lbl[lang] || pill.lbl.fr}</span>`).join('')}
        </div>
        <div class="rz-card-title">${p.title[lang] || p.title.fr}</div>
        <div class="rz-card-desc">${p.desc[lang] || p.desc.fr}</div>
        <div class="rz-card-stats">
          ${p.stats.map(s => `
            <div class="rz-stat">
              <div class="rz-stat-v">${s.v}</div>
              <div class="rz-stat-l">${s.l[lang] || s.l.fr}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `).join('');

  /* Déclenche l'animation reveal */
  setTimeout(() => grid.querySelectorAll('.rz-card').forEach(c => c.classList.add('in')), 50);
}

/* ── QUOTE HEADER ── */
function renderQuoteHeader() {
  const q = APP.i18n.quote;
  if (!q) return;
  setText('q-tag',   q.tag?.[APP.lang] || '');
  const t = document.getElementById('q-title');
  if (t) t.innerHTML = `${q.title?.[APP.lang] || ''} <em>${q.title_em?.[APP.lang] || ''}</em>`;
  setText('q-desc',  q.desc?.[APP.lang] || '');
  setText('q-step1', q.step1?.[APP.lang] || '');
  setText('q-step2', q.step2?.[APP.lang] || '');
  setText('q-step3', q.step3?.[APP.lang] || '');
}

/* ── ABOUT ── */
function renderAbout() {
  const a = APP.i18n.about;
  if (!a) return;
  setText('abo-tag',  a.tag?.[APP.lang] || '');
  const t = document.getElementById('abo-title');
  if (t) t.innerHTML = `${a.title?.[APP.lang] || ''} <em>${a.title_em?.[APP.lang] || ''}</em>`;
  setText('abo-desc', a.desc?.[APP.lang] || '');
  for (let i = 1; i <= 4; i++) {
    setText(`v${i}t`, a[`v${i}t`]?.[APP.lang] || '');
    setText(`v${i}d`, a[`v${i}d`]?.[APP.lang] || '');
  }
  setText('abo-b1l', a.b1l?.[APP.lang] || '');
  setText('abo-b2l', a.b2l?.[APP.lang] || '');
}

/* ── CONTACT ── */
function renderContact() {
  const c = APP.i18n.contact;
  if (!c) return;
  setText('con-tag',    c.tag?.[APP.lang] || '');
  const t = document.getElementById('con-title');
  if (t) t.innerHTML = `${c.title?.[APP.lang] || ''} <em>${c.title_em?.[APP.lang] || ''}</em>`;
  setText('con-desc',   c.desc?.[APP.lang] || '');
  setText('con-addr-l', c.addr_l?.[APP.lang] || '');
  setText('con-addr-v', c.addr_v?.[APP.lang] || '');
  setText('con-avail-l',c.avail_l?.[APP.lang] || '');
  setText('con-avail-v',c.avail_v?.[APP.lang] || '');
  setText('con-offer',  c.offer?.[APP.lang] || '');
  setAttr('fn',  'placeholder', c.fn_ph?.[APP.lang] || '');
  setAttr('ln',  'placeholder', c.ln_ph?.[APP.lang] || '');
  setAttr('em',  'placeholder', c.em_ph?.[APP.lang] || '');
  setAttr('ph',  'placeholder', c.ph_ph?.[APP.lang] || '');
  setAttr('co',  'placeholder', c.co_ph?.[APP.lang] || '');
  setAttr('msg', 'placeholder', c.msg_ph?.[APP.lang] || '');
  setLabel('lbl-fn',  c.fn?.[APP.lang] || '');
  setLabel('lbl-ln',  c.ln?.[APP.lang] || '');
  setLabel('lbl-em',  c.em?.[APP.lang] || '');
  setLabel('lbl-ph',  c.ph?.[APP.lang] || '');
  setLabel('lbl-co',  c.co?.[APP.lang] || '');
  setLabel('lbl-svc', c.svc_l?.[APP.lang] || '');
  setLabel('lbl-sub', c.sub_l?.[APP.lang] || '');
  setLabel('lbl-bud', c.budget_l?.[APP.lang] || '');
  setLabel('lbl-msg', c.msg_l?.[APP.lang] || '');
  setText('fsub-txt',  c.submit?.[APP.lang] || '');
  setText('f-note',    c.note?.[APP.lang] || '');
  buildContactServiceSelect();
  buildBudgetPills();
}

/* ── FOOTER ── */
function renderFooter() {
  const f = APP.i18n.footer;
  if (!f) return;
  setText('ft-desc',   f.desc?.[APP.lang] || '');
  setText('ft-col1',   f.col1?.[APP.lang] || '');
  setText('ft-col2',   f.col2?.[APP.lang] || '');
  setText('ft-col3',   f.col3?.[APP.lang] || '');
  setText('ft-rights', f.rights?.[APP.lang] || '');
  setText('ft-made',   f.made?.[APP.lang] || '');
}

/* ── CHATBOT TEXTS ── */
function renderChatbotTexts() {
  const cb = APP.i18n.chatbot;
  if (!cb) return;
  setText('cb-title',  cb.title?.[APP.lang] || '');
  setText('cb-online', cb.online?.[APP.lang] || '');
  setAttr('cb-inp', 'placeholder', cb.inp_ph?.[APP.lang] || '');
  for (let i = 1; i <= 5; i++) {
    setText(`cb-qr${i}`, cb[`qr${i}`]?.[APP.lang] || '');
  }
  const wb = document.getElementById('cb-welcome-bub');
  if (wb) wb.textContent = cb.welcome?.[APP.lang] || wb.textContent;
}

/* ── DOM HELPERS ── */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}
function setAttr(id, attr, val) {
  const el = document.getElementById(id);
  if (el) el[attr] = val;
}
function setLabel(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

/* ════════════════════════════════════════
   4. CURSOR
════════════════════════════════════════ */
function initCursor() {
  const dot  = document.getElementById('cur');
  const ring = document.getElementById('ring');
  if (!dot || !ring) return;
  if ('ontouchstart' in window) { dot.style.display = 'none'; ring.style.display = 'none'; return; }
  document.addEventListener('mousemove', e => {
    dot.style.left  = (e.clientX - 4) + 'px';
    dot.style.top   = (e.clientY - 4) + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mouseover', e => {
    const el = e.target.closest('a,button,.svc-btn,.sol-item,.mc,.val-item,.c-info,.sub-btn,.q-opt,.q-tog-btn,.rz-card,.rz-filter');
    if (el) {
      dot.style.transform    = 'scale(2.5)';
      ring.style.borderColor = 'rgba(37,99,235,.7)';
    } else {
      dot.style.transform    = 'scale(1)';
      ring.style.borderColor = 'rgba(37,99,235,.4)';
    }
  });
}

/* ════════════════════════════════════════
   5. SCROLL
════════════════════════════════════════ */
function initScroll() {
  const pb  = document.getElementById('pb');
  const btt = document.getElementById('btt');
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    const h = document.body.scrollHeight - window.innerHeight;
    if (pb)  pb.style.transform = `scaleX(${h > 0 ? s / h : 0})`;
    if (nav) nav.classList.toggle('compact', s > 80);
    if (btt) btt.classList.toggle('show', s > 400);
    document.querySelectorAll('section[id]').forEach(sec => {
      if (s >= sec.offsetTop - 120 && s < sec.offsetTop + sec.offsetHeight - 120) {
        document.querySelectorAll('.nav-links a').forEach(a =>
          a.classList.toggle('active', a.getAttribute('href') === '#' + sec.id));
      }
    });
  }, { passive: true });
  btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/* ════════════════════════════════════════
   6. SCROLL REVEAL
════════════════════════════════════════ */
function initReveal() {
  const ro = new IntersectionObserver(
    entries => entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('in'), i * 60);
    }),
    { threshold: .08, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
}

/* Ré-observe les nouvelles cartes injectées dynamiquement */
function observeNewReveal() {
  const ro = new IntersectionObserver(
    entries => entries.forEach((e, i) => {
      if (e.isIntersecting) setTimeout(() => e.target.classList.add('in'), i * 60);
    }),
    { threshold: .08, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('#rz-grid .reveal:not(.in)').forEach(el => ro.observe(el));
}

/* ════════════════════════════════════════
   7. NAVIGATION
════════════════════════════════════════ */
function toggleNav() {
  document.getElementById('navLinks')?.classList.toggle('open');
}
function initNav() {
  document.querySelectorAll('.nav-links a').forEach(a =>
    a.addEventListener('click', () => document.getElementById('navLinks')?.classList.remove('open'))
  );
}

/* ════════════════════════════════════════
   8. QUOTE CALCULATOR
════════════════════════════════════════ */
function renderServiceButtons() {
  const container = document.getElementById('q-svc-grid');
  if (!container) return;
  if (!APP.services?.services?.length) {
    container.innerHTML = '<p class="q-empty">Chargement des services...</p>';
    return;
  }
  container.innerHTML = APP.services.services.map(svc => `
    <button class="svc-btn${APP.quote.svcId === svc.id ? ' on' : ''}"
            onclick="selectQService('${svc.id}')">
      <span class="sico">${svc.icon}</span>
      <span class="slbl">${svc.label?.[APP.lang] || svc.label?.fr || svc.id}</span>
    </button>
  `).join('');
}

function selectQService(svcId) {
  APP.quote.svcId   = svcId;
  APP.quote.subId   = null;
  APP.quote.answers = {};
  APP.quote.base    = 0;
  APP.quote.options = 0;
  renderServiceButtons();
  renderQuoteService(svcId, true);
  setStepActive(1);
  syncAndLockContactService(svcId);
}

function syncAndLockContactService(svcId, subId = null) {
  const cSvc = document.getElementById('c-svc');
  const cSub = document.getElementById('c-sub');
  const wrap = document.getElementById('c-sub-wrap');
  if (!APP.services?.services) return;
  if (cSvc) {
    cSvc.value = svcId;
    cSvc.disabled = true;
    cSvc.style.opacity = "0.7";
    cSvc.style.pointerEvents = "none";
    buildContactSubSelect(svcId);
  }
  if (subId && cSub) {
    setTimeout(() => { cSub.value = subId; }, 50);
    if (wrap) wrap.classList.add('show');
    cSub.disabled = true;
    cSub.style.opacity = "0.7";
    cSub.style.pointerEvents = "none";
  }
}

function renderQuoteService(svcId, animate) {
  const svc = APP.services?.services?.find(s => s.id === svcId);
  if (!svc) return;
  const subArea = document.getElementById('q-sub-area');
  if (!subArea) return;
  subArea.innerHTML = `
    <span class="sub-label">${gl('quote','step2')}</span>
    <div class="sub-grid">
      ${svc.subServices.map(ss => `
        <button class="sub-btn${APP.quote.subId === ss.id ? ' on' : ''}"
                onclick="selectSubService('${svcId}','${ss.id}')">
          ${ss.label?.[APP.lang] || ss.label?.fr || ss.id}
        </button>
      `).join('')}
    </div>`;
  subArea.style.display = 'block';
  if (animate) { subArea.style.animation = 'none'; void subArea.offsetWidth; subArea.style.animation = 'fadeIn .3s ease'; }
  const qArea = document.getElementById('q-area');
  if (qArea) qArea.innerHTML = `<div class="q-empty">${gl('quote','empty_sub')}</div>`;
  const est = document.getElementById('estimate-box');
  if (est) est.style.display = 'none';
}

function selectSubService(svcId, subId) {
  APP.quote.subId   = subId;
  APP.quote.answers = {};
  renderQuoteService(svcId, false);
  renderQuestions();
  setStepActive(2);
  syncAndLockContactService(svcId, subId);
}

function renderQuestions() {
  const svc = APP.services?.services?.find(s => s.id === APP.quote.svcId);
  const sub = svc?.subServices?.find(s => s.id === APP.quote.subId);
  if (!svc || !sub) return;
  const qArea = document.getElementById('q-area');
  if (!qArea) return;
  qArea.innerHTML = '';
  setStepActive(3);
  sub.questions.forEach((qId, idx) => {
    const qDef = APP.services.questions?.[qId];
    if (!qDef) return;
    const label = qDef.label?.[APP.lang] || qDef.label?.fr || qId;
    let inner = '';
    if (qDef.type === 'select') {
      inner = `<div class="q-select-opts">
        ${qDef.options.map(opt => `
          <button class="q-opt${APP.quote.answers[qId] === opt.value ? ' sel' : ''}"
                  onclick="answerQ('${qId}','${opt.value}',this)">
            ${opt.label?.[APP.lang] || opt.label?.fr || opt.value}
          </button>`).join('')}
      </div>`;
    } else if (qDef.type === 'toggle') {
      const cur = APP.quote.answers[qId];
      inner = `<div class="q-toggle">
        <button class="q-tog-btn${cur==='yes'?' sel-yes':''}" onclick="answerToggle('${qId}','yes',this)">
          ${gl('quote','yes')}
        </button>
        <button class="q-tog-btn${cur==='no'?' sel-no':''}" onclick="answerToggle('${qId}','no',this)">
          ${gl('quote','no')}
        </button>
      </div>`;
    } else if (qDef.type === 'multi') {
      const curVals = APP.quote.answers[qId] || [];
      inner = `<div class="q-multi">
        ${qDef.options.map(opt => `
          <button class="q-opt${curVals.includes(opt.value)?' sel':''}"
                  onclick="answerMulti('${qId}','${opt.value}',this)">
            ${opt.label?.[APP.lang] || opt.label?.fr || opt.value}
          </button>`).join('')}
      </div>`;
    }
    const item = document.createElement('div');
    item.className = 'q-item reveal';
    item.innerHTML = `<div class="q-item-label">${label}</div>${inner}`;
    qArea.appendChild(item);
    setTimeout(() => item.classList.add('in'), 50 + idx * 40);
  });
  updateEstimate();
}

function answerQ(qId, val, btn) {
  APP.quote.answers[qId] = val;
  btn.closest('.q-select-opts')?.querySelectorAll('.q-opt')
     .forEach(b => b.classList.toggle('sel', b === btn));
  updateEstimate();
}

function answerToggle(qId, val, btn) {
  APP.quote.answers[qId] = val;
  btn.closest('.q-toggle')?.querySelectorAll('.q-tog-btn')
     .forEach(b => b.classList.remove('sel-yes','sel-no'));
  btn.classList.add(val === 'yes' ? 'sel-yes' : 'sel-no');
  updateEstimate();
}

function answerMulti(qId, val, btn) {
  if (!APP.quote.answers[qId]) APP.quote.answers[qId] = [];
  const arr = APP.quote.answers[qId];
  const idx = arr.indexOf(val);
  if (idx > -1) { arr.splice(idx,1); btn.classList.remove('sel'); }
  else           { arr.push(val);    btn.classList.add('sel'); }
  updateEstimate();
}

function updateEstimate() {
  const svc = APP.services?.services?.find(s => s.id === APP.quote.svcId);
  const sub = svc?.subServices?.find(s => s.id === APP.quote.subId);
  if (!svc || !sub) return;
  let multiplier = 1;
  let addTotal   = 0;
  const rows = [];
  sub.questions.forEach(qId => {
    const qDef = APP.services.questions?.[qId];
    const ans  = APP.quote.answers[qId];
    if (!ans || !qDef) return;
    const label = qDef.label?.[APP.lang] || qDef.label?.fr || qId;
    if (qDef.type === 'select') {
      const opt = qDef.options.find(o => o.value === ans);
      if (!opt) return;
      const optLbl = opt.label?.[APP.lang] || opt.label?.fr || opt.value;
      if (opt.multiplier && opt.multiplier !== 1) {
        multiplier = Math.max(multiplier, opt.multiplier);
        rows.push({ l: label, v: `${optLbl}  ×${opt.multiplier}` });
      } else if (opt.add) {
        addTotal += opt.add;
        rows.push({ l: label, v: `${optLbl}  +${fmtN(opt.add)} TND` });
      } else {
        rows.push({ l: label, v: optLbl });
      }
    } else if (qDef.type === 'toggle' && ans === 'yes') {
      addTotal += qDef.add;
      rows.push({ l: label, v: `+${fmtN(qDef.add)} TND` });
    } else if (qDef.type === 'multi' && Array.isArray(ans)) {
      ans.forEach(v => {
        const opt = qDef.options.find(o => o.value === v);
        if (opt?.add) {
          addTotal += opt.add;
          rows.push({ l: `${label} (${opt.label?.[APP.lang]||opt.label?.fr||v})`, v: `+${fmtN(opt.add)} TND` });
        }
      });
    }
  });
  const finalBase = Math.round(sub.basePrice * multiplier);
  const total     = finalBase + addTotal;
  APP.quote.base    = finalBase;
  APP.quote.options = addTotal;
  let box = document.getElementById('estimate-box');
  if (!box) {
    box = document.createElement('div');
    box.id = 'estimate-box';
    box.className = 'estimate-box';
    document.getElementById('q-area')?.after(box);
  }
  box.style.display = 'block';
  const subLbl = sub.label?.[APP.lang] || sub.label?.fr || sub.id;
  const rowsHtml = rows.map(r =>
    `<div class="est-row"><span class="er-l">${r.l}</span><span class="er-v">${r.v}</span></div>`
  ).join('');
  box.innerHTML = `
    <div class="est-header">
      <h3>${gl('quote','est_title')}</h3>
      <button class="est-reset" onclick="resetQuote()">${gl('quote','reset')}</button>
    </div>
    <div class="est-rows">
      <div class="est-row">
        <span class="er-l">${gl('quote','base')} — ${subLbl}</span>
        <span class="er-v">${fmtN(finalBase)} ${gl('quote','currency')}</span>
      </div>
      ${rowsHtml}
    </div>
    <div class="est-total">
      <span class="et-l">${gl('quote','total')}</span>
      <span class="et-v" id="est-total-val">${fmtN(total)} ${gl('quote','currency')}</span>
    </div>
    <p class="est-note">${gl('quote','disclaimer')}</p>
    <button class="est-cta" onclick="goTo('contact')">${gl('quote','cta')}</button>`;
  const tv = document.getElementById('est-total-val');
  if (tv) { tv.classList.remove('bump'); void tv.offsetWidth; tv.classList.add('bump'); }
}

function resetQuote() {
  APP.quote = { svcId: null, subId: null, answers: {}, base: 0, options: 0 };
  const subArea = document.getElementById('q-sub-area');
  if (subArea) { subArea.innerHTML = ''; subArea.style.display = 'none'; }
  const qArea = document.getElementById('q-area');
  if (qArea) qArea.innerHTML = `<div class="q-empty">${gl('quote','empty')}</div>`;
  const box = document.getElementById('estimate-box');
  if (box) box.style.display = 'none';
  renderServiceButtons();
  setStepActive(0);
}

function setStepActive(n) {
  document.querySelectorAll('.q-step-lbl').forEach((el, i) =>
    el.classList.toggle('active', i < n));
}

function fmtN(n) { return Math.round(n).toLocaleString('fr-FR'); }

/* ════════════════════════════════════════
   9. CONTACT FORM
════════════════════════════════════════ */
function buildContactServiceSelect() {
  if (!APP.services?.services || !APP.i18n) return;
  const svcSel = document.getElementById('c-svc');
  if (!svcSel) return;
  const cur = svcSel.value;
  svcSel.innerHTML =
    `<option value="" disabled selected>${gl('contact','svc_ph')}</option>` +
    APP.services.services.map(s =>
      `<option value="${s.id}"${s.id===cur?' selected':''}>${s.label?.[APP.lang]||s.label?.fr||s.id}</option>`
    ).join('');
  if (cur) buildContactSubSelect(cur);
}

function onContactServiceChange(sel) {
  buildContactSubSelect(sel.value);
}

function buildContactSubSelect(svcId) {
  const wrap   = document.getElementById('c-sub-wrap');
  const subSel = document.getElementById('c-sub');
  if (!wrap || !subSel || !APP.services) return;
  const svc = APP.services.services.find(s => s.id === svcId);
  if (!svc?.subServices?.length) { wrap.classList.remove('show'); return; }
  subSel.innerHTML =
    `<option value="" disabled selected>${gl('contact','sub_ph')}</option>` +
    svc.subServices.map(ss =>
      `<option value="${ss.id}">${ss.label?.[APP.lang]||ss.label?.fr||ss.id}</option>`
    ).join('');
  wrap.classList.add('show');
}

function buildBudgetPills() {
  const wrap = document.getElementById('budget-pills');
  if (!wrap) return;
  const budgets = APP.i18n?.contact?.budgets;
  if (!budgets) return;
  const selected = [...wrap.querySelectorAll('.bpill.sel')].map(b => b.dataset.v);
  wrap.innerHTML = budgets.map(b =>
    `<button class="bpill${selected.includes(b.v)?' sel':''}" type="button"
             data-v="${b.v}" onclick="selBudget(this)">${b[APP.lang]||b.fr}</button>`
  ).join('');
}

function selBudget(el) {
  document.querySelectorAll('.bpill').forEach(b => b.classList.remove('sel'));
  el.classList.add('sel');
}
function showEmailError(input, message) {
  if (!input) return;

  input.style.border = "2px solid #e74c3c";

  const container = input.closest(".fg") || input.parentNode;

  let msg = container.querySelector(".email-error");

  if (!msg) {
    msg = document.createElement("div");
    msg.className = "email-error";
    msg.style.color = "#e74c3c";
    msg.style.fontSize = "12px";
    msg.style.marginTop = "5px";
    container.appendChild(msg);
  }

  msg.textContent = message;
}

function clearEmailError(input) {
  if (!input) return;

  input.style.border = "";

  const container = input.closest(".fg") || input.parentNode;
  const msg = container.querySelector(".email-error");

  if (msg) msg.remove();
}
async function sendForm() {
  if (sending) return;
  sending = true;

  const fn = document.getElementById('fn');
  const ln = document.getElementById('ln');
  const em = document.getElementById('em');
  const ph = document.getElementById('ph');
  const co = document.getElementById('co');
  const svc = document.getElementById('c-svc');
  const sub = document.getElementById('c-sub');
  const msg = document.getElementById('msg');

  const btn = document.getElementById('fsub');
  const txt = document.getElementById('fsub-txt');
  const arr = document.getElementById('fsub-arr');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\s]{6,20}$/;

  // 🔹 RESET email error au début
  clearEmailError(em);

  // ❌ VALIDATION

  if (fn.value.trim().length < 2) {
    showToast("Prénom requis");
    sending = false;
    return;
  }

  if (ln.value.trim().length < 2) {
    showToast("Nom requis");
    sending = false;
    return;
  }

  // 🔥 EMAIL (MESSAGE SOUS INPUT)
  const emailValue = em.value.trim();

  if (emailValue === "") {
    showEmailError(em, "Email requis");
    showToast("Email requis");
    sending = false;
    return;
  }

  if (!emailRegex.test(emailValue)) {
    showEmailError(em, "Exemple : SoftByn@gmail.com");
    showToast("Email invalide");
    sending = false;
    return;
  } else {
    clearEmailError(em);
  }

if (!iti.isValidNumber()) {
  showToast("Numéro invalide");
  ph.style.border = "2px solid #e74c3c";
  sending = false;
  return;
} else {
  ph.style.border = "";
}

  if (co.value.trim().length < 2) {
    showToast("Entreprise requise");
    sending = false;
    return;
  }

  if (!svc.value) {
    showToast("Choisir un service");
    sending = false;
    return;
  }

  if (!sub.value) {
    showToast("Choisir un sous-service");
    sending = false;
    return;
  }



  // 🔄 UI loading
  if (btn) btn.style.opacity = ".7";
  if (txt) txt.textContent = "Envoi...";
  if (arr) arr.textContent = "⏳";

  const payload = {
    lang: APP.lang,
    prenom: fn.value.trim(),
    nom: ln.value.trim(),
    email: em.value.trim(),
    tel: iti.getNumber(),
    company: co.value.trim(),
    service: svc.value,
    sub_service: sub.value,
    budget: document.querySelector('.bpill.sel')?.dataset.v || "",
    message: msg.value.trim(),
    estimate_base: APP.quote.base || 0,
    estimate_options: APP.quote.options || 0,
    estimate_total: (APP.quote.base || 0) + (APP.quote.options || 0),
    created_at: new Date().toISOString(),
  };

  try {
    const res = await fetch(
      `${window.ENV.SUPABASE_URL}/rest/v1/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: window.ENV.SUPABASE_ANON_KEY,
          Authorization: `Bearer ${window.ENV.SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      console.error(await res.text());
      showToast("Erreur serveur ❌");
      sending = false;
      return;
    }

    // ✅ SUCCESS
    showToast("Message envoyé avec succès ✔", "success");

    if (txt) txt.textContent = "Envoyé ✔";
    if (arr) arr.textContent = "✓";

    // reset form
    fn.value = "";
    ln.value = "";
    em.value = "";
iti.setNumber("");
    co.value = "";
    msg.value = "";

    svc.selectedIndex = 0;
    sub.selectedIndex = 0;

    document.getElementById('c-sub-wrap')?.classList.remove('show');
    document.querySelectorAll('.bpill').forEach(b => b.classList.remove('sel'));

  } catch (err) {
    console.error(err);
    showToast("Erreur réseau ❌");
  }

  // reset UI
  setTimeout(() => {
    if (btn) btn.style.opacity = "1";
    if (txt) txt.textContent = "Envoyer ma demande";
    if (arr) arr.textContent = "→";
    sending = false;
  }, 1500);
}

function showToast(message, type = "error") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
function setFieldError(input, message) {
  if (!input) return;

  input.style.border = "2px solid #e74c3c";

  let msg = input.parentNode.querySelector(".field-error");

  if (!msg) {
    msg = document.createElement("div");
    msg.className = "field-error";
    msg.style.color = "#e74c3c";
    msg.style.fontSize = "12px";
    msg.style.marginTop = "4px";
    input.parentNode.appendChild(msg);
  }

  msg.textContent = message;
}

function clearFieldError(input) {
  if (!input) return;

  input.style.border = "";

  const msg = input.parentNode.querySelector(".field-error");
  if (msg) msg.remove();
}
function clearEmailError(input) {
  if (!input) return;

  // reset border
  input.style.border = "";

  // récupérer le bon container (.fg ou parent)
  const container = input.closest(".fg") || input.parentNode;

  // chercher le message
  const msg = container.querySelector(".email-error");

  // supprimer s’il existe
  if (msg) {
    msg.remove();
  }
}
/* ════════════════════════════════════════
   10. CHATBOT
════════════════════════════════════════ */
function initChatbot() {
  const delay = window.ENV?.CHATBOT_OPEN_DELAY ?? 5000;
  setTimeout(() => { if (!APP.chatOpen) openChat(); }, delay);
}

function openChat() {
  if (APP.chatOpen) return;
  APP.chatOpen = true;
  document.getElementById('cbBox')?.classList.add('open');
  const badge = document.getElementById('cb-badge');
  if (badge) badge.style.display = 'none';
  const fab = document.getElementById('cbFab');
  if (fab) fab.innerHTML = '✕';
  if (!APP.chatFirstOpen) {
    APP.chatFirstOpen = true;
    const wb = document.getElementById('cb-welcome-bub');
    const wt = document.getElementById('cb-welcome-time');
    if (wb) wb.textContent = APP.i18n?.chatbot?.welcome?.[APP.lang] || wb.textContent;
    if (wt) {
      const now = new Date();
      wt.textContent = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
    }
  }
  setTimeout(() => document.getElementById('cb-inp')?.focus(), 300);
}

function closeChat() {
  APP.chatOpen = false;
  document.getElementById('cbBox')?.classList.remove('open');
  const fab = document.getElementById('cbFab');
  if (fab) fab.innerHTML = '🤖<div class="cb-badge" id="cb-badge" style="display:none">1</div>';
}

function toggleChat() {
  APP.chatOpen ? closeChat() : openChat();
}

function cbGetReply(text) {
  const kb = APP.i18n?.chatbot?.kb;
  if (!kb) return '...';
  const t = text.toLowerCase().trim();
  for (const [key, entry] of Object.entries(kb)) {
    if (key === 'fallback') continue;
    if (entry.kw?.some(kw => t.includes(kw.toLowerCase()))) {
      return entry[APP.lang] || entry.fr || '';
    }
  }
  return kb.fallback?.[APP.lang] || kb.fallback?.fr || '...';
}

async function cbSend() {
  const inp  = document.getElementById('cb-inp');
  const text = inp?.value.trim();
  if (!text) return;
  inp.value = '';
  document.getElementById('cb-qr-row').style.display = 'none';
  await cbAddMsg(text, 'user');
  showTyping(true);
  const reply = cbGetReply(text);
  await cbAddMsg(reply, 'bot', 800 + Math.random() * 600);
  showTyping(false);
}

async function cbSendQR(el) {
  const text = el.textContent.trim();
  document.getElementById('cb-qr-row').style.display = 'none';
  await cbAddMsg(text, 'user');
  showTyping(true);
  const reply = cbGetReply(text);
  await cbAddMsg(reply, 'bot', 700 + Math.random() * 500);
  showTyping(false);
}

function cbAddMsg(text, from, delay = 0) {
  return new Promise(res => {
    setTimeout(() => {
      const msgs   = document.getElementById('cb-msgs');
      const typing = document.getElementById('cb-typing');
      if (!msgs) { res(); return; }
      if (from === 'bot') typing?.classList.remove('show');
      const now  = new Date();
      const tstr = `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
      const d    = document.createElement('div');
      d.className = `msg ${from}`;
      d.innerHTML = `
        <div class="msg-bub">${text.replace(/\n/g,'<br>').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')}</div>
        <div class="msg-time">${tstr}</div>`;
      msgs.insertBefore(d, typing);
      msgs.scrollTop = msgs.scrollHeight;
      res();
    }, delay);
  });
}

function showTyping(show) {
  const t = document.getElementById('cb-typing');
  if (!t) return;
  t.classList.toggle('show', show);
  if (show) document.getElementById('cb-msgs').scrollTop = 99999;
}
const input = document.querySelector("#ph");

const iti = window.intlTelInput(input, {
  initialCountry: "auto",
  geoIpLookup: function(success, failure) {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => success(data.country_code))
      .catch(() => success("tn"));
  },
  utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.0.0/build/js/utils.js"
});
function getPhoneNumber() {
  return iti.getNumber(); // ex: +21612345678
}
/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  setLang(APP.lang);
  initCursor();
  initScroll();
  initReveal();
  initNav();
  initRzFilters();
  initChatbot();
});