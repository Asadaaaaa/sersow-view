"use client";

import { usePathname } from 'next/navigation';

import font from '@/app/font.module.css';

export default function ProjectTitle() {
	const pathname = usePathname();
	const path = pathname.split("/");

	let title = "";

	if (path.length === 2) {
		title = "Untilted Project";
	} else if (path.length === 3) {
		title = "Details Project";
	} else if (path.length === 4) {
		title = "Edit Project";
	}

	return (
		<h1 className={`${font.Satoshi_h5bold} text-white`}>{ title }</h1>
	);
}