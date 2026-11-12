# Stored XSS

A comment board with two views of the same stored comments. The markup simulation models the appearance of one fixed HTML sample. The protected view renders every comment as plain text.

## Project structure

- `comment-board/index.html` — comment form and view controls.
- `comment-board/app.js` — browser storage and comment rendering.

## Run locally

Run `python -m http.server 8000 --bind 127.0.0.1` from the repository root and open [the local demo](http://127.0.0.1:8000).

## How To

1. Open **Markup simulation**, enter `<strong>Stored comment</strong>`, and click **Save comment**. Reload to show that the bold sample persists.
2. Open **Protected view**. The same stored comment appears with the tags visible. Capture the screenshot here.
3. Show `renderComment` in `comment-board/app.js`. The simulation builds a predefined bold element for the exact sample. The protected view assigns the saved value to `textContent`, so the browser renders it literally.

**Root cause.** Stored XSS occurs when an application persists untrusted content and later renders it in a context where the browser can interpret it as executable code. In a shared application, a later visitor can trigger it simply by viewing the stored content.

**Other mitigations.** Context-aware output encoding escapes characters according to where the value appears. Framework auto-escaping applies this protection in supported template contexts. If comments need rich HTML, use an allow-list sanitizer. A restrictive Content Security Policy limits script execution as a second layer. HttpOnly protects cookie values from direct script access while injected code may still act within the page.

