import React, { useState, useEffect, useContext } from "react";

//INTERNAL INPORT
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  HeroSection,
  WhyVote,
  Blog,
  Provide,
  Vote,
} from "../components/index";

import { VotingDappContext } from "../context/context";
import ChatBot from "../components/Global/ChatBot";

const index = () => {
  const [initialData, setInitialData] = useState();
  const [higest, setHigest] = useState();
  const [loading, setLoading] = useState(false);

  const { HIGHEST_VOTED_CANDIDATE, INITIAL_CONTRACT_DATA } =
    useContext(VotingDappContext);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await HIGHEST_VOTED_CANDIDATE();
      const initialData = await INITIAL_CONTRACT_DATA();

      setHigest(items);
      setInitialData(initialData);
      console.log(items);
      console.log(initialData);
    };

    fetchData().finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <ChatBot />
      <Cursor />
      <Header />
      <HeroSection initialData={initialData} higest={higest} />
      <WhyVote />
      <Provide />
      <Vote />
      <Blog />
      <Footer />
    </>
  );
};

export default index;
