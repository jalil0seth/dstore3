"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CategoryPillsProps {
  categories: string[]
}

export default function CategoryPills({ categories }: CategoryPillsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "secondary"}
          onClick={() => setSelectedCategory(category)}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

