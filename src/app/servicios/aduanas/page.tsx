import PremiumPage from "@/components/pages/PremiumPage";

export default function Page() {
  return (
    <PremiumPage
      eyebrow="Customs"
      title="Servicios de Aduanas para operaciones internacionales."
      description="Acompañamos la gestión aduanera, documentación, cumplimiento y coordinación necesaria para operaciones de importación y exportación."
      items={["Importación", "Exportación", "Documentación", "Cumplimiento", "Clasificación", "Coordinación aduanera"]}
    />
  );
}
