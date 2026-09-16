/**
 * Une clases condicionales. Descarta false, null y undefined.
 *
 * No es `clsx`: no resuelve conflictos entre utilidades de Tailwind (si pasás
 * `p-2` y `p-4`, ganan las dos y decide el orden del CSS). Alcanza porque los
 * componentes de `components/ui` reciben `className` para AGREGAR, no para
 * pisar sus propios tokens. Si algún día hace falta pisar, traé
 * `tailwind-merge` — no le agregues casos especiales a esto.
 */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}
