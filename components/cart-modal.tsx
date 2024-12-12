"use client"

import { useCart } from './cart-context'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, removeFromCart, clearCart } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log("Proceeding to checkout...")
    // You might want to redirect to a checkout page or open a new modal for the checkout process.
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
        </DialogHeader>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.variant}</p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <Button variant="destructive" size="sm" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center font-bold">
              <p>Total:</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
          <Button onClick={handleCheckout} disabled={cart.length === 0}>Checkout</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

