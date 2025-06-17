from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

USERS_FILE = 'users.json'

if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w') as f:
        json.dump({}, f)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    with open(USERS_FILE, 'r') as f:
        users = json.load(f)

    if username in users and users[username] == password:
        return jsonify({"message": "Login successful", "status": "success"}), 200
    else:
        return jsonify({"message": "Invalid credentials", "status": "error"}), 401

@app.route('/api/currentCode',methods=["GET"])
def code():
    # return jsonify({"code": 1}), 200
    return jsonify({"code":0,"questions":["What is the national bird?", "What is your birthplace?"]}),200 #for multiple page questions



app.run(debug=True)
