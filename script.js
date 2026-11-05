// Reconstructed to preserve the original 2022 AJAX GET contract.
function CopyToClipboard() {
  const target = document.getElementById('words');
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(target);
  selection.removeAllRanges();
  selection.addRange(range);
  try { document.execCommand('copy'); }
  finally { selection.removeAllRanges(); }
  document.getElementById('copybutt').blur();
}
function showWords(num) {
  const target = document.getElementById('words');
  const btn = document.getElementById('gobut');
  const count = Math.min(999, Math.max(0, parseInt(num, 10) || 0));
  if (count === 0) { target.textContent=''; return; }
  const ptags = document.getElementById('ptags').checked ? 'p' : 'none';
  const param = document.getElementById('wordchoice').checked ? 'words' : 'para';
  btn.disabled = true;
  const old = btn.innerHTML;
  btn.textContent = 'DOING SCIENCE STUFF';
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) target.innerHTML = xhr.responseText;
      else target.textContent = 'Could not generate text. Please try again.';
      btn.disabled = false; btn.innerHTML = old;
    }
  };
  xhr.open('GET', 'request.php?' + param + '=' + count + '&ptags=' + ptags, true);
  xhr.send();
}
