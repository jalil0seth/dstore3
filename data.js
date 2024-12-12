export const products = [
  {
    id: 1,
    name: "Microsoft Office",
    description: "Boost your productivity with Microsoft Office. Create professional documents, spreadsheets, and presentations.",
    price: 99.00,
    originalPrice: 129.00,
    savings: 30.00,
    discount: "23% OFF",
    image: "/placeholder.svg?height=200&width=200",
    category: "Productivity Software",
    variants: [
      { name: "Basic", price: 99.00 },
      { name: "Professional", price: 149.00 },
      { name: "Enterprise", price: 199.00 }
    ],
    reviews: [
      { rating: 5, comment: "Great suite of tools, essential for any business." },
      { rating: 4, comment: "Very useful, but the learning curve can be steep for some applications." }
    ]
  },
  {
    id: 2,
    name: "Antivirus Software Suite",
    description: "Guard your digital world with Kaspersky Antivirus Software Suite. Protect your devices from malware and cyber threats.",
    price: 49.00,
    originalPrice: 69.00,
    savings: 20.00,
    discount: "29% OFF",
    image: "/placeholder.svg?height=200&width=200",
    category: "Security",
    variants: [
      { name: "Basic", price: 49.00 },
      { name: "Premium", price: 79.00 },
      { name: "Ultimate", price: 99.00 }
    ],
    reviews: [
      { rating: 5, comment: "Excellent protection, doesn't slow down my computer." },
      { rating: 3, comment: "Good features, but occasional false positives." }
    ]
  },
  {
    id: 3,
    name: "Adobe Photoshop",
    description: "Create and enhance your digital artwork, photos, and designs with the industry-standard image editing software.",
    price: 199.00,
    originalPrice: 249.00,
    savings: 50.00,
    discount: "20% OFF",
    image: "/placeholder.svg?height=200&width=200",
    category: "Design & Photography",
    variants: [
      { name: "Basic", price: 199.00 },
      { name: "Pro", price: 299.00 },
      { name: "Extended", price: 399.00 }
    ],
    reviews: [
      { rating: 5, comment: "The industry standard for a reason. Incredible tool." },
      { rating: 4, comment: "Powerful, but can be overwhelming for beginners." }
    ]
  },
  {
    id: 4,
    name: "Windows 10",
    description: "Upgrade your operating system to Windows 10 for enhanced performance, security, and productivity features.",
    price: 99.00,
    originalPrice: 129.00,
    savings: 30.00,
    discount: "23% OFF",
    image: "/placeholder.svg?height=200&width=200",
    category: "Operating System",
    variants: [
      { name: "Home", price: 99.00 },
      { name: "Pro", price: 149.00 },
      { name: "Enterprise", price: 199.00 }
    ],
    reviews: [
      { rating: 4, comment: "Solid OS with regular updates and improvements." },
      { rating: 5, comment: "Much better than previous versions, very user-friendly." }
    ]
  }
]

export const categories = [
  "All",
  "Productivity Software",
  "Security",
  "Design & Photography",
  "Operating System"
]

export const whyUsReasons = [
  {
    title: "Extensive Software Catalog",
    description: "Access a wide range of premium software solutions for every business need."
  },
  {
    title: "Competitive Pricing",
    description: "Get the best deals with our price-match guarantee and exclusive discounts."
  },
  {
    title: "24/7 Customer Support",
    description: "Our expert team is always available to assist you with any questions or issues."
  },
  {
    title: "Secure Transactions",
    description: "Shop with confidence using our encrypted and protected payment systems."
  },
  {
    title: "Instant Digital Delivery",
    description: "Download your software immediately after purchase, no waiting required."
  },
  {
    title: "Money-back Guarantee",
    description: "Try our software risk-free with our 30-day money-back guarantee."
  }
]

export const trustedBrands = [
  "Autodesk",
  "Kaspersky",
  "Miro",
  "LinkedIn",
  "Atlassian",
  "Salesforce",
  "Adobe",
  "Microsoft",
  "VMware"
]

