const storageKey = 'stored-xss-demo-comments';
const form = document.querySelector('#comment-form');
const field = document.querySelector('#comment');
const list = document.querySelector('#comments');
const status = document.querySelector('#status');
const clearBtn = document.querySelector('#clear-btn');

// Toggle between Vulnerable (?view=vulnerable) and Protected (default)
const isVulnerable = new URLSearchParams(location.search).get('view') === 'vulnerable';

document.querySelector('#view-title').textContent = isVulnerable
  ? 'Vulnerable view (innerHTML — Exploitable)'
  : 'Protected view (textContent — Mitigated)';

document
  .querySelector(isVulnerable ? '#vulnerable-link' : '#protected-link')
  .setAttribute('aria-current', 'page');

function renderComment(comment) {
  const item = document.createElement('li');

  if (isVulnerable) {
    //  Vulnerable implementation — unsanitized DOM sink executes stored HTML/JS
    item.innerHTML = comment;
  } else {
    //Mitigation implemented — safe DOM sink renders input strictly as text
    item.textContent = comment;
  }

  list.append(item);
}

function loadComments() {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

const comments = loadComments();
comments.forEach(renderComment);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const comment = field.value.trim();
  if (!comment) return;

  comments.push(comment);
  localStorage.setItem(storageKey, JSON.stringify(comments));
  renderComment(comment);
  form.reset();
  status.textContent = 'Comment saved.';
});

clearBtn.addEventListener('click', () => {
  localStorage.removeItem(storageKey);
  comments.length = 0;
  list.innerHTML = '';
  status.textContent = 'Stored comments cleared.';
});
