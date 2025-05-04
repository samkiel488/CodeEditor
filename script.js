// Default code snippets
const codeSnippets = {
  html: `<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
  <style id="css"></style>
</head>
<body>
  <h1>Hello World!</h1>
  <script id="js"></script>
</body>
</html>`,
  css: `h1 {
  color: blue;
  font-family: Arial;
}`,
  javascript: `console.log("Hello from JS!");
document.querySelector('h1').addEventListener('click', () => {
  alert('Clicked!');
});`
};

// Initialize editor
document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('languageSelect');
  const languageLabel = document.getElementById('languageLabel');
  const editableCode = document.getElementById('editableCode');
  const codeEditor = document.getElementById('codeEditor');
  const previewFrame = document.getElementById('previewFrame');
  const runBtn = document.getElementById('runBtn');
  const themeToggle = document.getElementById('themeToggle');
  const copyBtn = new ClipboardJS('#copyBtn');
  
  // Set initial language (HTML)
  let currentLanguage = 'html';
  updateLanguage(currentLanguage);
  
  // Language switcher
  languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    updateLanguage(currentLanguage);
  });
  
  // Theme toggle
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    themeToggle.textContent = document.documentElement.classList.contains('dark') ?
      '☀️ Light Mode' :
      '🌙 Dark Mode';
  });
  
  // Run code
  runBtn.addEventListener('click', runCode);
  
  // Sync editor with highlighting
  editableCode.addEventListener('input', (e) => {
    codeEditor.textContent = e.target.value;
    Prism.highlightElement(codeEditor);
    addLineNumbers();
  });
  
  // Update language
  function updateLanguage(lang) {
    languageLabel.textContent = lang;
    codeEditor.className = `language-${lang}`;
    editableCode.value = codeSnippets[lang];
    codeEditor.textContent = codeSnippets[lang];
    Prism.highlightElement(codeEditor);
    addLineNumbers();
  }
  
  // Execute code
  function runCode() {
    const htmlCode = currentLanguage === 'html' ? editableCode.value : codeSnippets.html;
    const cssCode = currentLanguage === 'css' ? editableCode.value : codeSnippets.css;
    const jsCode = currentLanguage === 'javascript' ? editableCode.value : codeSnippets.javascript;
    
    const fullCode = htmlCode
      .replace('<style id="css"></style>', `<style>${cssCode}</style>`)
      .replace('<script id="js"></script>', `<script>${jsCode}</script>`);
    
    previewFrame.srcdoc = fullCode;
  }
  
  // Line numbers
  function addLineNumbers() {
    const lines = editableCode.value.split('\n');
    let lineNumbersHTML = '';
    lines.forEach((_, i) => {
      lineNumbersHTML += `<span class="line-number">${i + 1}</span>\n`;
    });
    document.querySelectorAll('.line-number').forEach(el => el.remove());
    codeEditor.insertAdjacentHTML('afterbegin', lineNumbersHTML);
  }
  
  // Initial setup
  addLineNumbers();
  runCode(); // Show initial preview
});