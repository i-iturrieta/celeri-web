import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/**
 * El botón del sistema.
 *
 * `primary` es ámbar y es EL llamado a la acción: uno por vista. Si en una
 * pantalla hay dos botones ámbar, ninguno de los dos significa nada — ese es
 * el punto de tener un solo acento.
 *
 * Con `href` renderiza un <a> en vez de un <button>. No es cosmética: lo que
 * navega a otra parte tiene que ser un enlace, o se pierden abrir en pestaña
 * nueva, copiar dirección, y el anuncio correcto en un lector de pantalla. Un
 * <button> dentro de un <a> (o al revés) es HTML inválido.
 *
 * Portado desde components/forms/Button.jsx del design system. El original
 * resolvía el hover con useState, lo que obligaba a marcarlo "use client" solo
 * para cambiar un color de fondo; acá va por `hover:` y el componente sigue
 * siendo Server Component.
 */

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "outline-inverse"
  | "ghost";
type Size = "sm" | "md" | "lg";

type SharedProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children?: ReactNode;
};

type AsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof SharedProps> & {
    href?: undefined;
  };

type AsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof SharedProps> & {
    href: string;
  };

export type ButtonProps = AsButton | AsLink;

const sizes: Record<Size, string> = {
  sm: "gap-1.5 px-3.5 py-2 text-sm",
  md: "gap-2 px-5 py-2.5 text-base",
  lg: "gap-2.5 px-6.5 py-3.5 text-lg",
};

/* El hover es siempre un cambio de color sólido, nunca un fade de opacidad ni
 * un scale: es la regla de interacción del design system. */
const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-surface-accent text-ink-950 hover:bg-surface-accent-hover",
  secondary:
    "border-transparent bg-surface-inverse text-text-on-inverse hover:bg-surface-inverse-raised",
  outline:
    "border-border-default bg-transparent text-text-primary hover:border-text-primary",
  /* El mismo botón sobre las superficies oscuras. Existe porque `outline` usa
   * tinta sobre transparente y ahí desaparece: en el kit del design system el
   * hero lo resolvía pisando el estilo desde afuera, que es justo lo que este
   * sistema no quiere. */
  "outline-inverse":
    "border-border-inverse bg-transparent text-text-on-inverse hover:border-text-on-inverse",
  ghost:
    "border-transparent bg-transparent text-text-primary hover:bg-surface-sunken",
};

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    icon,
    iconPosition = "left",
    children,
    className,
    ...rest
  } = props;

  const classes = cn(
    "focus-ring transition-brand inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border font-semibold whitespace-nowrap",
    "disabled:cursor-not-allowed disabled:opacity-50",
    sizes[size],
    variants[variant],
    className,
  );

  const content = (
    <>
      {icon && iconPosition === "left" ? icon : null}
      {children}
      {icon && iconPosition === "right" ? icon : null}
    </>
  );

  if (rest.href !== undefined) {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
