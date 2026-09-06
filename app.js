const intentMap = {
  shopping: [
    {label:'COMPARE', text:'Likely reason: compare this with other options before buying.'},
    {label:'REMEMBER', text:'Alternative: keep this visible while you decide.'}
  ],
  travel: [
    {label:'VISIT LATER', text:'Likely reason: a place you may want to visit.'},
    {label:'REFERENCE', text:'Alternative: keep it as travel reference.'}
  ],
  idea: [
    {label:'REFERENCE', text:'Likely reason: use this as reference for an idea.'},
    {label:'REMEMBER', text:'Alternative: return to it while the idea develops.'}
  ],
  meeting: [
    {label:'DO LATER', text:'Likely reason: needed for an upcoming task or meeting.'},
    {label:'REFERENCE', text:'Alternative: supporting context you may need soon.'}
  ],
  gift: [
    {label:'COMPARE', text:'Likely reason: compare this with other gift options.'},
    {label:'REMEMBER', text:'Alternative: keep it for a later purchase.'}
  ],
  later: [
    {label:'DO LATER', text:'Likely reason: revisit this later.'},
    {label:'REMEMBER', text:'Alternative: keep it visible for your future self.'}
  ],
  share: [
    {label:'SHARE', text:'Likely reason: send or show this to someone.'},
    {label:'REFERENCE', text:'Alternative: retain it as useful context.'}
  ]
};

const starterItems = [
  {type:'Screenshot',title:'Green desk lamp',context:'Comparing products before buying',intent:'COMPARE',note:'Saved while looking for a softer desk setup.'},
  {type:'Bookmark',title:'Article on memory and interfaces',context:'Collecting reference for an idea',intent:'REFERENCE',note:'Useful for thinking about context-aware archives.'},
  {type:'Saved place',title:'Lakeside garden café',context:'Planning a place or trip',intent:'VISIT LATER',note:'A quiet place to try with friends.'}
];

let selectedIntent = '';
let memoryItems = JSON.parse(localStorage.getItem('reason-memory') || 'null') || [...starterItems];

const $ = id => document.getElementById(id);
const suggestBtn=$('suggestBtn'),saveBtn=$('saveBtn'),itemType=$('itemType'),itemTitle=$('itemTitle'),itemContext=$('itemContext'),notes=$('notes'),suggestedText=$('suggestedText'),chipRow=$('chipRow'),savedList=$('savedList'),searchBox=$('searchBox');

function renderChips(options=[]){
  chipRow.innerHTML='';
  options.forEach((opt,i)=>{
    const b=document.createElement('button');
    b.type='button';
    b.className='chip'+(i===0?' active':'');
    b.textContent=opt.label;
    b.onclick=()=>{
      [...chipRow.querySelectorAll('.chip')].forEach(x=>x.classList.remove('active'));
      b.classList.add('active');
      selectedIntent=opt.label;
      suggestedText.textContent=opt.text;
    };
    chipRow.appendChild(b);
  });
  selectedIntent=options[0]?.label||'';
}
function suggestIntent(){
  const opts=intentMap[itemContext.value];
  if(!opts){
    selectedIntent='';chipRow.innerHTML='';
    suggestedText.textContent='Choose a context and REASON will suggest a lightweight intention.';
    return;
  }
  suggestedText.textContent=opts[0].text;renderChips(opts);
}
function esc(s=''){return s.replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
function renderList(query=''){
  const q=query.toLowerCase().trim();
  const items=memoryItems.filter(i=>[i.type,i.title,i.context,i.intent,i.note].join(' ').toLowerCase().includes(q));
  if(!items.length){savedList.innerHTML='<div class="empty">Nothing here matches that memory yet.</div>';return}
  savedList.innerHTML=items.map(i=>`
    <article class="memory-item">
      <div class="memory-type">${esc(i.type)}</div>
      <div><h3>${esc(i.title)}</h3><p>${esc(i.context)}</p>${i.note?`<p style="margin-top:8px;font-style:italic">${esc(i.note)}</p>`:''}</div>
      <div class="reason-tag">${esc(i.intent)}</div>
    </article>`).join('');
}
suggestBtn.onclick=suggestIntent;
saveBtn.onclick=()=>{
  if(!itemTitle.value.trim()){alert('Add a title first.');return}
  if(!selectedIntent)suggestIntent();
  if(!selectedIntent){alert('Choose context so REASON can suggest a reason.');return}
  const contextLabel=itemContext.options[itemContext.selectedIndex]?.text||'No context';
  memoryItems.unshift({type:itemType.value,title:itemTitle.value.trim(),context:contextLabel,intent:selectedIntent,note:notes.value.trim()});
  localStorage.setItem('reason-memory',JSON.stringify(memoryItems));
  itemTitle.value='';itemContext.value='';notes.value='';selectedIntent='';chipRow.innerHTML='';
  suggestedText.textContent='Saved with reason. Try searching the archive by intention.';
  renderList(searchBox.value);
};
searchBox.oninput=e=>renderList(e.target.value);
renderList();
