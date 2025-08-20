import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Heart } from "lucide-react"

const ProductGrid = ({ products, favorites, toggleFavorite, addToCart, formatPrice }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {products.map((product) => (
      <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative overflow-hidden rounded-t-lg">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {!product.inStock && (
              <Badge variant="destructive" className="absolute top-2 left-2">
                Sin Stock
              </Badge>
            )}
            {product.inStock && (
              <Badge variant="secondary" className="absolute top-2 left-2 bg-green-100 text-green-800">
                Disponible
              </Badge>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white"
            >
              <Heart
                className={`w-4 h-4 ${favorites.has(product.id) ? "text-red-500 fill-current" : "text-gray-600"}`}
              />
            </Button>
            {product.rating && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs font-medium">{product.rating}</span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold text-blue-950 mb-2 line-clamp-2">{product.name}</CardTitle>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">{formatPrice(product.price)}</span>
            <Badge variant="outline" className="capitalize">
              {product.category}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            disabled={!product.inStock}
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? "Agregar al Carrito" : "Sin Stock"}
          </Button>
        </CardFooter>
      </Card>
    ))}
  </div>
)

export default ProductGrid
