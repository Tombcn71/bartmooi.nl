import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Artikel } from "../../_paginas/Artikel";
import { meta } from "../../_c/seo";
import { posts } from "../../_content/posts";
import { setTaal } from "../../_i18n";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return posts.some((p) => p.slug === slug) ? meta(`/${slug}/`) : {};
}

export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  setTaal("nl");
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return <Artikel post={post} />;
}
