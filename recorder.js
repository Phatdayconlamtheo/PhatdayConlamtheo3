
let mediaRecorder, audioChunks = [], startTime;
function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(audioBlob);
      a.download = 'recording.mp3';
      a.click();
      audioChunks = [];
    };
    mediaRecorder.start();
    startTime = Date.now();
    updateTimer();
  });
}
function stopRecording() {
  mediaRecorder.stop();
}
function updateTimer() {
  const now = Date.now();
  const diff = Math.floor((now - startTime) / 1000);
  const min = String(Math.floor(diff / 60)).padStart(2, '0');
  const sec = String(diff % 60).padStart(2, '0');
  document.getElementById('timer').innerText = `⏱ ${min}:${sec}`;
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    setTimeout(updateTimer, 1000);
  }
}
