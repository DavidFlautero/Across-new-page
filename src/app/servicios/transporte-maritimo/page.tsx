import PremiumPage from "@/components/pages/PremiumPage";

export default function Page() {
  return (
    <PremiumPage
      eyebrow="Ocean Freight"
      title="Transporte Marítimo para carga global y operaciones de escala."
      description="Gestionamos operaciones marítimas internacionales para contenedores, carga consolidada y soluciones multimodales."
      items={["FCL", "LCL", "Carga consolidada", "Coordinación portuaria", "Documentación", "Cobertura internacional"]}
    />
  );
}
