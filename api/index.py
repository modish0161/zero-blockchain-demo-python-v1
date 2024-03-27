from flask import Flask, jsonify, request
from flask_cors import CORS

# Import your blockchain classes and functions
from ZeroBlockchain_Prototype2_main import ZeroBlockchain

app = Flask(__name__)
CORS(app)

# Create an instance of the ZeroBlockchain
blch = ZeroBlockchain()

# Define a route to return the blockchain data
@app.route("/api/blockchain", methods=['GET'])
def get_blockchain():
    blockchain_data = [block.__dict__ for block in blch.chain]
    return jsonify(blockchain_data)

# Define a route to add a new block to the blockchain
@app.route("/api/add_block", methods=['POST'])
def add_block():
    data = request.json.get('data') if request.json else None
    if data is None:
        return jsonify({'message': 'No data provided'}), 400
    blch.add_block(data)
    return jsonify({'message': 'Block added successfully'}), 200


