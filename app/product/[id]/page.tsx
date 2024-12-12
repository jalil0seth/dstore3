"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, ArrowLeft, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from '@/components/cart-context'
import { products } from '../../../data'

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const product = products.find(p => p.id.toString() === params.id)
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0])
  const { addToCart, setIsCartOpen } = useCart()

  if (!product) {
    return <div>Product not found</div>
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: selectedVariant?.price || product.price,
      variant: selectedVariant?.name || '',
      image: product.image,
    })
    setIsCartOpen(true)
  }

  const averageRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to products
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">({product.reviews.length} reviews)</span>
            </div>
            <p className="text-lg text-gray-600 mb-6">{product.description}</p>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-blue-600">${(selectedVariant?.price || product.price).toFixed(2)}</span>
              <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              <Badge variant="destructive">{product.discount}</Badge>
            </div>
            <Select onValueChange={(value) => setSelectedVariant(product.variants.find(v => v.name === value))} defaultValue={selectedVariant?.name} className="mb-6">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                {product.variants.map((variant) => (
                  <SelectItem key={variant.name} value={variant.name}>
                    {variant.name} - ${variant.price.toFixed(2)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              size="lg" 
              onClick={handleAddToCart} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </motion.div>
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 font-semibold">{review.rating} out of 5</span>
                </div>
                <p className="text-gray-700 mb-4">"{review.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

