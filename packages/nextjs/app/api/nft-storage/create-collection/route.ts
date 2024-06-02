import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { address, collectionName } = await request.json();
    const apiKey = process.env.NFT_STORAGE_API_KEY;

    console.log("NFT_STORAGE_API_KEY:", apiKey); // Verificar si la clave API se está leyendo
    console.log("Received data:", { address, collectionName });

    const response = await fetch("https://preserve.nft.storage/api/v1/collection/create_collection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        contractAddress: address,
        collectionName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating collection:", errorData);
      return NextResponse.json(
        { error: errorData.message || "Failed to create collection" },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json({ collectionID: data.collectionID });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
