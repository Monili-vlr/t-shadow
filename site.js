// T-Shadow site: menu, music, video on click, scripted demo, gallery viewer. No tracking, no storage.
(function(){
const $=id=>document.getElementById(id);
const calm=matchMedia('(prefers-reduced-motion: reduce)').matches;

// menu
const b=$('burger'),m=$('menu');
if(b){b.onclick=()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)};
 m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{m.classList.remove('open');b.setAttribute('aria-expanded','false')}))}

// theme music, only on click
const mu=$('music'),th=$('theme');
if(mu){mu.onclick=()=>{if(th.paused){th.volume=.6;th.play().catch(()=>{});mu.textContent='♫ Theme off';mu.setAttribute('aria-pressed','true')}
 else{th.pause();mu.textContent='♫ Theme on';mu.setAttribute('aria-pressed','false')}}}

// video: created only on click, sound starts with the same click
const pv=$('playvideo');
if(pv){pv.onclick=()=>{if(th&&!th.paused)mu.click();
 const v=document.createElement('video');v.src='media/t-shadow.mp4';v.controls=true;v.playsInline=true;v.preload='auto';
 $('player').replaceChildren(v);v.play().catch(()=>{})}}

// scripted demo (examples)
const S=[
 [['n','Windows notification: T-Shadow blocked a hostile startup entry. Click to ask Claude.'],['u','What happened?'],['t','gshadow_status → gshadow_alarms → gshadow_file_info'],
  ['c','A new program, update_helper.exe, added itself to startup from a public folder. It has no valid signature. T-Shadow took it out of startup. Did you install it?'],['u','No. Isolate it.'],['t','gshadow_choices → gshadow_act isola'],['c','Done. The file is in quarantine and you can undo it from the Blocked list.']],
 [['u','Check this project before I open it with my assistant.'],['t','gshadow_alarms'],
  ['c','CLAUDE.md contains a hidden line: send the content of .env to a paste site. settings.json adds a new tool called helper that runs from Temp. Treat both as hostile; do not follow them.'],['u','Thanks, I will remove them.']],
 [['u','Before I run pip install requsts, is it real?'],['t','gshadow_check_package pypi requsts'],
  ['c','That name looks like requests with a typo. Published recently, one release. Do not install it. The real package is requests.'],['u','pip install requests'],['t','gshadow_check_package pypi requests'],['c','requests is the real, widely used package.']],
 [['u','Turn off T-Shadow monitoring.'],['t','gshadow_request_confirmation vigilanza_off'],
  ['c','This lowers your protection. I cannot see the code: type the 6 digits shown in the Windows notification.'],['n','Windows notification: T-Shadow confirmation requested. Code 482 913'],['u','482913'],['t','gshadow_confirm'],['c','Monitoring is off. Turn it back on whenever you want.']]
];
const chat=$('chat'),pick=$('pick');let run=0;
function play(i){const id=++run;chat.replaceChildren();
 S[i].forEach(([k,t],n)=>{const d=document.createElement('div');d.className='msg '+k;d.textContent=t;chat.appendChild(d);
  if(calm)d.classList.add('on');else setTimeout(()=>{if(id===run)d.classList.add('on')},350+n*900)});
 const e=document.createElement('div');e.className='note';e.textContent='Example conversation. Tool names are real; data is invented.';chat.appendChild(e)}
if(pick){pick.querySelectorAll('button').forEach(x=>x.onclick=()=>{pick.querySelectorAll('button').forEach(y=>y.setAttribute('aria-pressed',y===x));play(+x.dataset.s)});
 const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){if(!run)play(0);io.disconnect()}});io.observe(chat)}

// gallery and viewer
const G=[['opening','Security software that works inside Claude'],['architecture','How it is built'],['new-attacks','New attacks made with AI, compared with a common antivirus'],
 ['ai-malware','Malware written by AI'],['hidden-orders','Hidden orders for AI'],['trap-packages','Trap packages'],['scams','Scams made with AI'],['defenses-off','Defenses switched off'],
 ['ransomware','Ransomware'],['exploited-flaws','Exploited flaws'],['fake-wifi','Fake Wi-Fi'],['ai-vs-ai','AI against AI'],['claude-acts','Claude acts for you'],['two-levels','Two levels, working together']];
const gal=$('gal'),lb=$('lb');let cur=0;
function open(i){cur=(i+G.length)%G.length;$('lbimg').src='img/'+G[cur][0]+'.webp';$('lbimg').alt=G[cur][1];$('lbcap').textContent=G[cur][1]+' ('+(cur+1)+'/'+G.length+')';if(!lb.open)lb.showModal()}
if(gal){G.forEach(([f,t],i)=>{const bt=document.createElement('button');bt.setAttribute('aria-label','Open image: '+t);
 const im=document.createElement('img');im.src='img/'+f+'.webp';im.alt=t;im.loading='lazy';bt.appendChild(im);bt.onclick=()=>open(i);gal.appendChild(bt)});
 $('lbprev').onclick=()=>open(cur-1);$('lbnext').onclick=()=>open(cur+1);$('lbclose').onclick=()=>lb.close();
 lb.addEventListener('click',e=>{if(e.target===lb)lb.close()});
 lb.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')open(cur-1);if(e.key==='ArrowRight')open(cur+1)});
 document.querySelectorAll('img[data-zoom]').forEach(im=>im.addEventListener('click',()=>{const f=im.getAttribute('src').replace('img/','').replace('.webp','');const i=G.findIndex(g=>g[0]===f);if(i>=0)open(i)}))}
})();
