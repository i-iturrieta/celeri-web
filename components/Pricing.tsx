import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { PricingCard, Button, Badge } from "@/components/ui";
import {
  plans,
  formatCLP,
  finalPrice,
  PROMO_PERIOD,
} from "@/content/pricing";
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
 *
 * La promoción de septiembre y octubre es texto fijo — no se apaga sola. En
 * noviembre hay que sacarla desde content/pricing.ts.
 */
export default function Pricing() {
  const highlightedIndex = plans.findIndex((p) => p.highlighted);
  const hasPromo = plans.some((p) => p.discountPct);

  return (
    <Container as="section" id="precios" className="py-20">
      <SectionHeading
        title="Cuánto cuesta"
        subtitle="Precios de referencia, en pesos y sin letra chica. El monto final depende de cuántas páginas y cuánto contenido haya; te lo digo antes de empezar, no después."
      />

      {hasPromo && (
        <p className="label-mono mt-8 text-text-accent">
          Promoción · solo por {PROMO_PERIOD}
        </p>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {plans.map((plan, i) => {
          const discounted = Boolean(plan.discountPct);
          return (
            <PricingCard
              key={plan.slug}
              name={plan.name}
              price={formatCLP(finalPrice(plan))}
              originalPrice={
                discounted ? formatCLP(plan.basePrice) : undefined
              }
              badge={
                discounted ? (
                  <Badge variant="accent">−{plan.discountPct}%</Badge>
                ) : undefined
              }
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
          );
        })}
      </div>

      <p className="mt-8 max-w-[58ch] text-small text-text-secondary">
        Todos los planes son pago único: no hay mensualidad ni permanencia. El
        dominio y el hosting del primer año van incluidos.
        {hasPromo && ` Los descuentos corren solo por ${PROMO_PERIOD}.`}
      </p>
    </Container>
  );
}
