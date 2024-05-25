import { MDXRemote } from "next-mdx-remote/rsc";

export default async function RemoteMdxPage() {
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  const res = await fetch("https://ipfs.io/ipns/k51qzi5uqu5dlwwdpp7xef1wra8786l87wnpjlg1usfhxy4vi5bp3ifzid0thg");
  const markdown = await res.text();
  return <MDXRemote source={markdown} />;
}
