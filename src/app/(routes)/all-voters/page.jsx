"use client";

import { useEffect, useState } from "react";
import {
  Cursor,
  Preloader,
  ScrollToTop,
  Footer,
  Header,
  Team,
} from "@/components";
import { useContract } from "@/hooks/use-contract";

export default function AllVotersPage() {
  const [voters, setVoters] = useState();
  const [loading, setLoading] = useState();
  const { getRegisteredVoters } = useContract();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const items = await getRegisteredVoters();
      setVoters(items);
    };

    fetchData().finally(() => setLoading(false));
  }, []);
  return (
    <>
      {loading && <Preloader />}
      <ScrollToTop />
      <Cursor />
      <Header />
      <Team candidates={voters} path={"voter"} />
      <Footer />
    </>
  );
}
