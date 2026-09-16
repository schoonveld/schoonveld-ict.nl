import { tv } from "tailwind-variants";

export const badge = tv({
  base: [
    "starwind-badge inline-flex items-center gap-1.5 rounded-full font-medium whitespace-nowrap",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "transition-all outline-none focus-visible:ring-3",
    "aria-invalid:border-error aria-invalid:focus-visible:ring-error/40",
  ],
  variants: {
    variant: {
      outline: "border-border focus-visible:border-outline focus-visible:ring-outline/50 border",
    },
    size: {
      md: "px-3 py-0.5 text-sm [&_svg:not([class*='size-'])]:size-4",
    },
    isLink: { true: "cursor-pointer", false: "" },
  },
  compoundVariants: [
    { isLink: true, variant: "outline", className: "hover:border-border/80" },
  ],
  defaultVariants: { variant: "outline", size: "md", isLink: false },
});
