/**
 * Primitivos del design system, portados desde el proyecto de Claude Design.
 *
 * Todo lo de acá se estiliza SOLO con tokens del @theme de globals.css. Si un
 * componente necesita un valor que no existe, el valor se agrega al theme —
 * no al componente.
 */
export { default as Badge } from "./Badge";
export { default as Button } from "./Button";
export { default as Card } from "./Card";
export { default as Checkbox } from "./Checkbox";
export { default as Dialog } from "./Dialog";
export { default as IconButton } from "./IconButton";
export { default as Input } from "./Input";
export { default as PricingCard } from "./PricingCard";
export { default as Radio } from "./Radio";
export { default as Select } from "./Select";
export { default as Switch } from "./Switch";
export { default as Tabs } from "./Tabs";
export { default as Tag } from "./Tag";
export { default as Toast } from "./Toast";
export { default as Tooltip } from "./Tooltip";

export type { BadgeProps } from "./Badge";
export type { ButtonProps } from "./Button";
export type { CardProps } from "./Card";
export type { CheckboxProps } from "./Checkbox";
export type { DialogProps } from "./Dialog";
export type { IconButtonProps } from "./IconButton";
export type { InputProps } from "./Input";
export type { PricingCardProps } from "./PricingCard";
export type { RadioProps } from "./Radio";
export type { SelectOption, SelectProps } from "./Select";
export type { SwitchProps } from "./Switch";
export type { TabItem, TabsProps } from "./Tabs";
export type { TagProps } from "./Tag";
export type { ToastProps } from "./Toast";
export type { TooltipProps } from "./Tooltip";
