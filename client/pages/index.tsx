import React, { useState, useEffect } from 'react';
import Head from 'next/head'; // Correctly import Head

interface Block {
  block_number: number;
  timestamp: number;
  transactions: string[]; // Transactions are assumed to be an array of strings
  merkle_root: string;
  prev_hash: string | null;
  hash: string;
  nonce: number;
  difficulty: number;
  block_size: number; // Assuming block size is in bytes
}

const Index: React.FC = () => {
  const [blockchainData, setBlockchainData] = useState<Block[]>([]);

  useEffect(() => {
    fetchBlockchainData();
  }, []);

  const fetchBlockchainData = () => {
    fetch('https://zero-blockchain-demo-python-v1.vercel.app/api/blockchain')
      .then(response => response.json())
      .then((data: Block[]) => setBlockchainData(data))
      .catch(error => console.error('Error fetching blockchain data:', error));
  };

  const addNewBlock = () => {
    fetch('https://zero-blockchain-demo-python-v1.vercel.app/api/add_block', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: 'New Block Data' }),
    })
      .then(() => fetchBlockchainData())
      .catch(error => console.error('Error adding new block:', error));
  };

  // Reset blockchain data to an empty array when component mounts
  useEffect(() => {
    setBlockchainData([]);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Zero-Blockchain Demo - Python V1</title>
        <style>{`
          .block {
            background-color: #f2f2f2; /* Light gray background */
            padding: 10px;
            margin-bottom: 10px;
            color: white;
            font-weight: bold;
          }
        `}</style>
      </Head>
      <div id="blockchainWrapper">
        <h1>Zero-Blockchain Demo/Frontend in TypeScript/Next.js - Flask Bridge & Backend in Python - Hashlib - SHA 256</h1>
        <p>Welcome to the Zero-Blockchain interactive demo. This tool simulates the process of creating and adding blocks to a blockchain, demonstrating the core principles of blockchain technology, including transaction aggregation, block creation, mining, and chain addition. Explore the immutable and decentralised ledger that underpins cryptocurrencies and other blockchain applications.</p>
        <button id="addBlock" onClick={addNewBlock}>Press Me - Add New Block to Zero-Blockchain.xyz</button>
        <div id="blockchainStatus">
          <h2>Blockchain Data:</h2>
          {blockchainData.map((block) => (
            <div key={block.hash} className="block">
              <p><strong>Block Number:</strong> {block.block_number}</p>
              <p><strong>Timestamp:</strong> {new Date(block.timestamp * 1000).toLocaleString()}</p>
              <p><strong>Transactions:</strong> {Array.isArray(block.transactions) ? block.transactions.join(', ') : 'No transactions'}</p>
              <p><strong>Merkle Root:</strong> {block.merkle_root}</p>
              <p><strong>Previous Hash:</strong> {block.prev_hash}</p>
              <p><strong>Hash:</strong> {block.hash}</p>
              <p><strong>Nonce:</strong> {block.nonce}</p>
              <p><strong>Mining Difficulty:</strong> {block.difficulty}</p>
              <p><strong>Block Size:</strong> {block.block_size} bytes</p>
            </div>
          ))}

          <h1>Understanding the Zero-Blockchain Demo</h1>
          <p>
            By pressing the &quot;Add New Block&quot; button, you initiate the simulation of several core blockchain operations. The demo showcases how transactions are bundled into blocks, how blocks are mined through a proof-of-work process, and how they are then added to the blockchain, extending the ledger.
          </p>
          <p>
            The demo includes features like dynamic difficulty adjustment based on transaction volume, a simulation of the mining process, and the creation of an immutable chain of blocks. Each block contains a set of simulated transactions, a unique hash, a nonce that has been discovered through mining, and links to the preceding block, demonstrating the interconnected nature of blockchain technology.
          </p>
          <p>
            This interactive tool is designed to provide a hands-on understanding of how blockchain works, making the technology more accessible and understandable.
          </p>

          <h2>About Zero-Blockchain.xyz</h2>
          <p>
            <a href="https://zero-blockchain.xyz/">Zero-Blockchain.xyz</a> is committed to advancing blockchain technology. Our platform serves as a resource for both novices and professionals in the blockchain space, offering educational tools, insights, and analyses to empower users to navigate the blockchain ecosystem effectively.
          </p>

        </div>
      </div>
      <section id="demoExplanation">
        {/* The explanatory text remains unchanged */}
      </section>
    </>
  );
};

export default Index;
