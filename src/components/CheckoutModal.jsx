import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"

const CheckoutModal = ({
  open,
  onOpenChange,
  cart,
  checkoutData,
  setCheckoutData,
  updateQuantity,
  getCartTotal,
  getShippingCost,
  formatPrice,
  generateWhatsAppMessage,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogTitle>🛒 Finalizar Compra</DialogTitle>
      <DialogDescription>
        Completá tus datos y elegí la forma de pago y entrega para finalizar tu compra. El pedido se enviará por WhatsApp.
      </DialogDescription>
      <DialogHeader>
        {/* Puedes dejar el resto del contenido del header aquí si lo necesitas, o eliminarlo si no aporta nada visual */}
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
)

export default CheckoutModal
