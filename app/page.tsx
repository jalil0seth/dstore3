"use client"

import { useState, useEffect } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product-card"
import CategoryPills from "@/components/category-pills"
import CartPanel from "@/components/cart-panel"
import { CartProvider, useCart } from "@/components/cart-context"
import Footer from "@/components/footer"
import WhyUsSection from "@/components/why-us-section"
import TrustpilotFeedback from "@/components/trustpilot-feedback"
import { motion } from "framer-motion"
import { products, categories, trustedBrands } from "../data"

export default function Page() {
  return (
    <CartProvider>
      <PageContent />
    </CartProvider>
  )
}

function PageContent() {
  const { cart, isCartOpen, setIsCartOpen } = useCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const [displayedProducts, setDisplayedProducts] = useState(products.slice(0, 8))
  const [loading, setLoading] = useState(false)

const loadMoreProducts = () => {
  setLoading(true)
  // Simulate API call
  setTimeout(() => {
    const newProducts = products.slice(displayedProducts.length, displayedProducts.length + 4)
    setDisplayedProducts([...displayedProducts, ...newProducts])
    setLoading(false)
  }, 1000)
}

  return (
    <div className="min-h-screen flex flex-col hero-gradient">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md">
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <h1 className="text-xl font-semibold">
            SoftwareStore
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-gray-600">Admin Area</Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Sign Out</Button>
            <Button variant="outline" size="icon" onClick={() => setIsCartOpen(true)} className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="text-center py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm mb-8">
              <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Save up to 80% on Premium Software
            </div>
            <h2 className="text-[64px] leading-tight font-semibold mb-6">
              <span className="text-blue-600">Premium Software</span>
              <br />
              <span className="text-gray-900">For Modern Teams</span>
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto mb-8">
              Get instant access to premium software licenses at competitive prices,
              backed by our official partnership guarantees.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                Browse Software
                <span className="ml-2">→</span>
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                Contact Sales
              </Button>
            </div>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              "Official Software Licenses",
              "Instant Digital Delivery",
              "Enterprise Support 24/7",
              "Best Price Guarantee"
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-gray-600">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Brands Section */}
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <div className="brand-card p-8">
            <p className="text-center text-blue-600 mb-8">Trusted by leading companies worldwide</p>
            <div className="flex flex-wrap justify-between items-center">
              {trustedBrands.map((brand) => (
                <span key={brand} className="text-gray-400 font-medium text-lg">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <WhyUsSection />

        {/* Featured Software Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4">
            <motion.h3 
              className="text-4xl font-bold text-center mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Featured Software
            </motion.h3>
            <motion.p 
              className="text-xl text-gray-600 text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Official licenses from leading software providers
            </motion.p>
            
            <CategoryPills categories={categories} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            {displayedProducts.length < products.length && (
      <div className="text-center mt-8">
        <Button onClick={loadMoreProducts} disabled={loading}>
          {loading ? 'Loading...' : 'Load More'}
        </Button>
      </div>
    )}
          </div>
        </section>

        {/* Trustpilot Feedback Section */}
        <TrustpilotFeedback />
      </main>

      <Footer />

      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

