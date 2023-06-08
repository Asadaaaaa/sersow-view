"use client";

import { usePathname } from 'next/navigation';

import PubProTitle from '../publish-project/PubProTitle';
import Searchbar from '@/components/main/header/Searchbar';
import BackButton from '@/components/main/profile/BackButton';
import HomeToggleFilter from '@/components/main/home/ToggleFilter';
import SettingsToggleFilter from '@/components/main/settings/ToggleFilter';
import DiscoverToggleFilter from '@/components/main/discover/ToggleFilter';

export default function HeaderContent({ isLogin }) {
  const pathName = usePathname();
  const rootPageName = pathName.split("/")[1];
  const page = rootPageName.charAt(0).toUpperCase() + rootPageName.slice(1);

  return (
    <div className="flex gap-12 items-center">
      {
        (page === "Home" && isLogin) && (
          <HomeToggleFilter />
        )
      }
      {
        (page === "Profile" || page === "Publish-project") && (
          <BackButton />
        )
      }
      {
        (page === "Settings") && (
          <SettingsToggleFilter />
        )
      }
      {
        (page !== "Settings" && page !== "Publish-project") && (
          <Searchbar />
        )
      }
      {
        (page === "Discover") && (
          <DiscoverToggleFilter />
        )
      }
      {
        (page === "Publish-project") && (
          <PubProTitle />
        )  
      }
    </div>
  );
}