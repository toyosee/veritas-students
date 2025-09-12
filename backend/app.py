from flask import Flask, jsonify
from flask_cors import CORS
from utilities.server_utils import get_system_info, greet_based_on_time, load_customers
from utilities.helper import info_map
from utilities.recorder import submit_data, get_submissions
from dotenv import load_dotenv
import os

# Initialize app
app = Flask(__name__)
CORS(app)

# Load environment variables from .env file
load_dotenv()
port = int(os.getenv("PORT", 5000))  # Default to 5000 if not set
host = os.getenv("HOST", "0.0.0.0")  # Default to 0.0.0.0 if not set


# Root route. Default route
@app.route('/')
def home():
    greet = greet_based_on_time()
    return jsonify(greet)

# Info route
@app.route('/info')
def info():
    if not info_map:
        return jsonify({"Error": "No information available"}), 404
    return jsonify(info_map)

# Customers route
@app.route('/customers')
def customers():
    return jsonify(load_customers())

# System route
@app.route('/system')
def system():
    return jsonify(get_system_info())

# Username route
@app.route('/user')
def get_username():
    username = "Elias"
    return jsonify(username)

# Data submission route
@app.route('/submit', methods=['POST'])
def handle_submit():
    return submit_data()

# Get submissions route
@app.route('/submissions', methods=['GET'])
def handle_get_submissions():
    return get_submissions()

# Run app
if __name__ == '__main__':
    app.run(host=host, port=port, debug=True)