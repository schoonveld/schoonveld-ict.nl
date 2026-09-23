import Card from "./Card.astro";
import CardContent from "./CardContent.astro";
import { card, cardContent } from "./variants";
const CardVariants = {
  card,
  cardContent,
};

export { Card, CardContent, CardVariants };

export default {
  Root: Card,
  Content: CardContent,
};
