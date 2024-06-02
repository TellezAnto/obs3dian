"use client";

import React, { useState } from "react";
import useLit from "../app/lit";

const LitComponent = () => {
  const { encryptMessage, decryptMessage } = useLit();
  const [message, setMessage] = useState<string>("");
  const [encryptedData, setEncryptedData] = useState<{ ciphertext: string; dataToEncryptHash: string } | null>(null);
  const [decryptedMessage, setDecryptedMessage] = useState<string>("");

  const handleEncrypt = async () => {
    if (!message) return;
    const encrypted = await encryptMessage(message);
    if (encrypted) {
      setEncryptedData(encrypted);
    }
  };

  const handleDecrypt = async () => {
    if (!encryptedData) return;
    const decrypted = await decryptMessage(encryptedData.ciphertext, encryptedData.dataToEncryptHash);
    if (decrypted) {
      setDecryptedMessage(decrypted);
    }
  };

  return (
    <div>
      <h1>Lit Protocol Encryption/Decryption</h1>
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} placeholder="Enter a message" />
      <button onClick={handleEncrypt}>Encrypt</button>
      {encryptedData && <p>Encrypted: {encryptedData.ciphertext}</p>}
      <button onClick={handleDecrypt}>Decrypt</button>
      {decryptedMessage && <p>Decrypted: {decryptedMessage}</p>}
    </div>
  );
};

export default LitComponent;
