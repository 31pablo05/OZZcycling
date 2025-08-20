import { Button } from "@/components/ui/button"

const Category = ({ categories, selectedCategory, setSelectedCategory }) => (
  <div className="flex flex-wrap justify-center gap-3 mb-8">
    {categories.map((category) => (
      <Button
        key={category.id}
        variant={selectedCategory === category.id ? "default" : "outline"}
        onClick={() => setSelectedCategory(category.id)}
        className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
      >
        <span>{category.icon}</span>
        {category.name}
      </Button>
    ))}
  </div>
)

export default Category
