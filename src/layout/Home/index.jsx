import Header from "../../components/Header";
import About from "./About";
import Hero from "./Hero";
import Sale from "./Sale";
import Brand from "./Brand";
import FeedBack from "./FeedBack";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <div className="pl-10 pr-10">
        <Header />
        <Hero />
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
