"use client";

import { useState } from "react";
import useLit from "~~/hooks/useLit";

export default function HomePage() {
  const { encryptMessage, decryptMessage } = useLit();
  const [encryptedData, setEncryptedData] = useState<{ ciphertext: string; dataToEncryptHash: string } | null>(null);

  const handleEncrypt = async () => {
    const message = "Hello, Lit Protocol!";
    const data = await encryptMessage(message);
    console.log(data);
    if (data) {
      setEncryptedData(data);
    }
  };

  const handleDecrypt = async () => {
    if (encryptedData) {
      const decryptedMessage = await decryptMessage(encryptedData.ciphertext, encryptedData.dataToEncryptHash);
      alert(`Decrypted Message: ${decryptedMessage}`);
    }
  };

  return (
    <div>
      <h1>Welcome to the Lit Protocol Integration</h1>
      <button className="btn" onClick={handleEncrypt}>
        Encrypt Message
      </button>
      <button className="btn" onClick={handleDecrypt} disabled={!encryptedData}>
        Decrypt Message
      </button>
    </div>
  );
}
