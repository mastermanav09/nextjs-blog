import React from "react";
import Head from "next/head";
import PostContent from "../../components/posts/post-detail/PostContent";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

const SinglePost = (props) => {
  return (
    <>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </>
  );
};

export default SinglePost;

export async function getStaticProps(context) {
  const { params } = context;
  const { postId } = params;

  const postData = getPostData(postId);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const postFileNames = getPostsFiles();
  const slugs = postFileNames.map((filename) => filename.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { postId: slug } })),
    fallback: false,
  };
}
