import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { PricingCard, Button } from "@/components/ui";
import { plans, formatCLP } from "@/content/pricing";
import { waLink } from "@/lib/whatsapp";

/**
 * Los planes.
 *
 * Un solo plan lleva `highlighted`, y eso está forzado acá en vez de quedar
 * librado a los datos: el glow ámbar es la única sombra de color del sistema y
 * si aparece en dos tarjetas deja de señalar nada.
 *
 * Los precios son el piso y se dice: quien lee un número sin contexto asume que
 * es el total y se va cuando descubre que no. Decir "desde" y ofrecer hablar es
 * más honesto y filtra mejor.
 */
export default function Pricing() {
  const highlightedIndex = plans.findIndex((p) => p.highlighted);

  return (
    <Container as="section" id="precios" className="section-tight">
      <SectionHeading
        title="Cuánto cuesta"
        subtitle="Precios de referencia, en pesos y sin letra chica. El monto final depende de cuántas páginas y cuánto contenido haya; te lo digo antes de empezar, no después."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan, i) => (
          <PricingCard
            key={plan.slug}
            name={plan.name}
            price={formatCLP(plan.price)}
            period={plan.period}
            features={plan.features}
            highlighted={i === highlightedIndex}
            cta={
              <Button
                variant={i === highlightedIndex ? "primary" : "outline"}
                size="md"
                className="w-full"
                href={waLink(
                  `Hola Ignacio, me interesa el plan ${plan.name}.`,
                )}
              >
                Conversemos
              </Button>
            }
          />
        ))}
      </div>

      <p className="mt-8 max-w-[58ch] text-small text-text-secondary">
        Todos los planes son pago único: no hay mensualidad ni permanencia, e
        incluyen un mes de ajustes después de publicar. El dominio va a tu
        nombre y lo pagas tú, alrededor de $10.000 al año.
      </p>
    </Container>
  );
}
