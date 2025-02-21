import Header from "./Header";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import BackgroundBlur from "./BackgroundBlur";
import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col z-20 relative overflow-hidden">
      <BackgroundBlur />
      <Header />
      <SearchBar />
      <Footer />
    </div>
  );
};

export default Home;
