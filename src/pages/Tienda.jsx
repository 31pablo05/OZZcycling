"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Star, Heart, Search, Phone, MessageCircle, Plus, Minus, X } from "lucide-react"

const products = [
  // Bicicletas
  {
    id: 1,
    name: "Bicicleta MTB Ozz Trail Pro",
    price: 450000,
    category: "bicicletas",
    image: "/placeholder.svg?height=300&width=300",
    description: "Bicicleta de montaña profesional con suspensión completa",
    inStock: true,
    rating: 4.8,
    featured: true,
  },
  {
    id: 2,
    name: "Bicicleta Urbana Ozz City",
    price: 280000,
    category: "bicicletas",
    image: "/placeholder.svg?height=300&width=300",
    description: "Perfecta para la ciudad, cómoda y elegante",
    inStock: true,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Bicicleta Ruta Ozz Speed",
    price: 520000,
    category: "bicicletas",
    image: "/placeholder.svg?height=300&width=300",
    description: "Bicicleta de ruta para competición y entrenamiento",
    inStock: false,
    rating: 4.9,
  },

  // Indumentaria
  {
    id: 4,
    name: "Jersey Ozz Pro Team",
    price: 45000,
    category: "indumentaria",
    image: "/placeholder.svg?height=300&width=300",
    description: "Jersey profesional con tecnología de secado rápido",
    inStock: true,
    rating: 4.7,
    featured: true,
  },
  {
    id: 5,
    name: "Culotte Ozz Comfort",
    price: 38000,
    category: "indumentaria",
    image: "/placeholder.svg?height=300&width=300",
    description: "Culotte con badana de gel para máximo confort",
    inStock: true,
    rating: 4.8,
  },
  {
    id: 6,
    name: "Casco Ozz Safety Pro",
    price: 85000,
    category: "indumentaria",
    image: "/placeholder.svg?height=300&width=300",
    description: "Casco ultraliviano con certificación internacional",
    inStock: true,
    rating: 4.9,
  },

  // Accesorios
  {
    id: 7,
    name: "Luces LED Ozz Night",
    price: 25000,
    category: "accesorios",
    image: "/placeholder.svg?height=300&width=300",
    description: "Set de luces LED recargables para mayor seguridad",
    inStock: true,
    rating: 4.5,
  },
  {
    id: 8,
    name: "Candado Ozz Security",
    price: 32000,
    category: "accesorios",
    image: "/placeholder.svg?height=300&width=300",
    description: "Candado de alta seguridad con cable de acero",
    inStock: true,
    rating: 4.6,
  },
  {
    id: 9,
    name: "Bomba Ozz Pro Pump",
    price: 18000,
    category: "accesorios",
    image: "/placeholder.svg?height=300&width=300",
    description: "Bomba portátil con manómetro integrado",
    inStock: true,
    rating: 4.7,
  },

  // Lavado
  {
    id: 10,
    name: "Kit Limpieza Ozz Clean",
    price: 22000,
    category: "lavado",
    image: "/placeholder.svg?height=300&width=300",
    description: "Kit completo para limpieza y mantenimiento",
    inStock: true,
    rating: 4.4,
  },
  {
    id: 11,
    name: "Desengrasante Ozz Pro",
    price: 12000,
    category: "lavado",
    image: "/placeholder.svg?height=300&width=300",
    description: "Desengrasante biodegradable de alta efectividad",
    inStock: true,
    rating: 4.5,
  },
  {
    id: 12,
    name: "Lubricante Cadena Ozz",
    price: 8000,
    category: "lavado",
    image: "/placeholder.svg?height=300&width=300",
    description: "Lubricante especial para cadenas y componentes",
    inStock: false,
    rating: 4.6,
  },
]

const categories = [
  { id: "todas", name: "Todas las categorías", icon: "🏪" },
  { id: "bicicletas", name: "Bicicletas", icon: "🚴" },
  { id: "indumentaria", name: "Indumentaria", icon: "👕" },
  { id: "accesorios", name: "Accesorios", icon: "🔧" },
  { id: "lavado", name: "Lavado y Mantenimiento", icon: "🧽" },
]

const Tienda = () => {
  const [selectedCategory, setSelectedCategory] = useState("todas")
  const [cart, setCart] = useState([])
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [favorites, setFavorites] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState("")
  const [checkoutData, setCheckoutData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    paymentMethod: "",
    deliveryType: "",
    address: "",
    city: "",
    province: "",
    notes: "",
  })

  useEffect(() => {
    const savedCart = localStorage.getItem("ozz-cart")
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
    const savedFavorites = localStorage.getItem("ozz-favorites")
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("ozz-cart", JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem("ozz-favorites", JSON.stringify(Array.from(favorites)))
  }, [favorites])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "todas" || product.category === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prevCart, { product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => (item.product.id === productId ? { ...item, quantity: newQuantity } : item)),
      )
    }
  }

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  }

  const getShippingCost = () => {
    if (checkoutData.deliveryType === "pickup") return 0
    if (checkoutData.province === "Buenos Aires") return 5000
    return 8000 // Otras provincias
  }

  const generateWhatsAppMessage = () => {
    const phoneNumber = "5491123456789"

    let message = `🚴 *PEDIDO BICICLETERÍA OZZ* 🚴\n\n`
    message += `👤 *DATOS DEL CLIENTE:*\n`
    message += `Nombre: ${checkoutData.customerName}\n`
    message += `Teléfono: ${checkoutData.customerPhone}\n`
    message += `Email: ${checkoutData.customerEmail}\n\n`

    message += `🛒 *PRODUCTOS:*\n`
    cart.forEach((item) => {
      message += `• ${item.product.name}\n`
      message += `  Cantidad: ${item.quantity}\n`
      message += `  Precio unitario: ${formatPrice(item.product.price)}\n`
      message += `  Subtotal: ${formatPrice(item.product.price * item.quantity)}\n\n`
    })

    message += `💰 *RESUMEN DE PRECIOS:*\n`
    message += `Subtotal productos: ${formatPrice(getCartTotal())}\n`
    message += `Costo de envío: ${formatPrice(getShippingCost())}\n`
    message += `*TOTAL: ${formatPrice(getCartTotal() + getShippingCost())}*\n\n`

    message += `💳 *FORMA DE PAGO:* ${checkoutData.paymentMethod}\n\n`

    if (checkoutData.deliveryType === "pickup") {
      message += `📍 *ENTREGA:* Retiro en tienda\n\n`
    } else {
      message += `🚚 *ENTREGA:* Envío a domicilio\n`
      message += `Dirección: ${checkoutData.address}\n`
      message += `Ciudad: ${checkoutData.city}\n`
      message += `Provincia: ${checkoutData.province}\n\n`
    }

    if (checkoutData.notes) {
      message += `📝 *NOTAS ADICIONALES:*\n${checkoutData.notes}\n\n`
    }

    message += `¡Gracias por elegir Bicicletería Ozz! 🚴‍♂️`

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    setCart([])
    setIsCheckoutOpen(false)
    setShowCart(false)
    setCheckoutData({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      paymentMethod: "",
      deliveryType: "",
      address: "",
      city: "",
      province: "",
      notes: "",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-16 mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              🚴 OZZ Bicicletería Premium
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Descubre nuestra selección de bicicletas y accesorios de alta gama. Calidad premium para ciclistas
              exigentes.
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowCart(!showCart)}
              className="relative px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Carrito ({cart.length})
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-6 h-6 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>
            {cart.length > 0 && (
              <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-green-600 hover:bg-green-700">
                    💳 Checkout - {formatPrice(getCartTotal())}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>🛒 Finalizar Compra</DialogTitle>
                  </DialogHeader>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Resumen del carrito */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Productos en tu carrito:</h3>
                      <div className="space-y-4">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                            <img
                              src={item.product.image || "/placeholder.svg"}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.product.name}</h4>
                              <p className="text-sm text-gray-600">{formatPrice(item.product.price)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Separator className="my-4" />

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>{formatPrice(getCartTotal())}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Envío:</span>
                          <span>{formatPrice(getShippingCost())}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>{formatPrice(getCartTotal() + getShippingCost())}</span>
                        </div>
                      </div>
                    </div>

                    {/* Formulario de checkout */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Datos de contacto:</h3>

                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="name">Nombre completo *</Label>
                          <Input
                            id="name"
                            value={checkoutData.customerName}
                            onChange={(e) => setCheckoutData((prev) => ({ ...prev, customerName: e.target.value }))}
                            placeholder="Tu nombre completo"
                          />
                        </div>

                        <div>
                          <Label htmlFor="phone">Teléfono *</Label>
                          <Input
                            id="phone"
                            value={checkoutData.customerPhone}
                            onChange={(e) => setCheckoutData((prev) => ({ ...prev, customerPhone: e.target.value }))}
                            placeholder="Tu número de teléfono"
                          />
                        </div>

                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={checkoutData.customerEmail}
                            onChange={(e) => setCheckoutData((prev) => ({ ...prev, customerEmail: e.target.value }))}
                            placeholder="tu@email.com"
                          />
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <Label>Forma de pago *</Label>
                        <RadioGroup
                          value={checkoutData.paymentMethod}
                          onValueChange={(value) => setCheckoutData((prev) => ({ ...prev, paymentMethod: value }))}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="transferencia" id="transferencia" />
                            <Label htmlFor="transferencia">Transferencia bancaria</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="debito" id="debito" />
                            <Label htmlFor="debito">Tarjeta de débito</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="credito" id="credito" />
                            <Label htmlFor="credito">Tarjeta de crédito</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="efectivo" id="efectivo" />
                            <Label htmlFor="efectivo">Efectivo (solo retiro en tienda)</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div>
                        <Label>Tipo de entrega *</Label>
                        <RadioGroup
                          value={checkoutData.deliveryType}
                          onValueChange={(value) => setCheckoutData((prev) => ({ ...prev, deliveryType: value }))}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pickup" id="pickup" />
                            <Label htmlFor="pickup">Retiro en tienda (GRATIS)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="delivery" id="delivery" />
                            <Label htmlFor="delivery">Envío a domicilio</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {checkoutData.deliveryType === "delivery" && (
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="address">Dirección *</Label>
                            <Input
                              id="address"
                              value={checkoutData.address}
                              onChange={(e) => setCheckoutData((prev) => ({ ...prev, address: e.target.value }))}
                              placeholder="Calle y número"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="city">Ciudad *</Label>
                              <Input
                                id="city"
                                value={checkoutData.city}
                                onChange={(e) => setCheckoutData((prev) => ({ ...prev, city: e.target.value }))}
                                placeholder="Tu ciudad"
                              />
                            </div>

                            <div>
                              <Label htmlFor="province">Provincia *</Label>
                              <Select
                                value={checkoutData.province}
                                onValueChange={(value) => setCheckoutData((prev) => ({ ...prev, province: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Seleccionar" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                                  <SelectItem value="Córdoba">Córdoba</SelectItem>
                                  <SelectItem value="Santa Fe">Santa Fe</SelectItem>
                                  <SelectItem value="Mendoza">Mendoza</SelectItem>
                                  <SelectItem value="Tucumán">Tucumán</SelectItem>
                                  <SelectItem value="Entre Ríos">Entre Ríos</SelectItem>
                                  <SelectItem value="Salta">Salta</SelectItem>
                                  <SelectItem value="Misiones">Misiones</SelectItem>
                                  <SelectItem value="Chaco">Chaco</SelectItem>
                                  <SelectItem value="Corrientes">Corrientes</SelectItem>
                                  <SelectItem value="Santiago del Estero">Santiago del Estero</SelectItem>
                                  <SelectItem value="San Juan">San Juan</SelectItem>
                                  <SelectItem value="Jujuy">Jujuy</SelectItem>
                                  <SelectItem value="Río Negro">Río Negro</SelectItem>
                                  <SelectItem value="Formosa">Formosa</SelectItem>
                                  <SelectItem value="Neuquén">Neuquén</SelectItem>
                                  <SelectItem value="Chubut">Chubut</SelectItem>
                                  <SelectItem value="San Luis">San Luis</SelectItem>
                                  <SelectItem value="Catamarca">Catamarca</SelectItem>
                                  <SelectItem value="La Rioja">La Rioja</SelectItem>
                                  <SelectItem value="La Pampa">La Pampa</SelectItem>
                                  <SelectItem value="Santa Cruz">Santa Cruz</SelectItem>
                                  <SelectItem value="Tierra del Fuego">Tierra del Fuego</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <Label htmlFor="notes">Notas adicionales</Label>
                        <Textarea
                          id="notes"
                          value={checkoutData.notes}
                          onChange={(e) => setCheckoutData((prev) => ({ ...prev, notes: e.target.value }))}
                          placeholder="Horarios de entrega, referencias, etc."
                          rows={3}
                        />
                      </div>

                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                        onClick={generateWhatsAppMessage}
                        disabled={
                          !checkoutData.customerName ||
                          !checkoutData.customerPhone ||
                          !checkoutData.paymentMethod ||
                          !checkoutData.deliveryType ||
                          (checkoutData.deliveryType === "delivery" &&
                            (!checkoutData.address || !checkoutData.city || !checkoutData.province))
                        }
                      >
                        💬 Enviar Pedido por WhatsApp
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>

        {/* Category Filter */}
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

        {selectedCategory === "todas" && (
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
                          className={`w-4 h-4 ${
                            favorites.has(product.id) ? "text-red-500 fill-current" : "text-gray-600"
                          }`}
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
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-blue-950 mb-2">No hay productos en esta categoría</h3>
            <p className="text-blue-800">Prueba seleccionando otra categoría o vuelve más tarde</p>
          </div>
        )}

        {showCart && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
            <div className="w-full max-w-md bg-white h-full shadow-2xl transform transition-transform duration-300">
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-xl font-bold">🛒 Carrito de Compras</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowCart(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Tu carrito está vacío</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <img
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{item.product.name}</h3>
                            <p className="text-blue-600 font-bold">{formatPrice(item.product.price)}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.product.id, 0)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-bold">{formatPrice(getCartTotal())}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Envío:</span>
                        <span>Calculado en checkout</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
                        <DialogTrigger asChild>
                          <Button className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2">
                            <MessageCircle className="w-5 h-5" />
                            Finalizar Compra
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>🛒 Finalizar Compra</DialogTitle>
                          </DialogHeader>

                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Resumen del carrito */}
                            <div>
                              <h3 className="text-lg font-semibold mb-4">Productos en tu carrito:</h3>
                              <div className="space-y-4">
                                {cart.map((item) => (
                                  <div key={item.product.id} className="flex items-center gap-4 p-4 border rounded-lg">
                                    <img
                                      src={item.product.image || "/placeholder.svg"}
                                      alt={item.product.name}
                                      className="w-16 h-16 object-cover rounded"
                                    />
                                    <div className="flex-1">
                                      <h4 className="font-medium">{item.product.name}</h4>
                                      <p className="text-sm text-gray-600">{formatPrice(item.product.price)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                      >
                                        -
                                      </Button>
                                      <span className="w-8 text-center">{item.quantity}</span>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                      >
                                        +
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <Separator className="my-4" />

                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span>Subtotal:</span>
                                  <span>{formatPrice(getCartTotal())}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Envío:</span>
                                  <span>{formatPrice(getShippingCost())}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                  <span>Total:</span>
                                  <span>{formatPrice(getCartTotal() + getShippingCost())}</span>
                                </div>
                              </div>
                            </div>

                            {/* Formulario de checkout */}
                            <div className="space-y-4">
                              <h3 className="text-lg font-semibold">Datos de contacto:</h3>

                              <div className="grid grid-cols-1 gap-4">
                                <div>
                                  <Label htmlFor="name">Nombre completo *</Label>
                                  <Input
                                    id="name"
                                    value={checkoutData.customerName}
                                    onChange={(e) =>
                                      setCheckoutData((prev) => ({ ...prev, customerName: e.target.value }))
                                    }
                                    placeholder="Tu nombre completo"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor="phone">Teléfono *</Label>
                                  <Input
                                    id="phone"
                                    value={checkoutData.customerPhone}
                                    onChange={(e) =>
                                      setCheckoutData((prev) => ({ ...prev, customerPhone: e.target.value }))
                                    }
                                    placeholder="Tu número de teléfono"
                                  />
                                </div>

                                <div>
                                  <Label htmlFor="email">Email</Label>
                                  <Input
                                    id="email"
                                    type="email"
                                    value={checkoutData.customerEmail}
                                    onChange={(e) =>
                                      setCheckoutData((prev) => ({ ...prev, customerEmail: e.target.value }))
                                    }
                                    placeholder="tu@email.com"
                                  />
                                </div>
                              </div>

                              <Separator />

                              <div>
                                <Label>Forma de pago *</Label>
                                <RadioGroup
                                  value={checkoutData.paymentMethod}
                                  onValueChange={(value) =>
                                    setCheckoutData((prev) => ({ ...prev, paymentMethod: value }))
                                  }
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="transferencia" id="transferencia" />
                                    <Label htmlFor="transferencia">Transferencia bancaria</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="debito" id="debito" />
                                    <Label htmlFor="debito">Tarjeta de débito</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="credito" id="credito" />
                                    <Label htmlFor="credito">Tarjeta de crédito</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="efectivo" id="efectivo" />
                                    <Label htmlFor="efectivo">Efectivo (solo retiro en tienda)</Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              <Separator />

                              <div>
                                <Label>Tipo de entrega *</Label>
                                <RadioGroup
                                  value={checkoutData.deliveryType}
                                  onValueChange={(value) =>
                                    setCheckoutData((prev) => ({ ...prev, deliveryType: value }))
                                  }
                                >
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="pickup" id="pickup" />
                                    <Label htmlFor="pickup">Retiro en tienda (GRATIS)</Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="delivery" id="delivery" />
                                    <Label htmlFor="delivery">Envío a domicilio</Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              {checkoutData.deliveryType === "delivery" && (
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="address">Dirección *</Label>
                                    <Input
                                      id="address"
                                      value={checkoutData.address}
                                      onChange={(e) =>
                                        setCheckoutData((prev) => ({ ...prev, address: e.target.value }))
                                      }
                                      placeholder="Calle y número"
                                    />
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="city">Ciudad *</Label>
                                      <Input
                                        id="city"
                                        value={checkoutData.city}
                                        onChange={(e) => setCheckoutData((prev) => ({ ...prev, city: e.target.value }))}
                                        placeholder="Tu ciudad"
                                      />
                                    </div>

                                    <div>
                                      <Label htmlFor="province">Provincia *</Label>
                                      <Select
                                        value={checkoutData.province}
                                        onValueChange={(value) =>
                                          setCheckoutData((prev) => ({ ...prev, province: value }))
                                        }
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Seleccionar" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="Buenos Aires">Buenos Aires</SelectItem>
                                          <SelectItem value="Córdoba">Córdoba</SelectItem>
                                          <SelectItem value="Santa Fe">Santa Fe</SelectItem>
                                          <SelectItem value="Mendoza">Mendoza</SelectItem>
                                          <SelectItem value="Tucumán">Tucumán</SelectItem>
                                          <SelectItem value="Entre Ríos">Entre Ríos</SelectItem>
                                          <SelectItem value="Salta">Salta</SelectItem>
                                          <SelectItem value="Misiones">Misiones</SelectItem>
                                          <SelectItem value="Chaco">Chaco</SelectItem>
                                          <SelectItem value="Corrientes">Corrientes</SelectItem>
                                          <SelectItem value="Santiago del Estero">Santiago del Estero</SelectItem>
                                          <SelectItem value="San Juan">San Juan</SelectItem>
                                          <SelectItem value="Jujuy">Jujuy</SelectItem>
                                          <SelectItem value="Río Negro">Río Negro</SelectItem>
                                          <SelectItem value="Formosa">Formosa</SelectItem>
                                          <SelectItem value="Neuquén">Neuquén</SelectItem>
                                          <SelectItem value="Chubut">Chubut</SelectItem>
                                          <SelectItem value="San Luis">San Luis</SelectItem>
                                          <SelectItem value="Catamarca">Catamarca</SelectItem>
                                          <SelectItem value="La Rioja">La Rioja</SelectItem>
                                          <SelectItem value="La Pampa">La Pampa</SelectItem>
                                          <SelectItem value="Santa Cruz">Santa Cruz</SelectItem>
                                          <SelectItem value="Tierra del Fuego">Tierra del Fuego</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div>
                                <Label htmlFor="notes">Notas adicionales</Label>
                                <Textarea
                                  id="notes"
                                  value={checkoutData.notes}
                                  onChange={(e) => setCheckoutData((prev) => ({ ...prev, notes: e.target.value }))}
                                  placeholder="Horarios de entrega, referencias, etc."
                                  rows={3}
                                />
                              </div>

                              <Button
                                className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                                onClick={generateWhatsAppMessage}
                                disabled={
                                  !checkoutData.customerName ||
                                  !checkoutData.customerPhone ||
                                  !checkoutData.paymentMethod ||
                                  !checkoutData.deliveryType ||
                                  (checkoutData.deliveryType === "delivery" &&
                                    (!checkoutData.address || !checkoutData.city || !checkoutData.province))
                                }
                              >
                                💬 Enviar Pedido por WhatsApp
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        className="w-full flex items-center gap-2 bg-transparent"
                        onClick={() => {
                          const message = `¡Hola! Me interesa consultar sobre productos de Bicicletería Ozz. ¿Podrían ayudarme?`
                          window.open(`https://wa.me/5491123456789?text=${encodeURIComponent(message)}`, "_blank")
                        }}
                      >
                        <Phone className="w-5 h-5" />
                        Consultar por WhatsApp
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
      </div>

      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-xl font-bold mb-4">¿Necesitas ayuda con tu compra?</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a
              href="https://wa.me/5491123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp: +54 11 2345-6789
            </a>
            <a
              href="tel:+541123456789"
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Teléfono: +54 11 2345-6789
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-semibold text-white">Atención Personalizada</h4>
              <p className="text-sm text-gray-300">Consultanos por WhatsApp las 24hs</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔧</div>
              <h4 className="font-semibold text-white">Servicio Técnico</h4>
              <p className="text-sm text-gray-300">Mantenimiento y reparaciones</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💳</div>
              <h4 className="font-semibold text-white">Financiación</h4>
              <p className="text-sm text-gray-300">Hasta 12 cuotas sin interés</p>
            </div>
          </div>
          <p className="mt-4 text-gray-300 text-sm">Horarios: Lun-Vie 9:00-18:00 | Sáb 9:00-13:00</p>
        </div>
      </div>
    </div>
  )
}

export default Tienda
