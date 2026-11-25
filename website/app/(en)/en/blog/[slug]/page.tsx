import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Artikel } from "../../../../_paginas/Artikel";
import { meta } from "../../../../_c/seo";
import { postsEn } from "../../../../_content/posts-en";
import { setTaal } from "../../../../_i18n";

export function generateStaticParams() {
  return postsEn.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postsEn.find((p) => p.slug === slug);
  return post?.nl ? meta(`/${post.nl}/`, "en") : {};
}

export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  setTaal("en");
  const post = postsEn.find((p) => p.slug === slug);
  if (!post) notFound();
  return <Artikel post={post} />;
}
