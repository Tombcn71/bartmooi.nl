import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Artikel } from "../../../../_paginas/Artikel";
import { meta } from "../../../../_c/seo";
import { postsPl } from "../../../../_content/posts-pl";
import { setTaal } from "../../../../_i18n";

export function generateStaticParams() {
  return postsPl.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = postsPl.find((p) => p.slug === slug);
  return post?.nl ? meta(`/${post.nl}/`, "pl") : {};
}

export default async function Pagina({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  setTaal("pl");
  const post = postsPl.find((p) => p.slug === slug);
  if (!post) notFound();
  return <Artikel post={post} />;
}
