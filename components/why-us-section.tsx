import { motion } from "framer-motion"
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { whyUsReasons } from "../data"

export default function WhyUsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose SoftwareStore?
        </motion.h2>
        <p className="text-xl text-gray-600 text-center mb-12">
          Discover the advantages that make us the preferred choice for software solutions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {whyUsReasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start space-x-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                <h3 className="text-xl font-semibold">{reason.title}</h3>
              </div>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105">
            Start Shopping Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

