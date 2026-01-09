import React from "react";
import Homeherosection from "./Homeherosection";
import Homeproductsection from "./Homeproductsection";
import Homechoosesection from "./Homechoosesection";
import Homehelpsection from "./Homehelpsection";
import Homepopularsection from "./Homepopularsection";
import Hometestimonialsection from "./Hometestimonialsection";
import Homeblogsection from "./Homeblogsection";

const Home = () => {
  return (
    <>
      <Homeherosection />
      {/* <Homeproductsection /> */}
      <Homeproductsection showDynamic={false} />

      <Homechoosesection />
      <Homehelpsection />
      <Homepopularsection />

      <Homeblogsection />
      <Hometestimonialsection />
    </>
  );
};

export default Home;
