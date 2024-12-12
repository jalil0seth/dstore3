"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from 'lucide-react'
import Image from "next/image"
import { useCart } from './cart-context'
import { motion } from "framer-motion"
import Link from 'next/link'

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    originalPrice: number
    savings: number
    discount: string
    image: string
    variants: Array<{ name: string, price: number }>
    reviews: Array<{ rating: number; comment: string }>
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
  const { addToCart, setIsCartOpen } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: selectedVariant.price,
      variant: selectedVariant.name,
      image: product.image,
    })
    setIsCartOpen(true)
  }

  const averageRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length

  const calculatePercentageDifference = (originalPrice: number, newPrice: number) => {
    const difference = ((newPrice - originalPrice) / originalPrice) * 100
    return difference.toFixed(0)
  }

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <div className="relative">
            <Badge className="absolute right-0 top-0 bg-red-500">
              Save ${(product.originalPrice - selectedVariant.price).toFixed(2)}
            </Badge>
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-48 object-contain mb-4"
            />
          </div>
          <h4 className="font-bold mb-2 text-lg">{product.name}</h4>
        </Link>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-blue-600">${selectedVariant.price.toFixed(2)}</span>
          <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          <span className="text-red-500 font-semibold">
            {calculatePercentageDifference(product.originalPrice, selectedVariant.price)}% OFF
          </span>
        </div>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-5 w-5 ${star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({product.reviews.length} reviews)</span>
        </div>
        <Select 
          onValueChange={(value) => setSelectedVariant(product.variants.find(v => v.name === value) || product.variants[0])}
          defaultValue={selectedVariant.name}
        >
          <SelectTrigger className="w-full mb-4">
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
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button className="w-full" variant="default" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}

