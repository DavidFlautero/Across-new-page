export type Locale = "es" | "en" | "zh";

export const locales: Record<Locale, { label: string; short: string; flag: string }> = {
  es: { label: "Castellano", short: "ES", flag: "🇪🇸" },
  en: { label: "English", short: "EN", flag: "🇬🇧" },
  zh: { label: "简体中文", short: "中文", flag: "🇨🇳" },
};

export const acrossCopy = {
  es: {
    nav: {
      tracking: "TRACKING",
      private: "ÁREA PRIVADA",
      home: "Home",
      services: "Servicios",
      sectors: "Sectores",
      company: "Empresa",
      resources: "Recursos",
      contact: "Contacto",
      who: "Quiénes Somos",
      offices: "Nuestras Oficinas",
      sustainability: "Sostenibilidad",
      complaints: "Quejas y denuncias",
      careers: "Trabaja con Nosotros",
    },
  },
  en: {
    nav: {
      tracking: "TRACKING",
      private: "PRIVATE AREA",
      home: "Home",
      services: "Services",
      sectors: "Sectors",
      company: "Company",
      resources: "Resources",
      contact: "Contact",
      who: "About us",
      offices: "Our offices",
      sustainability: "Sustainability",
      complaints: "Complaints",
      careers: "Work with us",
    },
  },
  zh: {
    nav: {
      tracking: "货物追踪",
      private: "私人专区",
      home: "首页",
      services: "服务",
      sectors: "行业",
      company: "公司",
      resources: "资源",
      contact: "联系",
      who: "关于我们",
      offices: "我们的办公室",
      sustainability: "可持续发展",
      complaints: "投诉与举报",
      careers: "加入我们",
    },
  },
} as const;
