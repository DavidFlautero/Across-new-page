import PremiumPage from "@/components/pages/PremiumPage";

export default function ContactPage() {
  return (
    <PremiumPage
      eyebrow="Contacto"
      title="Conversemos sobre su próxima operación logística."
      description="Solicite una propuesta o contacte al equipo de Across Logistics para estructurar una solución a la medida."
      items={["Cotización", "Asesoría", "Atención corporativa"]}
    />
  );
}
