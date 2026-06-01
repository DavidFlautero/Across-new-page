import PremiumPage from "@/components/pages/PremiumPage";

export default function Page() {
  return (
    <PremiumPage
      eyebrow="Warehouse & Distribution"
      title="Almacén y Distribución para cadenas de suministro modernas."
      description="Gestionamos almacenamiento, inventario, preparación y distribución para operaciones comerciales, industriales y corporativas."
      items={["Almacenamiento", "Inventario", "Picking & packing", "Distribución", "Fulfillment", "Control operativo"]}
    />
  );
}
