// How You? — deterministic “destiny” engine
function hash(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}
function pick(arr, seed) { return arr[seed % arr.length]; }
function hashPair(name, salt) { return hash(name.toLowerCase().replace(/\s+/g,'') + '|' + salt); }

const CAREERS = [
  'Software Engineer','Product Manager','Doctor','Artist','Lawyer','Chef','Pilot','Teacher','Architect','Musician',
  'Entrepreneur','Scientist','Data Scientist','Writer','Designer','Athlete','Engineer','Founder','Filmmaker','Chef',
  'Psychologist','Economist','Filmmaker','Photographer','Engineer','Environmentalist'
];
const AURAS = ['Visionary','Builder','Explorer','Harmonizer','Maverick','Guardian','Spark','Sage'];
const TITLES = ['Head of Innovation','Principal Engineer','Creative Director','Chief Frog Officer','Staff Architect','Studio Lead','Research Director','Founding Partner'];
const ITEMS = ['MacBook Pro','Fountain Pen','Coffee Grinder','Leather Journal','Headphones','Plant','Sticker Pack','Keyboard'];
const BALANCE = ['Excellent','Great','Good','Need therapy','Balanced','Perfect'];
const VIBES = ['Chaos','Main character','Zen','Deadline energy','Cozy','Boss fight','Side quest'];
const FORTUNES = [
  'The frog chooses its path. Your career will find you — but only after several questionable job changes.',
  'You will be promoted by someone who doesn’t understand your title, to a level above your pay grade.',
  'Your best work will happen at 3 AM on a Tuesday, fuelled by instant noodles and spite.',
  'A random LinkedIn DM will change your life. No, it won’t be a recruiter selling a course.',
  'You will disagree strongly with everyone in one particular meeting. They will be right, mostly.',
  'Your CV will one day forbid the phrase “hard working”. You will not notice when it happens.',
  'The algorithm will recommend exactly one podcast that turns out to be your life story.',
  'Someone will ask you to mentor them. It will be the highlight of your Monday.',
  'You are 3 years away from being accidentally legendary in a very small group of people.',
  'Do not trust a job offer that includes the phrase “fast-paced environment”. Run.'
];

const els = {
  form:document.getElementById('form'),
  name:document.getElementById('name'),
  age:document.getElementById('age'),
  result:document.getElementById('result'),
  again:document.getElementById('againBtn'),
  copy:document.getElementById('copyBtn'),
  reveal:document.getElementById('revealBtn'),
  job:document.getElementById('job'), aura:document.getElementById('aura'),
  futureTitle:document.getElementById('futureTitle'), item:document.getElementById('item'),
  balance:document.getElementById('balance'), vibe:document.getElementById('vibe'),
  fortune:document.getElementById('fortune')
};

els.form.addEventListener('submit', e => {
  e.preventDefault();
  const name = els.name.value.trim(); const age = parseInt(els.age.value, 10);
  if (!name || !age) return;
  const base = hash(name.toLowerCase().replace(/[^a-z]+/g,'') + '|' + age);
  els.job.textContent = pick(CAREERS, base);
  els.aura.textContent = pick(AURAS, base >> 3);
  els.futureTitle.textContent = pick(TITLES, base >> 5);
  els.item.textContent = pick(ITEMS, base >> 7);
  els.balance.textContent = pick(BALANCE, base >> 9);
  els.vibe.textContent = pick(VIBES, base >> 11);
  els.fortune.textContent = pick(FORTUNES, base >> 15);
  els.result.classList.remove('hidden');
  els.reveal.textContent = 'Reveal again →';
});
els.again.addEventListener('click', () => { els.result.classList.add('hidden'); els.name.value=''; els.age.value=''; els.reveal.textContent='Reveal my destiny →'; els.name.focus(); });
els.copy.addEventListener('click', async () => {
  const t = `How You? — ${els.job.textContent} · ${els.aura.textContent} · ${els.futureTitle.textContent}`;
  try { await navigator.clipboard.writeText(t); els.copy.textContent='Copied!'; setTimeout(()=>els.copy.textContent='Copy result', 1200); } catch {}
});
