import PremiumPage from "@/components/pages/PremiumPage";

export default function PrivateAreaPage() {
  return (
    <PremiumPage
      eyebrow="Área privada"
      title="Acceso corporativo para clientes y operaciones."
      description="Un espacio privado para gestionar solicitudes, documentación, trazabilidad y comunicación operativa con el equipo Across Logistics."
      items={["Clientes corporativos", "Documentos", "Solicitudes"]}
    />
  );
}
