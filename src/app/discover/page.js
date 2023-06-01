"use client";

import { useState } from "react";

import Main from "./Main";
import Layout from "@/components/main/Layout";
import { ContentFilter } from "@/components/main/discover/Context";

export default function Discover() {

  const [contentFilter, setContentFilter] = useState(0);

  return (
    <ContentFilter.Provider value={{ contentFilter, setContentFilter }} >
      <Layout isLogin={true} page={"Discover"}>
        <Main />
      </Layout>
    </ContentFilter.Provider>
  );
}