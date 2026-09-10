import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";

export const metadata = {
  title: `Work — ${site.name}`,
  description: site.description,
};

export default function WorkPage() {
  return (
    <main className="work-page">
      <h1 className="light-in">Selected work</h1>
      <div className="work-grid">
        {site.work.projects.map((p) => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="work-card">
            <Image
              src={p.image}
              alt={p.title}
              width={1200}
              height={825}
            />
            <h2>{p.title}</h2>
            <p>{p.services.join("  ·  ")}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
