import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Artikel } from "../../../../_paginas/Artikel";
import { meta } from "../../../../_c/seo";
import { postsDe } from "../../../../_content/posts-de";
import { setTaal } from "../../../../_i18n";

export function generateStaticParams() {
  return postsDe.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postsDe.find((p) => p.slug === slug);
  return post?.nl ? meta(`/${post.nl}/`, "de") : {};
}

export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  setTaal("de");
  const post = postsDe.find((p) => p.slug === slug);
  if (!post) notFound();
  return <Artikel post={post} />;
}
