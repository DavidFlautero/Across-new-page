import PremiumPage from "@/components/pages/PremiumPage";

export default function ServicesPage() {
  return (
    <PremiumPage
      eyebrow="Servicios"
      title="Soluciones multimodales para cadenas de suministro globales."
      description="Operaciones aéreas, marítimas, terrestres, almacenamiento, distribución, aduanas y coordinación logística integral."
      items={["Aéreo", "Marítimo", "Terrestre", "Aduanas", "Almacén", "Distribución"]}
    />
  );
}
