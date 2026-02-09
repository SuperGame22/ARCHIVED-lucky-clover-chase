import { motion } from "framer-motion";

const categories = [
  { id: "all", label: "All", icon: "🏌️" },
  { id: "clubs", label: "Clubs", icon: "🏌️" },
  { id: "apparel", label: "Apparel", icon: "👕" },
  { id: "balls", label: "Balls", icon: "⛳" },
  { id: "bags", label: "Bags", icon: "🎒" },
  { id: "accessories", label: "Accessories", icon: "🧢" },
];

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs = ({ activeCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            activeCategory === category.id
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "bg-muted/60 text-muted-foreground hover:bg-muted"
          }`}
        >
          <span className="text-base">{category.icon}</span>
          {category.label}
        </motion.button>
      ))}
    </div>
  );
};

export { categories };
