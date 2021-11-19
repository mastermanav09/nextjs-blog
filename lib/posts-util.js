import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postDirectory = path.join(process.cwd(), "data", "posts");

export function getPostsFiles() {
  const postFiles = fs.readdirSync(postDirectory);
  return postFiles;
}

export function getPostData(postIdentifier) {
  const postSlug = postIdentifier.replace(/\.md$/, ""); // removes the file extension.
  const filepath = path.join(postDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filepath, "utf-8");
  const { data, content } = matter(fileContent); // returns two things data object containing the meta data and content property which contains the actual content.

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => getPostData(postFile));

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
