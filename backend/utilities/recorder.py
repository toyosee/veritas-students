from flask import request, jsonify
import json
import os

DATA_FILE = 'db.json'

# Function to handle data submission
def submit_data():
    data = request.get_json()
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    # Load existing data
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            existing = json.load(f)
    else:
        existing = []

    # Append new data
    existing.append(data)

    # Save back to file
    with open(DATA_FILE, 'w') as f:
        json.dump(existing, f, indent=2)

    return jsonify({"message": "Data saved successfully"}), 201


# Get submitted data
def get_submissions():
    # If file doesn't exist yet, return empty list
    if not os.path.exists(DATA_FILE):
        return jsonify([]), 200

    try:
        with open(DATA_FILE, 'r') as f:
            submissions = json.load(f)
    except json.JSONDecodeError:
        submissions = []  # fallback if file is empty or corrupted

    return jsonify(submissions), 200