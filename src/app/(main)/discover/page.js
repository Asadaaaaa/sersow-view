"use client";

import { useState } from 'react';

import Project from "./Project";
import User from "./User"
import Header from '@/components/main/header/Header';
import BgGradient from "@/components/main/BgGradient";
import { ContentFilter } from '@/components/main/discover/Context';
import styles from '@/components/main/settings/settings.module.css';


export default function Discover() {
  const [contentFilter, setContentFilter] = useState(0);

  return (
    <ContentFilter.Provider value={{ contentFilter, setContentFilter }} >
      <Header />
      <div className="w-full relative h-screen">
        <BgGradient />
        <div className={`${styles.settingsContent} w-full max-w-[calc(100vw-376px)] xl:max-w-[1016px] overflow-y-auto h-screen`}>
          {
            contentFilter === 0 ? (
              <Project />
            ) : contentFilter === 1 ? (
              <User />
            ) : null
          }
        </div>
      </div>
    </ContentFilter.Provider>
  );
}
