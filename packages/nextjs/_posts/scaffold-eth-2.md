---
title: "Scaffold ETH 2"
excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus."
coverImage: "/assets/blog/hello-world/cover.jpg"
date: "2020-03-16T05:35:07.322Z"
author:
  name: Tim Neutkens
  picture: "/assets/blog/authors/tim.jpeg"
ogImage:
  url: "/assets/blog/hello-world/cover.jpg"
---

To leverage Scaffold-ETH 2 to deploy an alternative for Obsidian online, you can follow these steps:

1. **Set up Scaffold-ETH 2 environment**: Start by setting up your development environment using Scaffold-ETH 2. This includes cloning the repository and installing all necessary dependencies:
    ```
    git clone https://github.com/scaffold-eth/scaffold-eth-2.git
    cd scaffold-eth-2
    yarn install
    ```

2. **Smart Contract Development**: Create and develop the smart contracts that will power the core functionality of your Obsidian alternative. These contracts could include note storage, user management, and access control mechanisms. Scaffold-ETH 2 provides contract templates you can build upon:
    ```solidity
    // Example of a simple Note contract
    pragma solidity ^0.8.0;

    contract Note {
        struct Note {
            string content;
            address author;
            uint256 timestamp;
        }

        Note[] public notes;

        function createNote( string memory _content) public {
            notes.push(Note({
                content: _content,
                author: msg.sender,
                timestamp: block.timestamp
            }));
        }

        function getNotes() public view returns (Note[] memory) {
            return notes;
        }
    }
    ```

3. **Frontend Integration**: Utilize the React framework bundled with Scaffold-ETH 2 to create a user interface for your application. This UI should enable users to interact with the contracts, such as writing, editing, and viewing notes.

    Edit the `App.jsx` file to incorporate your Note contract:
    ```javascript
    import { useContractRead, useContractWrite } from '@scaffold-eth-2/api/hooks';
    import Note from '../web3/contracts/Note.json';

    function App() {
      const { data: notes } = useContractRead(Note, 'getNotes');
      const { write: createNote } = useContractWrite(Note, 'createNote');

      const handleSubmit = async (event) => {
        event.preventDefault();
        const content = event.target.elements.noteContent.value;
        await createNote({ args: [content] });
        // update UI or manage states as necessary
      };

      return (
        <div>
          <form onSubmit={handleSubmit}>
            <textarea name="noteContent" placeholder="Write your note here..."></textarea>
            <button type="submit">Submit</button>
          </form>
          <h2>Notes</h2>
          <ul>
            {notes && notes.map((note, index) => (
              <li key={index}>
                <p>{note.content}</p>
                <small>by {note.author}</small>
                <small>at {new Date(note.timestamp * 1000).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        </div>
      );
    }

    export default App;
    ```

4. **Deploy Smart Contracts**: Deploy your smart contracts to the Ethereum network. Scaffold-ETH includes scripts for deploying contracts:
    ```bash
    yarn deploy
    ```

5. **Connect Frontend to Deployed Contract**: Update your frontend configurations to point to the deployed contract addresses. This typically involves setting environment variables or updating configuration files.

6. **Testing and Optimization**: Thoroughly test your application to ensure that all functionalities work as expected. Optimize smart contracts and frontend code for gas efficiency and performance.

By following these steps, you can create a decentralized, blockchain-based alternative to the Obsidian note-taking application using Scaffold-ETH 2.
