"use client";

import { useState } from "react";

import BgGradient from "@/components/main/BgGradient";

import Main from "./Main";
import Project from "./Project";

import Header from "@/components/main/header/Header";
import { ContentFilter } from "@/components/main/discover/Context";

import styles from "@/components/main/discover/discover.module.css";

export default function Discover() {
  const [contentFilter, setContentFilter] = useState(0);

  return (
    <main>
      <ContentFilter.Provider value={{ contentFilter, setContentFilter }}>
        <Header />

        <div className="w-full relative h-screen">
          <BgGradient />
          <div
            className={`${styles.discoverContent} w-full max-w-[calc(100vw-376px)] xl:max-w-[1016px] overflow-y-auto overflow-x-hidden h-screen`}
          >
            <Project />
          </div>
        </div>
      </ContentFilter.Provider>
    </main>
  );
}
