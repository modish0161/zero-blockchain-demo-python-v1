import hashlib
import time
import json

def hashGenerator(data):
    return hashlib.sha256(data.encode()).hexdigest()

def calculate_merkle_root(transactions):
    if not transactions:
        return ''
    if len(transactions) == 1:
        return hashGenerator(transactions[0])
    new_level = []
    for i in range(0, len(transactions)-1, 2):
        new_level.append(hashGenerator(transactions[i] + transactions[i+1]))
    if len(transactions) % 2 == 1: # if odd number of transactions, duplicate last
        new_level.append(hashGenerator(transactions[-1] + transactions[-1]))
    return calculate_merkle_root(new_level)

class Block:
    def __init__(self, transactions, prev_hash, block_number):
        self.timestamp = time.time()
        self.transactions = transactions
        self.merkle_root = calculate_merkle_root(transactions)
        self.prev_hash = prev_hash
        self.block_number = block_number
        self.nonce = 0
        self.difficulty = 2
        self.hash = self.mine_block()
        self.block_size = len(json.dumps(self.__dict__)) # simplistic block size calculation

    def mine_block(self):
        while True:
            hash_str = self.calculate_hash()
            if hash_str[:self.difficulty] == '0' * self.difficulty:
                return hash_str
            else:
                self.nonce += 1

    def calculate_hash(self):
        block_str = (str(self.timestamp) + str(self.transactions) + 
                     self.merkle_root + str(self.prev_hash) + 
                     str(self.nonce) + str(self.block_number))
        return hashGenerator(block_str)

class ZeroBlockchain:
    def __init__(self):
        self.chain = [Block(['Genesis block'], '0', 0)]

    def add_block(self, transactions):
        prev_hash = self.chain[-1].hash
        block_number = self.chain[-1].block_number + 1
        new_block = Block(transactions, prev_hash, block_number)
        self.chain.append(new_block)

blch = ZeroBlockchain()
# Example of adding a block with multiple transactions
blch.add_block(['Transaction 1', 'Transaction 2'])

# Demonstration loop
for block in blch.chain:
    print(f"Block Number: {block.block_number}")
    print(f"Timestamp: {block.timestamp}")
    print(f"Transactions: {block.transactions}")
    print(f"Merkle Root: {block.merkle_root}")
    print(f"Previous Hash: {block.prev_hash}")
    print(f"Hash: {block.hash}")
    print(f"Nonce: {block.nonce}")
    print(f"Mining Difficulty: {block.difficulty}")
    print(f"Block Size: {block.block_size} bytes")
    print()
