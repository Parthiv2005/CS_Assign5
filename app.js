const storageKey = 'stored-xss-demo-comments';
const form = document.querySelector('#comment-form');
const field = document.querySelector('#comment');
const list = document.querySelector('#comments');
const status = document.querySelector('#status');
const sampleComment = '<strong>Stored comment</strong>';
const simulation = new URLSearchParams(location.search).get('view') === 'simulation';
if (simulation) document.querySelector('#view-title').textContent = 'Markup simulation';
document.querySelector(simulation ? '#simulation-link' : '#protected-link')
  .setAttribute('aria-current', 'page');

function renderComment(comment) {
  const item = document.createElement('li');
  if (simulation && comment === sampleComment) {
    // Model the visual result for this fixed sample using trusted DOM nodes.
    const bold = document.createElement('strong');
    bold.textContent = 'Stored comment';
    item.append(bold);
  } else {
    item.textContent = comment;
  }
  list.append(item);
}

const comments = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
comments.forEach(renderComment);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const comment = field.value.trim();
  if (!comment) return;

  localStorage.setItem(storageKey, JSON.stringify([...comments, comment]));
  comments.push(comment);
  renderComment(comment);
  form.reset();
  status.textContent = 'Comment saved.';
});
