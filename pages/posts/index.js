import React from "react";
import Head from "next/head";
import AllPosts from "../../components/posts/AllPosts";
import { getAllPosts } from "../../lib/posts-util";

const AllPostsPage = (props) => {
  return (
    <>
      <Head>
        <title>All posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorial & posts."
        />
      </Head>
      <AllPosts posts={props.posts} />
    </>
  );
};

export default AllPostsPage;

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts: posts,
    },

    revalidate: 120,
  };
}
