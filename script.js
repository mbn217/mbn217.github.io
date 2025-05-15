document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle logic
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            let mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', mode);
            // Update icon
            toggle.innerHTML = mode === 'light'
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        });
        // Apply saved theme on load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-mode');
            toggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Load blog posts from JSON (if on blog.html)
    const postsContainer = document.getElementById('blog-posts');
    if (postsContainer) {
        fetch('posts.json')
            .then(response => response.json())
            .then(posts => {
                posts.forEach(post => {
                    // Convert Markdown-like content to HTML (handle code formatting)
                    let contentHtml = post.content
                        .replace(/```([\s\S]*?)```/g, (match, p1) => {
                            return '<pre><code>' + p1.trim() + '</code></pre>';
                        })
                        .replace(/`([^`]+)`/g, (match, p1) => {
                            return '<code>' + p1 + '</code>';
                        });
                    // Create post element
                    const postEl = document.createElement('article');
                    postEl.classList.add('post');
                    postEl.innerHTML = `
                        <h3>${post.title}</h3>
                        <p class="date">${post.date}</p>
                        <div class="post-content">${contentHtml}</div>
                    `;
                    postsContainer.appendChild(postEl);
                });
            })
            .catch(err => console.error('Error loading posts.json', err));
    }
});
function toggleTheme() {
  const body = document.body;
  const icon = document.querySelector('.theme-toggle i');

  body.classList.toggle('dark-theme');

  // Toggle icon between moon and sun
  if (body.classList.contains('dark-theme')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }

  // Optional: save preference
  localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    const icon = document.querySelector('.theme-toggle i');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
});
