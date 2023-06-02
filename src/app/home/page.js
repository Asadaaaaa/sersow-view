"use client";

import { useState } from "react";

import Main from "./Main";
import Layout from "@/components/main/Layout";
import { ContentFilter } from "@/components/main/home/Context";

export default function Home() {

  const [contentFilter, setContentFilter] = useState(0);

  return (
    <ContentFilter.Provider value={{ contentFilter, setContentFilter }} >
      <Layout isLogin={true} page={"Home"}>
        <Main />
      </Layout>
    </ContentFilter.Provider>
  );
}