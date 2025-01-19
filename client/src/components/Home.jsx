import React from "react";
import Hero from "./Hero";
import Content from "./Content";
import RunningTags from "./RunningTags";
const Home = () => {
  return (
    <div className="content-height">
      <section>
        <Hero />
      </section>
      <section>
        <RunningTags />
      </section>
      <section>
        <Content />
      </section>
    </div>
  );
};

export default Home;
