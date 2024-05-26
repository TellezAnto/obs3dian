// app/page.tsx
import HomeContent from "../components/HomeContent";
import { Post } from "../interfaces/post";
import { getAllPosts } from "../lib/api";

const Home = async () => {
  const allPosts: Post[] = getAllPosts();

  return <HomeContent allPosts={allPosts} />;
};

export default Home;
