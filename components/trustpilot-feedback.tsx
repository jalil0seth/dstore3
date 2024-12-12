"use client"

import { useState } from 'react'
import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"

// This would typically come from an API
const generateReviews = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    author: `User ${i + 1}`,
    rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4 and 5
    comment: `Great experience with the software! It has significantly improved my workflow. ${i % 2 === 0 ? 'Highly recommended!' : 'Will definitely use again.'}`
  }))
}

export default function TrustpilotFeedback() {
  const [reviews, setReviews] = useState(generateReviews(6))
  const [loading, setLoading] = useState(false)

  const loadMoreReviews = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setReviews([...reviews, ...generateReviews(3)])
      setLoading(false)
    }, 1000)
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  return (
    <section className="bg-[#00b67a] py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Customer Feedback</h2>
          <div className="flex justify-center items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${star <= averageRating ? 'text-white fill-current' : 'text-white/30'}`}
                />
              ))}
            </div>
            <span className="ml-2 text-white font-semibold">{averageRating.toFixed(1)} out of 5</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
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
                      className={`h-5 w-5 ${star <= review.rating ? 'text-[#00b67a] fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 font-semibold">{review.rating} out of 5</span>
              </div>
              <p className="text-gray-700 mb-4">"{review.comment}"</p>
              <p className="text-gray-500 font-semibold">{review.author}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button onClick={loadMoreReviews} disabled={loading} variant="secondary">
            {loading ? 'Loading...' : 'Load More Reviews'}
          </Button>
        </div>
      </div>
    </section>
  )
}

