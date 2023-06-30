"use client";

import { usePathname } from 'next/navigation';

import font from '@/app/font.module.css';

export default function ProjectTitle() {
	const pathname = usePathname();
	const path = pathname.split("/");

	return (
		<h1 className={`${font.Satoshi_h5bold} text-white`}>{ path.length === 3 ? "Details Project" : "Untilted Project" }</h1>
	);
}