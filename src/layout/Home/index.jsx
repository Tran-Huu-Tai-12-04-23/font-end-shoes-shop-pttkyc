import Header from "../../components/Header";
import About from "./About";
import Hero from "./Hero";
import Sale from "./Sale";
import Brand from "./Brand";
import FeedBack from "./FeedBack";
import Footer from "./Footer";
import { useState } from "react";
import { useEffect } from "react";
import Services from "../../Services";

function Home() {
  const [productNewest, setProductNewest] = useState([]);

  useEffect(() => {
    const getProductNewest = async () => {
      const res = await Services.getDataFromApi(
        "/api/item/newest",
        `/?number=3`
      );
      if (res.status === 200) {
        setProductNewest(JSON.parse(res.data));
      }
    };
    getProductNewest();
  }, []);
  return (
    <>
      <div className="pl-10 pr-10">
        <Header />
        <Hero productNewest={productNewest} />
        <About />
        <Sale />
        <Brand />
        <FeedBack />
      </div>
      <Footer />
    </>
  );
}

export default Home;
