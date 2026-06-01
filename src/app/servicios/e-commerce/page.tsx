import PremiumPage from "@/components/pages/PremiumPage";

export default function Page() {
  return (
    <PremiumPage
      eyebrow="e-Commerce"
      title="Logística e-Commerce para marcas que necesitan escalar."
      description="Soluciones para fulfillment, almacenamiento, distribución y entregas orientadas a operaciones digitales y retail."
      items={["Fulfillment", "Almacenamiento", "Distribución", "Preparación de pedidos", "Última milla", "Escalamiento operativo"]}
    />
  );
}
