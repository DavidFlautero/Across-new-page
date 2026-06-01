import PremiumPage from "@/components/pages/PremiumPage";

export default function Page() {
  return (
    <PremiumPage
      eyebrow="Special Cargo"
      title="Cargas Especiales con manejo técnico y control operativo."
      description="Diseñamos soluciones para mercancías sobredimensionadas, sensibles, complejas o que requieren condiciones especiales de manipulación."
      items={["Carga sobredimensionada", "Mercancía sensible", "Proyectos especiales", "Gestión de riesgos", "Coordinación técnica", "Control operativo"]}
    />
  );
}
