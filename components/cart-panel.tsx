"use client"

import { useState } from 'react'
import { useCart } from './cart-context'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { X, Minus, Plus, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface CartPanelProps {
  isOpen: boolean
  onClose: () => void
}

type CheckoutStep = 'cart' | 'information' | 'payment'

export default function CartPanel({ isOpen, onClose }: CartPanelProps) {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart')
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', notes: '' })

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value })
  }

  const handleNextStep = () => {
    if (checkoutStep === 'cart') setCheckoutStep('information')
    else if (checkoutStep === 'information') setCheckoutStep('payment')
  }

  const handlePrevStep = () => {
    if (checkoutStep === 'information') setCheckoutStep('cart')
    else if (checkoutStep === 'payment') setCheckoutStep('information')
  }

  const renderCartItems = () => (
    <div className="space-y-4">
      <AnimatePresence>
        {cart.map((item) => (
          <motion.div
            key={`${item.id}-${item.variant}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={50}
              height={50}
              className="rounded-md"
            />
            <div className="flex-grow">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">{item.variant}</p>
              <div className="flex items-center mt-2">
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="mx-2">{item.quantity}</span>
                <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                Remove
              </Button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  const renderInformationForm = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={customerInfo.name} onChange={handleCustomerInfoChange} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={customerInfo.email} onChange={handleCustomerInfoChange} />
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" value={customerInfo.notes} onChange={handleCustomerInfoChange} />
      </div>
    </div>
  )

  return (
    <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-gray-50 shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b bg-white">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            {checkoutStep === 'cart' && 'Your Cart'}
            {checkoutStep === 'information' && 'Customer Information'}
            {checkoutStep === 'payment' && 'Payment'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {checkoutStep === 'cart' && renderCartItems()}
          {checkoutStep === 'information' && renderInformationForm()}
          {checkoutStep === 'payment' && <div>Payment form will be handled in order.js</div>}
        </div>
        <div className="border-t p-4 bg-white">
          <div className="flex justify-between items-center font-bold mb-4">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
          <div className="space-y-2">
            {checkoutStep === 'cart' && (
              <>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleNextStep} disabled={cart.length === 0}>
                  Proceed to Checkout
                </Button>
                <Button className="w-full" variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
              </>
            )}
            {checkoutStep === 'information' && (
              <div className="flex gap-2">
                <Button className="w-full" variant="outline" onClick={handlePrevStep}>
                  Back to Cart
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>
                  Proceed to Payment
                </Button>
              </div>
            )}
            {checkoutStep === 'payment' && (
              <Button className="w-full" variant="outline" onClick={handlePrevStep}>
                Back to Information
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

