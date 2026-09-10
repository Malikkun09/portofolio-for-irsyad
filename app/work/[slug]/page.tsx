import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";

export function generateStaticParams() {
  return site.work.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = site.work.projects.find((p) => p.slug === slug);
  if (!project) return { title: site.name };
  return {
    title: `${project.title} — ${site.name}`,
    description: project.summary,
  };
}

export default async function WorkCase({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = site.work.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="case">
      <Link href="/work" className="section-index">
        <span>←</span>
        <span className="section-index-line" />
        <span>All work</span>
      </Link>
      <h1>{project.title}</h1>
      <div className="case-meta">
        <span>{project.year}</span>
        {project.services.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <Image
        className="case-hero"
        src={project.image}
        alt={project.title}
        width={1800}
        height={1012}
      />
      <p className="case-body">{project.summary}</p>
    </main>
  );
}
