import PremiumPage from "@/components/pages/PremiumPage";

export default function Page() {
  return (
    <PremiumPage
      eyebrow="Cold Chain"
      title="Carga de Temperatura Controlada para productos sensibles."
      description="Soluciones para mercancías que requieren cadena de frío, monitoreo térmico y cumplimiento durante todo el trayecto."
      items={["Cadena de frío", "Productos sensibles", "Monitoreo térmico", "Control documental", "Trazabilidad", "Operaciones reguladas"]}
    />
  );
}
