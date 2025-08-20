import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, X, MessageCircle, Phone } from "lucide-react"
import { DialogTrigger } from "@/components/ui/dialog"
import CheckoutModal from "./CheckoutModal"

const CartSidebar = ({
  showCart,
  setShowCart,
  cart,
  updateQuantity,
  formatPrice,
  getCartTotal,
  isCheckoutOpen,
  setIsCheckoutOpen,
  getShippingCost,
  checkoutData,
  setCheckoutData,
  generateWhatsAppMessage,
}) => (
  showCart && (
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
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  onClick={() => setIsCheckoutOpen(true)}
                >
                  <MessageCircle className="w-5 h-5" />
                  Finalizar Compra
                </Button>
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
  )
)

export default CartSidebar
