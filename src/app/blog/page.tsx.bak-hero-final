"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import styles from "./Blog.module.css";

type Locale = "es" | "en" | "zh";

type Post = {
  slug: string;
  url: string;
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  category: string;
};

const copy = {
  es: {
    badge: "BLOG",
    title: "Blog Across Logistics",
    description:
      "Actualidad, novedades y conocimiento especializado en logística internacional.",
    latest: "Nuestras Novedades",
    loading: "Cargando artículos...",
    categories: "CATEGORÍAS",
    all: "Todas",
    more: "+ INFO",
    empty: "No hay artículos disponibles para esta categoría.",
    dateLocale: "es",
    categoriesList: [
      "Actualidad",
      "Aduanas",
      "Almacén",
      "Logística de Transporte",
      "Sostenibilidad",
      "Transporte Aéreo",
      "Transporte Marítimo",
      "Transporte terrestre",
    ],
    categoryLabels: {
      Actualidad: "Actualidad",
      Aduanas: "Aduanas",
      Almacén: "Almacén",
      "Logística de Transporte": "Logística de Transporte",
      Sostenibilidad: "Sostenibilidad",
      "Transporte Aéreo": "Transporte Aéreo",
      "Transporte Marítimo": "Transporte Marítimo",
      "Transporte terrestre": "Transporte terrestre",
    },
  },

  en: {
    badge: "BLOG",
    title: "Across Logistics Blog",
    description:
      "News, updates and specialized knowledge in international logistics.",
    latest: "Latest News",
    loading: "Loading articles...",
    categories: "CATEGORIES",
    all: "All",
    more: "+ INFO",
    empty: "No articles available for this category.",
    dateLocale: "en",
    categoriesList: [
      "Actualidad",
      "Aduanas",
      "Almacén",
      "Logística de Transporte",
      "Sostenibilidad",
      "Transporte Aéreo",
      "Transporte Marítimo",
      "Transporte terrestre",
    ],
    categoryLabels: {
      Actualidad: "News",
      Aduanas: "Customs",
      Almacén: "Warehousing",
      "Logística de Transporte": "Transport Logistics",
      Sostenibilidad: "Sustainability",
      "Transporte Aéreo": "Air Freight",
      "Transporte Marítimo": "Ocean Freight",
      "Transporte terrestre": "Road Transport",
    },
  },

  zh: {
    badge: "博客",
    title: "Across Logistics 博客",
    description:
      "国际物流新闻、动态与专业知识。",
    latest: "最新资讯",
    loading: "正在加载文章...",
    categories: "分类",
    all: "全部",
    more: "+ 信息",
    empty: "此分类暂无文章。",
    dateLocale: "zh",
    categoriesList: [
      "Actualidad",
      "Aduanas",
      "Almacén",
      "Logística de Transporte",
      "Sostenibilidad",
      "Transporte Aéreo",
      "Transporte Marítimo",
      "Transporte terrestre",
    ],
    categoryLabels: {
      Actualidad: "新闻",
      Aduanas: "海关",
      Almacén: "仓储",
      "Logística de Transporte": "运输物流",
      Sostenibilidad: "可持续发展",
      "Transporte Aéreo": "空运",
      "Transporte Marítimo": "海运",
      "Transporte terrestre": "陆运",
    },
  },
} as const;

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "es";

  const saved =
    window.localStorage.getItem("locale") ||
    window.localStorage.getItem("across-locale");

  if (saved === "en" || saved === "zh" || saved === "es") return saved;

  const htmlLang = document.documentElement.lang;
  if (htmlLang === "en" || htmlLang === "zh" || htmlLang === "es") return htmlLang;

  return "es";
}

export default function BlogPage() {
  const [locale, setLocale] = useState<Locale>("es");
  const [posts, setPosts] = useState<Post[]>([]);
  const [active, setActive] = useState("Todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateLocale = (event?: Event) => {
      const rawDetail = event instanceof CustomEvent ? event.detail : null;

      const next =
        typeof rawDetail === "string"
          ? rawDetail
          : rawDetail && typeof rawDetail === "object" && "locale" in rawDetail
            ? String((rawDetail as { locale?: unknown }).locale)
            : rawDetail && typeof rawDetail === "object" && "language" in rawDetail
              ? String((rawDetail as { language?: unknown }).language)
              : null;

      if (next === "es" || next === "en" || next === "zh") {
        setLocale(next);
        return;
      }

      setLocale(getInitialLocale());
    };

    updateLocale();

    window.addEventListener("storage", updateLocale);
    window.addEventListener("languagechange", updateLocale);
    window.addEventListener("localechange", updateLocale);
    window.addEventListener("across-language-change", updateLocale);
    window.addEventListener("across-locale-change", updateLocale);

    return () => {
      window.removeEventListener("storage", updateLocale);
      window.removeEventListener("languagechange", updateLocale);
      window.removeEventListener("localechange", updateLocale);
      window.removeEventListener("across-language-change", updateLocale);
      window.removeEventListener("across-locale-change", updateLocale);
    };
  }, []);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/blog-posts?locale=${locale}&limit=24`)
      .then((r) => r.json())
      .then((data) => setPosts(Array.isArray(data.posts) ? data.posts : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [locale]);

  const t = copy[locale];

  const visiblePosts = useMemo(() => {
    const filtered =
      active === "Todas"
        ? posts
        : posts.filter((p) =>
            (p.category || "").toLowerCase().includes(active.toLowerCase())
          );

    return filtered.slice(0, 4);
  }, [posts, active]);

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <Image
          src="/images/recursos1.png"
          alt={t.title}
          fill
          priority
          className={styles.heroImage}
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <span>{t.badge}</span>
          <h1>{t.title}</h1>
          <p>{t.description}</p>
        </div>
      </section>

      <main className={styles.blogWrap}>
        <section className={styles.postsColumn}>
          <div className={styles.titleBlock}>
            <h2>{t.latest}</h2>
            <div />
          </div>

          {loading && <p className={styles.loading}>{t.loading}</p>}

          {!loading && visiblePosts.length === 0 && (
            <p className={styles.loading}>{t.empty}</p>
          )}

          <div className={styles.postsGrid}>
            {visiblePosts.map((post) => (
              <a
                key={post.slug}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.postCard}
              >
                <div className={styles.imageBox}>
                  {post.image && <img src={post.image} alt={post.title} />}
                </div>

                <div className={styles.postBody}>
                  <time>
                    {post.publishedAt
                      ? new Intl.DateTimeFormat(t.dateLocale, {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(post.publishedAt))
                      : ""}
                  </time>

                  <h3>{post.title}</h3>
                  <p>{post.description}</p>

                  <span>{t.more}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <aside className={styles.sidebar}>
          <h3>{t.categories}</h3>

          <button
            type="button"
            className={active === "Todas" ? styles.active : ""}
            onClick={() => setActive("Todas")}
          >
            {t.all}
          </button>

          {t.categoriesList.map((category) => (
            <button
              key={category}
              type="button"
              className={active === category ? styles.active : ""}
              onClick={() => setActive(category)}
            >
              {t.categoryLabels[category]}
            </button>
          ))}
        </aside>
      </main>

      <Footer />
    </div>
  );
}
