from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Set up API key for genai
genai.configure(api_key="AIzaSyAwlicZmh1pzlW62YZgptoWwJEVXZxvC_0")

# Suspect model configurations
suspect_models = {
    "alice": {
        "model_name": "gemini-1.5-pro",
        "generation_config": {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain"
        },
        "system_instruction": """You are a character in a murder mystery and you are one of the suspects. 
        Your name is Alice, and your profile description is as follows:
        'Alice is Mr. Blackwood's business partner. They were rumored to have disagreements over the company’s future. 
        Alice claims she was in the library reading a book, but looked nervous when saying this. Clues are as follows: ...'
        The storyline is Mr. Blackwood was found dead at his estate, Ravenswood Manor. The primary suspects are Alice, his business partner; 
        Bob, his estranged brother; and Clara, a family friend. Always stay in character and respond in 1-2 sentences."""
    },
    "bob": {
        "model_name": "gemini-1.5-flash",
        "generation_config": {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain"
        },
        "system_instruction": """You are a character in a murder mystery and you are one of the suspects. 
        Your name is Bob, and your profile description is as follows:
        'Bob is Mr. Blackwood’s estranged brother, recently returned to town after a long absence. Rumors say he was in financial trouble. 
        Bob claims he was in the billiard room practicing shots, but his story seems evasive. Clues are as follows: ...'
        The storyline is Mr. Blackwood was found dead at his estate, Ravenswood Manor. The primary suspects are Alice, his business partner; 
        Bob, his estranged brother; and Clara, a family friend. Always stay in character and respond in 1-2 sentences."""
    },
    "clara": {
        "model_name": "gemini-1.5-flash",
        "generation_config": {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 40,
            "max_output_tokens": 8192,
            "response_mime_type": "text/plain"
        },
        "system_instruction": """You are a character in a murder mystery and you are one of the suspects. 
        Your name is Clara, and your profile description is as follows:
        'Clara is a longtime family friend with a secretive past. She was in the grand hall mingling with guests, but witnesses say she disappeared briefly. 
        Clues are as follows: ...'
        The storyline is Mr. Blackwood was found dead at his estate, Ravenswood Manor. The primary suspects are Alice, his business partner; 
        Bob, his estranged brother; and Clara, a family friend. Always stay in character and respond in 1-2 sentences."""
    }
}

@app.route('/ask_character', methods=['POST'])
def ask_character():
    data = request.json
    character = data.get('character')
    user_input = data.get('user_input')

    if character not in suspect_models:
        return jsonify({"error": "Invalid character selected"}), 400

    # Retrieve model and config based on character
    model_name = suspect_models[character]['model_name']
    generation_config = suspect_models[character]['generation_config']
    system_instruction = suspect_models[character]['system_instruction']

    model = genai.GenerativeModel(
        model_name=model_name,
        generation_config=generation_config,
        system_instruction=system_instruction
    )

    # Start chat session and send message
    chat_session = model.start_chat()
    response = chat_session.send_message(user_input)
    response_text = response.text

    return jsonify({"response": response_text})
@app.route('/choose_killer', methods=['POST'])
def choose_killer():
    data = request.get_json()
    chosen_killer = data.get('chosen_killer')
    
    # Example logic (you can replace it with your actual logic)
    if chosen_killer == 'Alice':  # Assuming Alice is the killer
        return jsonify({"isAlive": True})
    else:
        return jsonify({"isAlive": False})

if __name__ == '__main__':
    app.run(debug=True)
