function getEmotion() {
    const text = document.getElementById("textInput").value;

    // Show loading & precaution
    document.getElementById("loading").style.display = "block";
    document.getElementById("precaution").style.display = "block";
    document.getElementById("result").innerHTML = "";
    document.getElementById("emotionDetails").innerHTML = "";

    // Send POST request
    fetch("https://emotion-tracker-1.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("loading").style.display = "none";

        const topEmotion = data.top_emotion;
        const confidence = data.confidence;
        const allEmotions = data.all_emotions;

        const result = document.getElementById("result");
        const emotionDetails = document.getElementById("emotionDetails");

        result.innerHTML = `Top Emotion: <strong>${topEmotion}</strong><br>Confidence: ${confidence}`;

        // Color coding
        let emotionColor = "#000";
        switch (topEmotion.toLowerCase()) {
            case "happiness":
                emotionColor = "#FF69B4";
                break;
            case "sadness":
                emotionColor = "#5D5C61";
                break;
            case "anger":
                emotionColor = "#D9534F";
                break;
            case "fear":
                emotionColor = "#6C757D";
                break;
            default:
                emotionColor = "#333";
        }

        result.style.color = emotionColor;

        // Show all emotion confidence
        let detailsHtml = "<strong>All Emotions:</strong><br>";
        for (let [emotion, value] of Object.entries(allEmotions)) {
            detailsHtml += `${emotion}: ${value}<br>`;
        }

        emotionDetails.innerHTML = detailsHtml;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("loading").style.display = "none";
        document.getElementById("result").innerHTML = "❌ Failed to analyze emotion.";
    });
}
