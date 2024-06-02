import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const apiKey = process.env.NFT_STORAGE_API_KEY;

  const file = formData.get("file") as File;
  const collectionID = formData.get("collectionID") as string;

  if (!file || !collectionID) {
    return NextResponse.json({ error: "Missing file or collectionID" }, { status: 400 });
  }

  const uploadFormData = new FormData();
  uploadFormData.append("file", file);
  uploadFormData.append("collectionID", collectionID);

  const response = await fetch("https://preserve.nft.storage/api/v1/collection/add_tokens", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: uploadFormData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json({ error: errorData.message || "Failed to upload file" }, { status: response.status });
  }

  return NextResponse.json({ message: "File uploaded successfully!" });
}
