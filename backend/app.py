from flask import Flask, jsonify, request
from flask_cors import CORS
from utilities.server_utils import get_system_info, greet_based_on_time, load_customers
from utilities.helper import info_map
from utilities.recorder import submit_data, get_submissions
from utilities.queries import fetch_data_from_table, get_customer_by_id, create_customer, update_customer, delete_customer
from dotenv import load_dotenv
import os

# Initialize app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

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
    username = "Elijah Abolaji"
    return jsonify(username)

# Data submission route
@app.route('/submit', methods=['POST'])
def handle_submit():
    return submit_data()

# Get submissions route
@app.route('/submissions', methods=['GET'])
def handle_get_submissions():
    return get_submissions()

# CRUD operations for customers
# Fetching data from customers table
@app.route('/data/customers', methods=['GET'])
def get_customers_data():
    data = fetch_data_from_table('customers', 'country')
    if data is None:
        return jsonify({"Error": "Could not fetch data"}), 500
    return jsonify(data)

# Create, Update, Delete customer by ID
# Get a single customer by ID
@app.route('/customer/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    customer = get_customer_by_id(customer_id)
    if not customer:
        return jsonify({"Error": "Customer not found"}), 404
    return jsonify(customer)

# Create a new customer
@app.route('/customer', methods=['POST'])
def add_customer():
    customer_data = request.get_json(force=True)  # safer than request.json
    print(customer_data)
    
    # Define required fields
    required_fields = ["first_name", "last_name", "email", "phone", "address", "city", "country"]

    # Check for missing keys
    missing = [field for field in required_fields if field not in customer_data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    new_customer = create_customer(customer_data)
    if new_customer is None:
        return jsonify({"error": "Could not create customer"}), 500

    return jsonify(new_customer), 201


# Update an existing customer
@app.route('/customer/<int:customer_id>', methods=['PUT'])
def modify_customer(customer_id):
    customer_data = request.json
    updated_customer = update_customer(customer_id, customer_data)
    if updated_customer is None:
        return jsonify({"Error": "Could not update customer"}), 500
    return jsonify(updated_customer)

# Delete a customer by ID
@app.route('/customer/<int:customer_id>', methods=['DELETE'])
def remove_customer(customer_id):
    result = delete_customer(customer_id)
    if result is None:
        return jsonify({"Error": "Could not delete customer"}), 500
    return jsonify(result)  

# Run app
if __name__ == '__main__':
    app.run(host=host, port=port, debug=True)