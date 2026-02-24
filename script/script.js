// Initial job data (no lorem ipsum) - at least 8 entries
const jobs = [
    { id: 1, company: 'BrightWave Solutions', position: 'Frontend Engineer', location: 'Remote (US)', type: 'Full-time', salary: '$85,000', description: 'Build user-facing features and UI components.', status: 'All' },
    { id: 2, company: 'Greenfield Labs', position: 'Junior Backend Developer', location: 'Austin, TX', type: 'Full-time', salary: '$72,000', description: 'Work on API endpoints and data modeling.', status: 'All' },
    { id: 3, company: 'Summit Analytics', position: 'Data Analyst', location: 'New York, NY', type: 'Contract', salary: '$60/hr', description: 'Analyze user metrics to improve engagement.', status: 'All' },
    { id: 4, company: 'PixelForge', position: 'UI/UX Designer', location: 'San Diego, CA', type: 'Part-time', salary: '$40/hr', description: 'Design product flows and prototypes.', status: 'All' },
    { id: 5, company: 'CloudStride', position: 'DevOps Engineer', location: 'Remote (EU)', type: 'Full-time', salary: '€70,000', description: 'Automate deployments and monitor systems.', status: 'All' },
    { id: 6, company: 'Neptune Media', position: 'Digital Marketing Specialist', location: 'Chicago, IL', type: 'Full-time', salary: '$58,000', description: 'Run campaigns and measure ROI.', status: 'All' },
    { id: 7, company: 'Oak & Air', position: 'Product Manager', location: 'Seattle, WA', type: 'Full-time', salary: '$95,000', description: 'Own roadmap and coordinate teams.', status: 'All' },
    { id: 8, company: 'Helix Robotics', position: 'Embedded Systems Engineer', location: 'Palo Alto, CA', type: 'Full-time', salary: '$120,000', description: 'Implement firmware features for robotics.', status: 'All' }
];

let state = {
    jobs: jobs.slice(),
    activeTab: 'All'
};

// DOM refs
const jobsContainer = document.getElementById('jobs-container');
const totalCountEl = document.getElementById('total-count');
const interviewCountEl = document.getElementById('interview-count');
const rejectedCountEl = document.getElementById('rejected-count');
const rightCountEl = document.getElementById('right-count');
const tabs = document.querySelectorAll('.tab');
const emptyTemplate = document.getElementById('empty-template').content;

function updateCounts(){
  const total = state.jobs.length;
  const interview = state.jobs.filter(j=>j.status==='Interview').length;
  const rejected = state.jobs.filter(j=>j.status==='Rejected').length;
  totalCountEl.textContent = total;
  interviewCountEl.textContent = interview;
  rejectedCountEl.textContent = rejected;

  // right-side count for active tab
  if(state.activeTab==='All') rightCountEl.textContent = total;
  else if(state.activeTab==='Interview') rightCountEl.textContent = interview;
  else if(state.activeTab==='Rejected') rightCountEl.textContent = rejected;
}

function setActiveTab(name){
  state.activeTab = name;
  tabs.forEach(t=> t.classList.toggle('tab-active', t.dataset.tab===name));
  renderJobs();
  updateCounts();
}

function renderJobs(){
  jobsContainer.innerHTML = '';
  let list = state.jobs;
  if(state.activeTab==='Interview') list = list.filter(j=>j.status==='Interview');
  if(state.activeTab==='Rejected') list = list.filter(j=>j.status==='Rejected');

  if(list.length===0){
    const clone = document.importNode(emptyTemplate, true);
    jobsContainer.appendChild(clone);
    return;
  }

  list.forEach(job=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <button class="delete-btn" aria-label="Delete"> <i class="fa fa-trash" aria-hidden="true"></i> </button>
      <h3 class="font-bold">${job.position} — ${job.company}</h3>
      <div class="meta">${job.location} • ${job.type} • ${job.salary} <span class="status-badge"></span></div>
      <div class="description">${job.description}</div>
      <div class="actions">
        <button class="btn interview">Interview</button>
        <button class="btn rejected">Rejected</button>
      </div>
    `;

    // set initial styles for badge; use DaisyUI badge classes and Tailwind ring utilities for selection
    const badge = card.querySelector('.status-badge');
    function refreshStatusDisplay(){
      if(job.status==='Interview'){
        interviewBtn.classList.add('ring-2','ring-blue-300','ring-opacity-50');
        rejectedBtn.classList.remove('ring-2','ring-blue-300','ring-opacity-50');
        badge.className = 'status-badge badge badge-primary ml-2';
        badge.textContent = 'Interview';
      } else if(job.status==='Rejected'){
        rejectedBtn.classList.add('ring-2','ring-red-300','ring-opacity-50');
        interviewBtn.classList.remove('ring-2','ring-blue-300','ring-opacity-50');
        badge.className = 'status-badge badge badge-error ml-2';
        badge.textContent = 'Rejected';
      } else {
        interviewBtn.classList.remove('ring-2','ring-blue-300','ring-opacity-50');
        rejectedBtn.classList.remove('ring-2','ring-red-300','ring-opacity-50');
        badge.className = 'status-badge';
        badge.textContent = '';
      }
    }

    // event listeners
    const interviewBtn = card.querySelector('.btn.interview');
    const rejectedBtn = card.querySelector('.btn.rejected');
    const deleteBtn = card.querySelector('.delete-btn');

    interviewBtn.addEventListener('click',()=>{
      // Toggle: set status to Interview (even if previously Rejected)
      job.status = 'Interview';
      refreshStatusDisplay();
      updateCounts();
    });

    rejectedBtn.addEventListener('click',()=>{
      job.status = 'Rejected';
      refreshStatusDisplay();
      updateCounts();
    });

    deleteBtn.addEventListener('click',()=>{
      // remove job
      const idx = state.jobs.findIndex(j=>j.id===job.id);
      if(idx>-1) state.jobs.splice(idx,1);
      renderJobs();
      updateCounts();
    });

    // initialize display after listeners are ready
    refreshStatusDisplay();

    jobsContainer.appendChild(card);
  });
}

// initialize
updateCounts();
renderJobs();

// tab switching
tabs.forEach(tab=>{
  tab.addEventListener('click', ()=> setActiveTab(tab.dataset.tab));
});

// Accessibility: keyboard support for delete via event delegation
jobsContainer.addEventListener('keydown', (e)=>{
  if(e.key==='Delete' && document.activeElement.closest('.card')){
    const card = document.activeElement.closest('.card');
    const title = card.querySelector('h3').textContent;
    // find by title match (simple)
    const idx = state.jobs.findIndex(j=>(`${j.position} — ${j.company}`)===title);
    if(idx>-1){ state.jobs.splice(idx,1); renderJobs(); updateCounts(); }
  }
});

