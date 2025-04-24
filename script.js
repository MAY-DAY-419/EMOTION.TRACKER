function getEmotion() {
    const text = document.getElementById("textInput").value;
    
    // Show loading spinner and precaution message
    document.getElementById("loading").style.display = "block";
    document.getElementById("precaution").style.display = "block";
    document.getElementById("result").innerHTML = "";
    document.getElementById("emotionDetails").innerHTML = "";

    // Update the URL to target the /analyze endpoint
    fetch("https://emotion-tracker-1.onrender.com/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    })
    .then(response => response.json())
    .then(data => {
        // Hide loading spinner
        document.getElementById("loading").style.display = "none";

        const result = document.getElementById("result");
        const emotionDetails = document.getElementById("emotionDetails");

        // Get the top emotion and confidence
        const topEmotion = data.top_emotion;
        const confidence = data.confidence;

        result.innerHTML = `Top Emotion: <strong>${topEmotion}</strong> <br> Confidence: ${confidence}`;

        // Set the color based on happiness (shades of pink)
        let emotionColor = "#FFB6C1"; // Default to light pink
        if (topEmotion.toLowerCase() === "happiness") {
            emotionColor = "#FF69B4"; // Bright pink for joy
        } else if (topEmotion.toLowerCase() === "sadness") {
            emotionColor = "#D3A6B1"; // Light pink for sadness
        }

        // Style the result text with emotion color
        result.style.color = emotionColor;

        // Detailed emotions (but we focus on the top emotion only)
        emotionDetails.innerHTML = `<strong>All Emotions:</strong><br>${topEmotion}: ${data.all_emotions[topEmotion]}<br>`;

    })
    .catch(error => {
        console.error('Error:', error);
        // Hide loading spinner on error
        document.getElementById("loading").style.display = "none";
    });
}
