// Mobile nav toggle
const navToggleButton = document.querySelector('.nav-toggle');
const navBar = document.querySelector('.navbar');
if (navToggleButton && navBar) {
  navToggleButton.addEventListener('click', () => {
    navBar.classList.toggle('open');
  });
}

// Typed headline
const typedTarget = document.querySelector('.pro-text');
if (typedTarget && window.Typed) {
  new Typed('.pro-text', {
    strings: [
      'Binary Exploitation',
      'Reverse Engineering',
      'DFIR & Forensics',
      'Linux & Systems',
      'Cybersecurity Learning'
    ],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1100,
    loop: true
  });
}

// Year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Blog loader
async function loadBlog() {
  const container = document.getElementById('blog-list');
  if (!container) return;
  try {
    const res = await fetch('blog.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed');
    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) {
      container.innerHTML = '<div class="post-card">Coming soon.</div>';
    } else {
      renderPosts(posts, container);
    }
  } catch (err) {
    container.innerHTML = '<div class="post-card">Coming soon.</div>';
  }
}

function renderPosts(posts, container) {
  if (!Array.isArray(posts) || posts.length === 0) {
    container.innerHTML = '<p style="color:#93a3b4">No posts yet.</p>';
    return;
  }
  const frag = document.createDocumentFragment();
  posts
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((post) => {
      const card = document.createElement('article');
      card.className = 'post-card';
      const title = document.createElement('a');
      title.href = post.url || '#';
      title.target = post.url ? '_blank' : '_self';
      title.rel = post.url ? 'noopener' : '';
      title.textContent = post.title || 'Untitled';
      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.textContent = formatDate(post.date) + (post.readTime ? ` · ${post.readTime} min` : '');
      const desc = document.createElement('p');
      desc.textContent = post.summary || '';
      const tags = document.createElement('div');
      tags.className = 'tags';
      (post.tags || []).forEach((t) => {
        const chip = document.createElement('span');
        chip.className = 'tag';
        chip.textContent = t;
        tags.appendChild(chip);
      });
      card.appendChild(title);
      card.appendChild(meta);
      if (post.summary) card.appendChild(desc);
      if ((post.tags || []).length) card.appendChild(tags);
      frag.appendChild(card);
    });
  container.innerHTML = '';
  container.appendChild(frag);
}

function formatDate(input) {
  if (!input) return '';
  try {
    const d = new Date(input);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' });
  } catch (_) {
    return String(input);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadBlog();
  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Animate section headings on reveal
  document.querySelectorAll('.section h2').forEach((h) => {
    h.classList.add('animate-fade-up');
  });

  // Animate paragraphs and project cards
  document.querySelectorAll('.section p, .project-card, .skills-list li').forEach((el, idx) => {
    el.classList.add('animate-fade-up');
    el.style.animationDelay = `${0.05 * (idx % 10)}s`;
  });

  // Inject project cards
  const projects = [
    { title: 'Job Site Platform', url: 'https://github.com/12bijaya/JobSite', desc: 'Full-stack job platform (Node, MySQL, React).', tags: ['Node.js','React','MySQL'] },
    { title: 'Automation: File Permission & User Management', url: 'https://github.com/12bijaya/Automation_on_file-_permission_user_management', desc: 'Bash scripts to automate file perms and user mgmt.', tags: ['Bash','Linux'] },
    { title: 'Python Reverse Shell', url: 'https://github.com/12bijaya/python-project-reverse-shell', desc: 'Educational reverse shell for security learning.', tags: ['Python','Security'] },
    { title: 'Cryptographic Tool (C)', url: 'https://github.com/12bijaya/C-project--crpotographic-tool', desc: 'C-based crypto utilities.', tags: ['C','Crypto'] },
    { title: 'Install Packages Script', url: 'https://github.com/12bijaya/install_packages_script', desc: 'Bash script to install common packages quickly.', tags: ['Bash','DevOps'] }
  ];
  const grid = document.getElementById('projects-grid');
  if (grid) {
    const frag = document.createDocumentFragment();
    projects.forEach((p) => {
      const card = document.createElement('article');
      card.className = 'project-card';
      const h3 = document.createElement('h3');
      const a = document.createElement('a');
      a.href = p.url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = p.title;
      h3.appendChild(a);
      const d = document.createElement('p'); d.textContent = p.desc;
      const tags = document.createElement('div'); tags.className = 'tags';
      (p.tags||[]).forEach((t)=>{ const chip = document.createElement('span'); chip.className='tag'; chip.textContent=t; tags.appendChild(chip); });
      card.appendChild(h3); card.appendChild(d); card.appendChild(tags);
      frag.appendChild(card);
    });
    grid.appendChild(frag);
  }

  // Smooth scroll for navbar links (stable layout)
  document.querySelectorAll('.navbar a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      const target = href ? document.querySelector(href) : null;
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (navBar && navBar.classList.contains('open')) navBar.classList.remove('open');
    });
  });
});


