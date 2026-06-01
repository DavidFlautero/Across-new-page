import PremiumPage from "@/components/pages/PremiumPage";

export default function ResourcesPage() {
  return (
    <PremiumPage
      eyebrow="Recursos"
      title="Información estratégica para operaciones internacionales."
      description="Recursos, guías, documentación y herramientas para facilitar la toma de decisiones logísticas."
      items={["Guías", "Documentación", "Preguntas frecuentes"]}
    />
  );
}
