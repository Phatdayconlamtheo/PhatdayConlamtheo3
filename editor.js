
function splitText() {
  const input = document.getElementById('textInput').value;
  const sentences = input.match(/[^.!?\n]+[.!?\n]?/g);
  const output = document.getElementById('output');
  output.innerHTML = '';
  sentences.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'highlight';
    div.textContent = s.trim();
    div.id = `sent-${i}`;
    output.appendChild(div);
  });
}
let currentUtterance;
function startReading() {
  splitText();
  const items = document.querySelectorAll('.highlight');
  let index = 0;
  function readNext() {
    if (index >= items.length) return;
    if (currentUtterance) speechSynthesis.cancel();
    items.forEach(i => i.classList.remove('playing'));
    const text = items[index].textContent;
    const utter = new SpeechSynthesisUtterance(text);
    utter.onend = () => { index++; readNext(); };
    currentUtterance = utter;
    items[index].classList.add('playing');
    speechSynthesis.speak(utter);
  }
  readNext();
}
function stopReading() {
  speechSynthesis.cancel();
}
