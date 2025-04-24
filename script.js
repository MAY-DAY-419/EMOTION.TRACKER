function getEmotion() {
    const text = document.getElementById("textInput").value;

    // Update the URL to target the /analyze endpoint
    fetch("https://emotion-tracker-1.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    })
    .then(response => response.json())
    .then(data => {
        const result = document.getElementById("result");
        const emotionDetails = document.getElementById("emotionDetails");

        result.innerHTML = `Top Emotion: ${data.top_emotion} <br> Confidence: ${data.confidence}`;

        let detailedEmotions = "<strong>All Emotions:</strong><br>";
        for (let emotion in data.all_emotions) {
            detailedEmotions += `${emotion}: ${data.all_emotions[emotion]}<br>`;
        }

        emotionDetails.innerHTML = detailedEmotions;
    })
    .catch(error => console.error('Error:', error));
}
