const API_URL = 'http://localhost:3000/api';

// Fetch and display content
async function fetchContent() {
  const profile = await fetch(`${API_URL}/profile`).then(res => res.json());
  const projects = await fetch(`${API_URL}/projects`).then(res => res.json());
  const blogPosts = await fetch(`${API_URL}/blog-posts`).then(res => res.json());
  const contact = await fetch(`${API_URL}/contact`).then(res => res.json());

  const editor = document.getElementById('editor');
  editor.innerHTML = `
    <div class="editor-section">
      <h2>Profile</h2>
      <input id="profile-name" value="${profile.name}" placeholder="Name">
      <textarea id="profile-bio">${profile.bio}</textarea>
      <input id="profile-image" value="${profile.image}" placeholder="Image URL">
      <button onclick="updateProfile()">Update Profile</button>
    </div>
    <div class="editor-section">
      <h2>Projects</h2>
      ${projects.map(project => `
        <div>
          <input value="${project.title}" placeholder="Title">
          <textarea>${project.description}</textarea>
          <input value="${project.image}" placeholder="Image URL">
          <button onclick="updateProject('${project.id}')">Update</button>
          <button onclick="deleteProject('${project.id}')">Delete</button>
        </div>
      `).join('')}
      <button onclick="addProject()">Add Project</button>
    </div>
    <div class="editor-section">
      <h2>Blog Posts</h2>
      ${blogPosts.map(post => `
        <div>
          <input value="${post.title}" placeholder="Title">
          <textarea>${post.content}</textarea>
          <input value="${post.image}" placeholder="Image URL">
          <button onclick="updateBlogPost('${post.id}')">Update</button>
          <button onclick="deleteBlogPost('${post.id}')">Delete</button>
        </div>
      `).join('')}
      <button onclick="addBlogPost()">Add Blog Post</button>
    </div>
    <div class="editor-section">
      <h2>Contact</h2>
      <input id="contact-email" value="${contact.email}" placeholder="Email">
      <button onclick="updateContact()">Update Contact</button>
    </div>
  `;
}

// Update profile
async function updateProfile() {
  const name = document.getElementById('profile-name').value;
  const bio = document.getElementById('profile-bio').value;
  const image = document.getElementById('profile-image').value;

  await fetch(`${API_URL}/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, bio, image }),
  });
  fetchContent();
}

// Add/update/delete projects and blog posts
async function addProject() {
  await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: Date.now(), title: '', description: '', image: '' }),
  });
  fetchContent();
}

async function updateProject(id) {
  const title = document.querySelector(`input[value="${id}"]`).value;
  const description = document.querySelector(`textarea[value="${id}"]`).value;
  const image = document.querySelector(`input[value="${id}"]`).value;

  await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, image }),
  });
  fetchContent();
}

async function deleteProject(id) {
  await fetch(`${API_URL}/projects/${id}`, { method: 'DELETE' });
  fetchContent();
}

async function addBlogPost() {
  await fetch(`${API_URL}/blog-posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: Date.now(), title: '', content: '', image: '' }),
  });
  fetchContent();
}

async function updateBlogPost(id) {
  const title = document.querySelector(`input[value="${id}"]`).value;
  const content = document.querySelector(`textarea[value="${id}"]`).value;
  const image = document.querySelector(`input[value="${id}"]`).value;

  await fetch(`${API_URL}/blog-posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, image }),
  });
  fetchContent();
}

async function deleteBlogPost(id) {
  await fetch(`${API_URL}/blog-posts/${id}`, { method: 'DELETE' });
  fetchContent();
}

// Update contact
async function updateContact() {
  const email = document.getElementById('contact-email').value;

  await fetch(`${API_URL}/contact`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  fetchContent();
}

fetchContent();
