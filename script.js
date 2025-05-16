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

// Theme toggle functionality
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('.theme-toggle i');
  const themeText = document.querySelector('.theme-toggle span');
  
  body.classList.toggle('dark-theme');
  
  // Update the icon and text with a smooth transition
  if (body.classList.contains('dark-theme')) {
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
      themeText.textContent = 'Light';
    }, 200);
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.style.transform = 'rotate(0deg)';
    setTimeout(() => {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
      themeText.textContent = 'Theme';
    }, 200);
    localStorage.setItem('theme', 'light');
  }
}

// Check for saved theme preference
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = document.querySelector('.theme-toggle i');
  const themeText = document.querySelector('.theme-toggle span');
  
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    themeText.textContent = 'Light';
  }
  
  // Add transition to theme icon
  themeIcon.style.transition = 'transform 0.3s ease';
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add hover effect to cards
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });
  
  // Add hover effect to social links
  document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateY(-2px)';
    });
    
    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateY(0)';
    });
  });
});
