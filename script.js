// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  themeToggle.textContent = document.documentElement.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Initialize Clipboard.js
new ClipboardJS('#copyBtn');

// Sync Textarea with Prism Highlighting
const editableCode = document.getElementById('editableCode');
const codeEditor = document.getElementById('codeEditor');

// Set initial value
editableCode.value = codeEditor.textContent;

// Update Prism highlighting when typing
editableCode.addEventListener('input', (e) => {
  codeEditor.textContent = e.target.value;
  Prism.highlightElement(codeEditor);
});

// Line Numbers (Optional)
// Prism hooks can auto-add line numbers (see Prism.js plugins)