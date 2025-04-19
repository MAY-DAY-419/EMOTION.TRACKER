from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import os

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Initialize emotion detection model from Hugging Face
classifier = pipeline("text-classification", model="SamLowe/roberta-base-go_emotions", return_all_scores=True)

def emotion_response(emotion):
    responses = {
        "joy": "You're radiating sunshine! ☀️ Joy is in the air.",
        "sadness": "A heavy heart speaks... 😔 It's okay to feel down sometimes.",
        "anger": "Whoa, flames of rage detected! 🔥 Take a deep breath.",
        "fear": "Anxious winds are blowing... 🕷️ Stay strong, you're not alone.",
        "disgust": "Yikes, something's definitely off-putting. 😖",
        "surprise": "A twist in the tale! 🎉 You didn't see that coming, huh?",
        "neutral": "Balanced vibes. ⚖️ Just cruising through the moment.",
        "love": "Aww someone’s feelin’ the love 💕 Spread that good energy!"
    }
    return responses.get(emotion.lower(), "You're feeling something deep...")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")
    results = classifier(text)[0]
    results.sort(key=lambda x: x['score'], reverse=True)
    top = results[0]

    response = {
        "top_emotion": top["label"],
        "confidence": round(top["score"], 4),
        "creative_text": emotion_response(top["label"]),
        "all_emotions": {r["label"]: round(r["score"], 4) for r in results}
    }
    return jsonify(response)

if __name__ == "__main__":
    # Get the port from environment variable (use 5000 if not found)
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
