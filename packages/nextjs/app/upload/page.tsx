"use client";

import React, { useState } from "react";
import { useAccount } from "wagmi";

const UploadFiles = () => {
  const { address } = useAccount();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [collectionID, setCollectionID] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const createCollection = async () => {
    try {
      const response = await fetch("/api/nft-storage/create-collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          collectionName: address, // Using the address as the collection name
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      setCollectionID(data.collectionID);
      return data.collectionID;
    } catch (error: any) {
      console.error("Error creating collection:", error);
      alert(`Error creating collection: ${error.message}`);
      throw error;
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    let currentCollectionID = collectionID;
    if (!currentCollectionID) {
      try {
        currentCollectionID = await createCollection();
      } catch {
        return; // If creating the collection fails, do not proceed
      }
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("collectionID", currentCollectionID as string);

    try {
      const response = await fetch("/api/nft-storage/upload-file", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        console.error("Error response data:", data);
        throw new Error(data.error || "Failed to upload file");
      }

      alert("File uploaded successfully!");
    } catch (error: any) {
      console.error("Error uploading file:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-screen bg-secondary"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button className="btn btn-error" onClick={handleUpload}>
        Upload Markdown Files
      </button>
      <input
        type="file"
        className="file-input file-input-bordered file-input-primary w-full max-w-xs mt-10"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadFiles;
