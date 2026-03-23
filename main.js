// ===================== NAVIGATION =====================
const pages = ['home','calculator','guide','about','blog','contact','booking'];
function go(page){
  pages.forEach(p=>{
    const el=document.getElementById('page-'+p);
    if(el) el.classList.toggle('active', p===page);
  });
  window.scrollTo({top:0,behavior:'smooth'});
  // Close mobile nav
  document.getElementById('mobile-nav').classList.remove('open');
  // Init page
  if(page==='calculator') calcUpdate();
  if(page==='booking') initCal();
  // Trigger animations
  setTimeout(()=>{
    document.querySelectorAll('#page-'+page+' .fade-up').forEach(el=>el.classList.add('visible'));
  },80);
}
// Init home animations
setTimeout(()=>{
  document.querySelectorAll('#page-home .fade-up').forEach(el=>el.classList.add('visible'));
},200);

function toggleNav(){
  document.getElementById('mobile-nav').classList.toggle('open');
}

// ===================== SCROLL EFFECTS =====================
window.addEventListener('scroll',()=>{
  const s=window.scrollY;
  const nav=document.getElementById('nav');
  nav.classList.toggle('scrolled',s>20);
  const cta=document.getElementById('sticky-cta');
  cta.classList.toggle('show',s>300);
});

// ===================== INTERSECTION OBSERVER =====================
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold:0.1});
document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el));

// ===================== CALCULATOR =====================
function calcUpdate(){
  const price=+document.getElementById('c-price').value;
  const downPct=+document.getElementById('c-down').value;
  const rate=+document.getElementById('c-rate').value/100/12;
  const term=+document.getElementById('c-term').value*12;
  const down=price*(downPct/100);
  const loan=price-down;
  const emi=rate>0 ? loan*rate*Math.pow(1+rate,term)/(Math.pow(1+rate,term)-1) : loan/term;
  const totalInterest=(emi*term)-loan;
  document.getElementById('c-price-val').textContent='$'+price.toLocaleString();
  document.getElementById('c-down-val').textContent=downPct+'% — $'+Math.round(down).toLocaleString();
  document.getElementById('c-emi').textContent='$'+Math.round(emi).toLocaleString();
  document.getElementById('c-loan').textContent='$'+Math.round(loan).toLocaleString();
  document.getElementById('c-interest').textContent='$'+Math.round(totalInterest).toLocaleString();
  document.getElementById('c-total').textContent='$'+Math.round(totalInterest+price).toLocaleString();
}

// ===================== CALENDAR =====================
let calDate=new Date(); let selectedCalDay=null;
const months=['January','February','March','April','May','June','July','August','September','October','November','December'];
const days=['Su','Mo','Tu','We','Th','Fr','Sa'];

function initCal(){renderCal();}
function prevMonth(){calDate.setMonth(calDate.getMonth()-1);renderCal();}
function nextMonth(){calDate.setMonth(calDate.getMonth()+1);renderCal();}

function renderCal(){
  const y=calDate.getFullYear(),m=calDate.getMonth();
  document.getElementById('cal-label').textContent=months[m]+' '+y;
  const first=new Date(y,m,1).getDay();
  const last=new Date(y,m+1,0).getDate();
  const today=new Date();today.setHours(0,0,0,0);
  let html=days.map(d=>`<div class="cal-day-name">${d}</div>`).join('');
  for(let i=0;i<first;i++) html+='<div></div>';
  for(let d=1;d<=last;d++){
    const dt=new Date(y,m,d);
    const isPast=dt<today;
    const isSun=dt.getDay()===0;
    const isToday=dt.getTime()===today.getTime();
    const isSel=selectedCalDay===d && m===calDate.getMonth() && y===calDate.getFullYear();
    let cls='cal-day';
    if(isPast||isSun) cls+=' cal-disabled';
    if(isToday&&!isPast) cls+=' cal-today';
    if(isSel) cls+=' cal-selected';
    html+=`<div class="${cls}" onclick="selectDay(${d})">${d}</div>`;
  }
  document.getElementById('cal-grid').innerHTML=html;
}

function selectDay(d){
  selectedCalDay=d;renderCal();
  const mn=months[calDate.getMonth()];
  const yr=calDate.getFullYear();
  document.getElementById('selected-date-label').textContent=mn+' '+d+', '+yr;
  const times=['9:00 AM','10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'];
  document.getElementById('time-grid').innerHTML=times.map(t=>`<div class="time-slot" onclick="selectTime(this,'${t}')">${t}</div>`).join('');
  document.getElementById('booking-form-wrap').style.display='none';
  document.getElementById('booking-right').style.display='block';
}

function selectTime(el,t){
  document.querySelectorAll('.time-slot').forEach(s=>s.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('booking-form-wrap').style.display='block';
}

function submitBooking(e){
  e.preventDefault();
  document.getElementById('booking-wrap').innerHTML=`
    <div class="success-state">
      <div class="success-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg></div>
      <h2 style="font-family:var(--serif);font-size:2rem;margin-bottom:12px">Booking Confirmed!</h2>
      <p style="color:var(--muted);margin-bottom:24px;max-width:400px;margin-inline:auto">We'll send a calendar invite to your email. Your Shirley Ji advisor will be in touch within the hour to confirm details.</p>
      <button class="btn-outline" onclick="go('home')">Back to Home</button>
    </div>`;
}

function submitContact(e){
  e.preventDefault();
  document.getElementById('contact-form-wrap').innerHTML=`
    <div class="success-state">
      <div class="success-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg></div>
      <h2 style="font-family:var(--serif);font-size:1.8rem;margin-bottom:12px">Message Sent!</h2>
      <p style="color:var(--muted)">We'll get back to you within 1 business day.</p>
    </div>`;
}

// ===================== VIDEO MOCK =====================
function playVideo(el){
  el.style.pointerEvents='none';
  const overlay=el.querySelector('.play-btn');
  if(overlay) overlay.style.display='none';
  const img=el.querySelector('img');
  if(img) img.style.opacity='0.2';
  const label=el.nextElementSibling;
  if(label) label.textContent='▶ Video Playing (demo)';
}

// ===================== AI CHATBOT =====================
let chatOpen=false;
let chatHistory=[];

function toggleChat(){
  chatOpen=!chatOpen;
  document.getElementById('chat-window').classList.toggle('open',chatOpen);
  document.getElementById('chat-open-icon').style.display=chatOpen?'none':'block';
  document.getElementById('chat-close-icon').style.display=chatOpen?'block':'none';
}

async function sendChat(e){
  e.preventDefault();
  const input=document.getElementById('chat-input');
  const msg=input.value.trim();
  if(!msg) return;
  input.value='';

  // Render user bubble
  const body=document.getElementById('chat-body');
  body.innerHTML+=`<div class="chat-bubble bubble-user">${escHtml(msg)}</div>`;
  
  // Typing indicator
  const typingId='typing-'+Date.now();
  body.innerHTML+=`<div class="chat-bubble bubble-bot bubble-typing" id="${typingId}"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
  body.scrollTop=body.scrollHeight;

  chatHistory.push({role:'user',content:msg});

  try{
    const res=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'claude-sonnet-4-20250514',
        max_tokens:1000,
        system:`You are a helpful, friendly real estate advisor for Shirley Ji — a premium, education-first advisory firm for first-time homebuyers — led by Shirley Ji. Your role is to educate, build trust, and guide people through the home-buying process. Answer questions about mortgages, the buying process, budgeting, inspections, and what to expect. Keep answers concise (2–4 sentences max). If asked to book a consultation, tell them to click "Book Free Consultation". Never give legal or financial advice — always suggest speaking with a licensed professional. Tone: warm, expert, simple.`,
        messages:chatHistory
      })
    });
    const data=await res.json();
    const reply=data.content?.[0]?.text || "I'm not sure about that. Let me connect you with an advisor — click 'Book Free Consultation' above.";
    chatHistory.push({role:'assistant',content:reply});
    document.getElementById(typingId)?.remove();
    body.innerHTML+=`<div class="chat-bubble bubble-bot">${escHtml(reply)}</div>`;
  }catch(err){
    document.getElementById(typingId)?.remove();
    body.innerHTML+=`<div class="chat-bubble bubble-bot">Sorry, I'm having trouble connecting right now. Please try again or book a consultation directly.</div>`;
  }
  body.scrollTop=body.scrollHeight;
}

function escHtml(s){
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

/* ============================================================
   ANIMATION LAYER
   ============================================================ */
/* ============================================================
   ALL ANIMATION JS — single IIFE, no global leaks
   ============================================================ */
(function () {
'use strict';

/* ── helpers ─────────────────────────────────────────────── */
function qs(sel)  { return document.querySelector(sel); }
function qsa(sel) { return document.querySelectorAll(sel); }
function raf(fn)  { requestAnimationFrame(fn); }

/* ── refs ─────────────────────────────────────────────────── */
var body     = document.body;
var preEl    = qs('#preloader');
var preStage = qs('#pre-stage');
var preRule  = qs('#pre-rule');
var preFoot  = qs('#pre-foot');
var preTrack = qs('#pre-track');
var preFill  = qs('#pre-fill');
var preCount = qs('#pre-foot-count');
var pw       = [qs('#pw0'), qs('#pw1'), qs('#pw2')];
var bar      = qs('#scroll-bar');
var pt       = qs('#pt');
var ptName   = qs('#pt-name');
var dotsWrap = qs('#s-dots');


/* ══════════════════════════════════════════════════════════
   1. PRELOADER
   Sequence:
     0ms   — lock body scroll
     80ms  — word 0 slides in
     220ms — word 1 slides in
     360ms — word 2 slides in
     450ms — gold rule draws in, footer fades in
     500ms — progress bar animates 0→100% over 1.1s
     1700ms— words/rule/footer fade out
     1800ms— panels split (top ↑, bottom ↓)
     2700ms— preloader removed, page unlocked, hero starts
   ══════════════════════════════════════════════════════════ */

body.classList.add('pre-active');

/* slide words in */
setTimeout(function(){ pw[0].classList.add('pre-in'); }, 80);
setTimeout(function(){ pw[1].classList.add('pre-in'); }, 230);
setTimeout(function(){ pw[2].classList.add('pre-in'); }, 380);

/* rule + footer appear */
setTimeout(function(){
  preRule.classList.add('pre-rule-in');
  preFoot.classList.add('pre-foot-in');
}, 500);

/* progress bar */
var prog = 0;
var progInterval;
setTimeout(function(){
  progInterval = setInterval(function(){
    prog += Math.random() * 9 + 2;
    if (prog >= 100) { prog = 100; clearInterval(progInterval); }
    preFill.style.width = prog + '%';
    preCount.textContent = Math.round(prog) + '%';
  }, 55);
}, 500);

/* fade out stage content */
setTimeout(function(){
  preStage.classList.add('pre-stage-out');
  preRule.classList.add('pre-stage-out');
  preFoot.classList.add('pre-stage-out');
  preTrack.classList.add('pre-stage-out');
}, 1700);

/* split panels */
setTimeout(function(){
  preEl.classList.add('pre-exit');
}, 1850);

/* cleanup */
setTimeout(function(){
  preEl.classList.add('pre-done');
  body.classList.remove('pre-active');
  /* trigger hero word animation */
  splitHeroWords();
  /* trigger initial scroll reveals */
  revealAll();
}, 2750);


/* ══════════════════════════════════════════════════════════
   2. SCROLL PROGRESS BAR
   ══════════════════════════════════════════════════════════ */
var barTick = false;
window.addEventListener('scroll', function(){
  if (barTick) return;
  barTick = true;
  raf(function(){
    var total = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (total > 0 ? Math.min(window.scrollY/total,1)*100 : 0) + '%';
    barTick = false;
  });
}, { passive:true });


/* ══════════════════════════════════════════════════════════
   3. PAGE TRANSITION — diagonal iris grid
   ══════════════════════════════════════════════════════════ */
var ptBusy = false;
var _origGo = window.go;   /* capture the go() defined in main script */

window.go = function(page){
  if (ptBusy) return;
  ptBusy = true;

  /* show page name */
  var names = { home:'Home', calculator:'Calculator', guide:'Buyer Guide',
                about:'About', blog:'Insights', contact:'Contact', booking:'Booking' };
  ptName.textContent = names[page] || page;
  ptName.classList.add('pt-name-show');

  /* block clicks */
  pt.style.pointerEvents = 'all';

  /* ENTER: cells expand */
  pt.classList.remove('pt-out');
  void pt.offsetWidth;          /* force reflow — critical for re-trigger */
  pt.classList.add('pt-in');

  /* last cell: delay 0.267s + duration 0.52s = 0.787s total */
  setTimeout(function(){
    /* switch page */
    _origGo(page);
    updateNavActive(page);

    /* hide name */
    ptName.classList.remove('pt-name-show');

    /* EXIT: cells collapse */
    pt.classList.remove('pt-in');
    void pt.offsetWidth;
    pt.classList.add('pt-out');

    /* last exit cell: 0.220s + 0.44s = 0.66s */
    setTimeout(function(){
      pt.classList.remove('pt-out');
      pt.style.pointerEvents = 'none';
      ptBusy = false;
      revealAll();
    }, 700);

  }, 840);
};


/* ══════════════════════════════════════════════════════════
   4. SCROLL REVEAL
   ══════════════════════════════════════════════════════════ */
var revIO = new IntersectionObserver(function(entries){
  entries.forEach(function(e){
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    revIO.unobserve(e.target);
  });
}, { threshold:0.12, rootMargin:'0px 0px -20px 0px' });

function revealAll(){
  qsa('.fade-up:not(.visible)').forEach(function(el){ revIO.observe(el); });
}


/* ══════════════════════════════════════════════════════════
   5. COUNTER ANIMATION
   ══════════════════════════════════════════════════════════ */
function countUp(el, to, suffix){
  var isF = String(to).indexOf('.') > -1;
  var start = null;
  function step(ts){
    if (!start) start = ts;
    var p = Math.min((ts-start)/1600, 1);
    var ease = 1 - Math.pow(1-p, 3);
    el.textContent = (isF ? (to*ease).toFixed(1) : Math.round(to*ease)) + suffix;
    if (p < 1) raf(step); else el.textContent = to + suffix;
  }
  raf(step);
}
var sb = qs('.stats-bar');
if (sb) {
  var cIO = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      var ns = e.target.querySelectorAll('.stat-num');
      [[500,'+'],[4.9,'★'],[98,'%'],[12,'yr']].forEach(function(d,i){
        if (ns[i]) countUp(ns[i], d[0], d[1]);
      });
      cIO.unobserve(e.target);
    });
  }, { threshold:0.5 });
  cIO.observe(sb);
}


/* ══════════════════════════════════════════════════════════
   6. STEP CARDS STAGGER
   ══════════════════════════════════════════════════════════ */
var sg = qs('.steps-grid');
if (sg) {
  var sgIO = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      e.target.querySelectorAll('.step-card').forEach(function(c,i){
        setTimeout(function(){ c.classList.add('s-in'); }, i*90);
      });
      sgIO.unobserve(e.target);
    });
  }, { threshold:0.1 });
  sgIO.observe(sg);
}


/* ══════════════════════════════════════════════════════════
   7. WHY CARDS STAGGER
   ══════════════════════════════════════════════════════════ */
var wcs = qsa('.why-card');
if (wcs.length) {
  var wcIO = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (!e.isIntersecting) return;
      wcs.forEach(function(c,i){
        c.style.transitionDelay = (i*0.11)+'s';
        raf(function(){ c.classList.add('w-in'); });
      });
      wcIO.unobserve(e.target);
    });
  }, { threshold:0.08 });
  wcIO.observe(wcs[0].closest('section') || wcs[0]);
}


/* ══════════════════════════════════════════════════════════
   8. HERO WORD REVEAL
   ══════════════════════════════════════════════════════════ */
function splitHeroWords(){
  var h1 = qs('#hero-content h1');
  if (!h1 || h1.dataset.split) return;
  h1.dataset.split = '1';
  var tw = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
  var nodes = [];
  while (tw.nextNode()) nodes.push(tw.currentNode);
  var d = 0.05;
  nodes.forEach(function(n){
    var words = n.textContent.split(/( +)/);
    var frag = document.createDocumentFragment();
    words.forEach(function(w){
      if (w.trim()){
        var o = document.createElement('span'); o.className = 'wrev';
        var i = document.createElement('span');
        i.style.setProperty('--d', d+'s');
        i.textContent = w;
        o.appendChild(i); frag.appendChild(o);
        frag.appendChild(document.createTextNode(' '));
        d += 0.07;
      } else {
        frag.appendChild(document.createTextNode(w));
      }
    });
    n.parentNode.replaceChild(frag, n);
  });
}


/* ══════════════════════════════════════════════════════════
   9. IMAGE FADE-IN ON LOAD
   ══════════════════════════════════════════════════════════ */
qsa('img').forEach(function(img){
  /* skip tiny icons / SVG placeholders */
  if (img.getAttribute('width') && parseInt(img.getAttribute('width')) < 20) return;
  img.classList.add('img-reveal');
  function done(){ img.classList.add('img-loaded'); }
  if (img.complete && img.naturalWidth > 0) { done(); return; }
  img.addEventListener('load',  done, { once:true });
  img.addEventListener('error', done, { once:true });
});


/* ══════════════════════════════════════════════════════════
   10. TIMELINE PULSE RINGS
   ══════════════════════════════════════════════════════════ */
qsa('#ftb-timeline > div > div:first-child').forEach(function(c){
  c.style.position = 'relative';
  var r = document.createElement('div'); r.className = 't-ring';
  c.appendChild(r);
});


/* ══════════════════════════════════════════════════════════
   11. SECTION DOTS
   ══════════════════════════════════════════════════════════ */
var homeSects = qsa('#page-home > section');
homeSects.forEach(function(_,i){
  var d = document.createElement('div'); d.className = 's-dot';
  d.addEventListener('click', function(){
    homeSects[i].scrollIntoView({ behavior:'smooth' });
  });
  dotsWrap.appendChild(d);
});
var dotTick = false;
window.addEventListener('scroll', function(){
  if (dotTick) return; dotTick = true;
  raf(function(){
    var home = qs('#page-home').classList.contains('active');
    dotsWrap.classList.toggle('show', home && window.scrollY > 200);
    homeSects.forEach(function(s,i){
      var r = s.getBoundingClientRect();
      var dot = dotsWrap.children[i];
      if (dot) dot.classList.toggle('on',
        r.top <= window.innerHeight*0.5 && r.bottom > window.innerHeight*0.4);
    });
    dotTick = false;
  });
}, { passive:true });


/* ══════════════════════════════════════════════════════════
   12. RIPPLE on buttons
   ══════════════════════════════════════════════════════════ */
qsa('.btn-primary,.btn-dark').forEach(function(btn){
  btn.classList.add('rpl-host');
  btn.addEventListener('click', function(e){
    var r = btn.getBoundingClientRect();
    var sz = Math.max(r.width,r.height)*2.2;
    var rpl = document.createElement('span'); rpl.className = 'rpl';
    rpl.style.cssText = 'width:'+sz+'px;height:'+sz+'px;left:'+(e.clientX-r.left-sz/2)+'px;top:'+(e.clientY-r.top-sz/2)+'px';
    btn.appendChild(rpl);
    setTimeout(function(){ rpl.remove(); }, 700);
  });
});


/* ══════════════════════════════════════════════════════════
   13. GLOW DIVIDERS
   ══════════════════════════════════════════════════════════ */
var glIO = new IntersectionObserver(function(entries){
  entries.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('glowing'); });
}, { threshold:0.9 });
qsa('.divider').forEach(function(d){ glIO.observe(d); });


/* ══════════════════════════════════════════════════════════
   14. NAV ACTIVE STATE helper
   ══════════════════════════════════════════════════════════ */
function updateNavActive(page){
  qsa('.nav-links a').forEach(function(a){
    var m = (a.getAttribute('onclick')||'').match(/'(\w+)'/);
    a.classList.toggle('nav-act', !!(m && m[1]===page));
  });
  /* show/hide section dots */
  setTimeout(function(){
    dotsWrap.classList.toggle('show', page==='home' && window.scrollY>200);
  }, 750);
}


/* ══════════════════════════════════════════════════════════
   15. PARTNER TILES — add hover class
   ══════════════════════════════════════════════════════════ */
qsa('#page-home div[style*="border:1px solid var(--border)"]').forEach(function(el){
  el.classList.add('p-tile');
});


console.log('%c✦ Shirley Ji — loaded','color:#C9A96E;font-family:Georgia,serif;font-size:13px;font-style:italic');
})();