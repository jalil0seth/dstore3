"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { products, categories } from '../../../data'

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const category = categories.find(c => c.toLowerCase().replace(/\s+/g, '-') === params.slug)
  const [displayedProducts, setDisplayedProducts] = useState(products.filter(p => p.category === category).slice(0, 8))
  const [loading, setLoading] = useState(false)

  const loadMoreProducts = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      const newProducts = products
        .filter(p => p.category === category)
        .slice(displayedProducts.length, displayedProducts.length + 4)
      setDisplayedProducts([...displayedProducts, ...newProducts])
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return
      loadMoreProducts()
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, displayedProducts])

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button variant="ghost" onClick={() => router.back()} className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all categories
        </Button>
        <motion.h1 
          className="text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {category}
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
        {loading && <p className="text-center mt-8">Loading more products...</p>}
      </main>
    </div>
  )
}

