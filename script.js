function getEmotion() {
  const text = document.getElementById("textInput").value;
  document.getElementById("loading").style.display = "block";
  document.getElementById("result").innerHTML = "";
  document.getElementById("emotionDetails").innerHTML = "";

  fetch("https://emotion-tracker-1.onrender.com/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({ text })
  })
    .then(response => response.json())
    .then(data => {
      document.getElementById("loading").style.display = "none";
      const topEmotion = data.top_emotion;
      const confidence = data.confidence;
      const allEmotions = data.all_emotions;

      document.getElementById("result").innerHTML =
        `Top Emotion: <strong>${topEmotion}</strong><br>Confidence: ${confidence}`;

      let detailsHtml = "<strong>All Emotions:</strong><br>";
      for (let [emotion, value] of Object.entries(allEmotions)) {
        detailsHtml += `${emotion}: ${value}<br>`;
      }
      document.getElementById("emotionDetails").innerHTML = detailsHtml;
    })
    .catch(error => {
      console.error("Error:", error);
      document.getElementById("loading").style.display = "none";
      document.getElementById("result").innerHTML = "❌ Error analyzing emotion.";
    });
}
