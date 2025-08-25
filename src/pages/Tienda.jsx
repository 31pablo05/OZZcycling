"use client"

import { useState, useEffect, useRef } from "react"
// Carrusel de videos verticales para el local
function VideoCarousel() {
  const videos = [
    "/OZZvideos/ozzlocal.mp4",
    "/OZZvideos/local.mp4",
    "/OZZvideos/cascos1.mp4"
  ];
  const [current, setCurrent] = useState(0);
  const videoRef = useRef(null);

  const next = () => setCurrent((prev) => (prev + 1) % videos.length);
  const prev = () => setCurrent((prev) => (prev - 1 + videos.length) % videos.length);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play();
    }
  }, [current]);

  return (
    <div className="relative w-[360px] h-[640px] md:w-[400px] md:h-[720px] flex items-center justify-center">
      <video
        ref={videoRef}
        src={videos[current]}
        width={720}
        height={1280}
        controls
        autoPlay
        loop
        muted
        playsInline
        className="rounded-2xl shadow-2xl border-4 border-white/20 object-cover w-full h-full bg-black"
        style={{ aspectRatio: '9/16', background: '#000' }}
      />
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition"
        aria-label="Anterior"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition"
        aria-label="Siguiente"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {videos.map((_, idx) => (
          <span key={idx} className={`w-3 h-3 rounded-full ${idx === current ? 'bg-blue-500' : 'bg-white/30'} border border-white/40 transition`}></span>
        ))}
      </div>
    </div>
  );
}
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import products from "../components/productsData"
import Category from "../components/Category"
import ProductGrid from "../components/ProductGrid"
import EmptyState from "../components/EmptyState"
import FeaturedProducts from "../components/FeaturedProducts"
import CheckoutModal from "../components/CheckoutModal"
import CartSidebar from "../components/CartSidebar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Star, Heart, Search, Phone, MessageCircle, Plus, Minus, X } from "lucide-react"
import FooterInfo from "../components/footerInfo"

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
    <div className="mt-32 min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Carrusel de Videos del Local */}
      <div className="relative w-full flex items-center justify-center bg-black py-8">
        <VideoCarousel />
      </div>
{/* Agrega margen superior para evitar que la navbar lo tape */}
      <div className="px-6 py-8 mx-auto max-w-7xl mt-24">
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
              <CheckoutModal
                open={isCheckoutOpen}
                onOpenChange={setIsCheckoutOpen}
                cart={cart}
                checkoutData={checkoutData}
                setCheckoutData={setCheckoutData}
                updateQuantity={updateQuantity}
                getCartTotal={getCartTotal}
                getShippingCost={getShippingCost}
                formatPrice={formatPrice}
                generateWhatsAppMessage={generateWhatsAppMessage}
              />
            )}
          </div>
        </div>
{/* Category Filter */}
        <Category
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {selectedCategory === "todas" && (
          <FeaturedProducts
            products={products}
            favorites={favorites}
            toggleFavorite={toggleFavorite}
            addToCart={addToCart}
            formatPrice={formatPrice}
          />
        )}
{/* Products Grid */}
        <ProductGrid
          products={filteredProducts}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          addToCart={addToCart}
          formatPrice={formatPrice}
        />
{/* Empty State */}
  {filteredProducts.length === 0 && <EmptyState />}

        <CartSidebar
          showCart={showCart}
          setShowCart={setShowCart}
          cart={cart}
          updateQuantity={updateQuantity}
          formatPrice={formatPrice}
          getCartTotal={getCartTotal}
          isCheckoutOpen={isCheckoutOpen}
          setIsCheckoutOpen={setIsCheckoutOpen}
          getShippingCost={getShippingCost}
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
          generateWhatsAppMessage={generateWhatsAppMessage}
        />
{/* Footer Info */}
        <FooterInfo />
      </div>
    </div>
  )
}

export default Tienda
