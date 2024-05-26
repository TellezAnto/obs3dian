// components/HomeFeed.tsx
"use client";

import Container from "../app/_components/container";
import { MoreStories } from "../app/_components/more-stories";
import { Post } from "../interfaces/post";

// components/HomeFeed.tsx

// components/HomeFeed.tsx

// components/HomeFeed.tsx

// components/HomeFeed.tsx

// components/HomeFeed.tsx

// components/HomeFeed.tsx

// components/HomeFeed.tsx

// components/HomeFeed.tsx

// components/HomeFeed.tsx

// components/HomeFeed.tsx

// components/HomeFeed.tsx

export default function HomeFeed({ allPosts }: { allPosts: Post[] }) {
  const morePosts = allPosts.slice(0);

  return <Container>{morePosts.length > 0 && <MoreStories posts={morePosts} />}</Container>;
}
