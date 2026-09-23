import { tv } from "tailwind-variants";

export const card = tv({
  base: [
    "bg-card text-card-foreground group/card ring-border flex flex-col rounded-xl ring-1",
    "has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0",
    "*:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
  ],
  variants: {
    size: {
      default: "gap-6 py-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export const cardContent = tv({
  base: "px-6",
});
