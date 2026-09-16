import { tv } from "tailwind-variants";

export const button = tv({
  base: [
    "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "transition-all outline-none focus-visible:ring-3",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-error aria-invalid:focus-visible:ring-error/40",
  ],
  variants: {
    variant: {
      primary:
        "bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary/50",
      outline:
        "dark:border-input focus-visible:ring-outline/50 bg-background dark:bg-input/30 focus-visible:border-outline hover:bg-muted dark:hover:bg-input/50 hover:text-foreground border shadow-xs",
    },
    size: {
      sm: "h-9 px-4 text-sm has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-11 px-5 text-base has-[>svg]:px-4 [&_svg:not([class*='size-'])]:size-4.5",
      lg: "h-12 px-8 text-lg has-[>svg]:px-6 [&_svg:not([class*='size-'])]:size-5",
    },
  },
  defaultVariants: { variant: "primary", size: "md" },
});
