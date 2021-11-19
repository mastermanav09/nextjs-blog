import React from "react";
import PostHeader from "./PostHeader";
import classes from "./PostContent.module.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("css", css);

const PostContent = ({ post }) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown
        components={{
          // img: (image) => (
          //   <Image
          //     src={`/images/posts/${post.slug}/${image.src}`}
          //     alt={image.alt}
          //     width={600}
          //     height={300}
          //   />
          // ),

          p: function (para) {
            const { node } = para;

            if (node.children[0].tagName === "img") {
              const image = node.children[0];

              return (
                <Image
                  src={`/images/posts/${post.slug}/${image.properties.src}`}
                  alt={image.properties.alt}
                  width={600}
                  height={300}
                />
              );
            }

            return <p>{para.children}</p>;
          },

          code: function (code) {
            const { className, children } = code;
            const language = className.split("-")[1];

            return (
              <SyntaxHighlighter style={atomDark} language={language}>
                {children[0]}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {post.content}
      </ReactMarkdown>
    </article>
  );
};

export default PostContent;
