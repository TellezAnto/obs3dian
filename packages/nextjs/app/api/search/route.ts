import { NextRequest, NextResponse } from "next/server";
import { getAllPosts } from "../../../lib/api";
import { Searcher } from "fast-fuzzy";

const searchIndex = (await getAllPosts()).map(p => {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    date: p.date,
  };
});

const searcher = new Searcher(searchIndex, { keySelector: obj => `${obj.title}\n${obj.excerpt}` });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  const searchedPosts = searcher.search(q, { returnMatchData: true });
  return NextResponse.json(searchedPosts.slice(0, 10));
}

export async function POST() {
  return NextResponse.json({ error: "Method POST Not Allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method PUT Not Allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method DELETE Not Allowed" }, { status: 405 });
}
