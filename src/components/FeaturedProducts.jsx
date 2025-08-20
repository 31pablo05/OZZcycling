import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"

const FeaturedProducts = ({ products, favorites, toggleFavorite, addToCart, formatPrice }) => (
  <div className="mb-12">
    <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">⭐ Productos Destacados</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {products
        .filter((p) => p.featured)
        .map((product) => (
          <Card key={product.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="relative h-64 overflow-hidden">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                ⭐ DESTACADO
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
              >
                <Heart
                  className={`w-4 h-4 ${favorites.has(product.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
                />
              </Button>
            </div>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-bold mb-2">{product.name}</CardTitle>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                <Button onClick={() => addToCart(product)} className="bg-blue-600 hover:bg-blue-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Agregar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  </div>
)

export default FeaturedProducts
