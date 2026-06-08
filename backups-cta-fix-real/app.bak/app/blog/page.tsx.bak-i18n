"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./Blog.module.css";

type Post = {
  slug: string;
  url: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  category: string;
};

const fixedCategories = [
  "Actualidad",
  "Aduanas",
  "Almacén",
  "Logística de Transporte",
  "Sostenibilidad",
  "Transporte Aéreo",
  "Transporte Marítimo",
  "Transporte terrestre",
];

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [active, setActive] = useState("Todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog-posts")
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data.posts) ? data.posts : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const visiblePosts = useMemo(() => {
    const filtered =
      active === "Todas"
        ? posts
        : posts.filter((p) => (p.category || "").toLowerCase().includes(active.toLowerCase()));

    return filtered.slice(0, 4);
  }, [posts, active]);

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image
          src="/images/recursos1.png"
          alt="Blog Across Logistics"
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span>BLOG</span>
          <h1>Blog Across Logistics</h1>
          <p>Actualidad, novedades y conocimiento especializado en logística internacional.</p>
        </div>
      </section>

      <main className={styles.blogWrap}>
        <section className={styles.postsColumn}>
          <div className={styles.titleBlock}>
            <h2>Nuestras Novedades</h2>
            <div />
          </div>

          {loading && <p className={styles.loading}>Cargando artículos...</p>}

          <div className={styles.postsGrid}>
            {visiblePosts.map((post) => (
              <a key={post.slug} href={post.url} target="_blank" rel="noopener noreferrer" className={styles.postCard}>
                <div className={styles.imageBox}>
                  {post.image && <img src={post.image} alt={post.title} />}
                </div>

                <div className={styles.postBody}>
                  <time>
                    {post.publishedAt
                      ? new Intl.DateTimeFormat("es", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(post.publishedAt))
                      : ""}
                  </time>

                  <h3>{post.title}</h3>
                  <p>{post.description}</p>

                  <span>+ INFO</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <aside className={styles.sidebar}>
          <h3>CATEGORÍAS</h3>

          <button
            type="button"
            className={active === "Todas" ? styles.active : ""}
            onClick={() => setActive("Todas")}
          >
            Todas
          </button>

          {fixedCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={active === category ? styles.active : ""}
              onClick={() => setActive(category)}
            >
              {category}
            </button>
          ))}
        </aside>
      </main>

      <Footer />
    </div>
  );
}
