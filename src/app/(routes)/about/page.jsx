"use client"

import { Cursor, ScrollToTop, Footer, Header, About } from "@/components";

const about = () => {
  return (
    <>
      <ScrollToTop />
      <Cursor />
      <Header />
      <About />
      <Footer />
    </>
  );
};

export default about;
