import React from "react";
import classes from "./Hero.module.css";
import Image from "next/image"; // Image comp. are lazy-loaded.

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/site/myself.jpg"
          alt="An image showing myself."
          width={300}
          height={300}
          layout={"responsive"}
        />
      </div>
      <h1>Hi, I'm Manav Naharwal</h1>
      <p>I am a MERN stack developer.</p>
    </section>
  );
};

export default Hero;
