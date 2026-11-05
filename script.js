// Lorum Ricksum — static JavaScript implementation.
// The original 2022 interface is retained; no PHP or server-side code is needed.
let dialoguePromise;
let currentParagraphs = []; // Stored so the Pickle Rick toggle updates existing output.

function loadDialogue() {
  if (!dialoguePromise) {
    dialoguePromise = fetch('quotes.txt')
      .then(response => {
        if (!response.ok) throw new Error('Dialogue file could not be loaded (' + response.status + ')');
        return response.text();
      })
      .then(text => {
        const lines = text.split(/\r?\n/u).map(line => line.trim()).filter(Boolean);
        if (lines.length === 0) throw new Error('The dialogue file is empty.');
        return lines;
      })
      .catch(error => { dialoguePromise = undefined; throw error; });
  }
  return dialoguePromise;
}

function randomLine(lines) {
  return lines[Math.floor(Math.random() * lines.length)];
}

function generateWords(lines, amount) {
  const output = [];
  while (output.length < amount) {
    const words = randomLine(lines).split(/\s+/u).filter(Boolean);
    output.push(...words.slice(0, amount - output.length));
  }
  return output.join(' ');
}

function generateParagraphs(lines, amount) {
  return Array.from({length: amount}, () => {
    const lineCount = 4 + Math.floor(Math.random() * 4);
    return Array.from({length: lineCount}, () => randomLine(lines)).join(' ');
  });
}

function renderOutput(paragraphs, includeTags) {
  const target = document.getElementById('words');
  // Display markup as text, not as invisible HTML elements.
  // Each generated paragraph gets its own opening and closing tags.
  target.textContent = paragraphs.map(paragraph =>
    includeTags ? '<p>' + paragraph + '</p>' : paragraph
  ).join('\n\n');
  target.style.whiteSpace = 'pre-wrap';
}

document.getElementById('ptags').addEventListener('change', function () {
  if (currentParagraphs.length) renderOutput(currentParagraphs, this.checked);
});

async function showWords(num) {
  const output = document.getElementById('words');
  const button = document.getElementById('gobut');
  const parsed = Number.parseInt(num, 10);
  const amount = Number.isFinite(parsed) ? Math.max(0, Math.min(999, parsed)) : 0;
  if (amount === 0) { currentParagraphs = []; output.replaceChildren(); return; }
  if (button.disabled) return;

  const asWords = document.getElementById('wordchoice').checked;
  const includeTags = document.getElementById('ptags').checked;
  const originalButtonHTML = button.innerHTML;
  button.disabled = true;
  button.textContent = 'DOING SCIENCE STUFF';

  try {
    const lines = await loadDialogue();
    const paragraphs = asWords
      ? [generateWords(lines, amount)]
      : generateParagraphs(lines, amount);
    currentParagraphs = paragraphs;
    renderOutput(currentParagraphs, document.getElementById('ptags').checked);
  } catch (error) {
    currentParagraphs = [];
    output.textContent = 'Could not generate text. ' + error.message;
  } finally {
    button.disabled = false;
    button.innerHTML = originalButtonHTML;
  }
}

async function CopyToClipboard() {
  const target = document.getElementById('words');
  const content = target.textContent;
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(content);
    } else {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(target);
      selection.removeAllRanges();
      selection.addRange(range);
      document.execCommand('copy');
      selection.removeAllRanges();
    }
  } catch (error) {
    console.error('Clipboard copy failed:', error);
  }
  document.getElementById('copybutt').blur();
}
