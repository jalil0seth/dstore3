import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">SoftwareStore is your one-stop shop for premium software licenses at competitive prices.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-primary">Home</a></li>
              <li><a href="#" className="text-sm hover:text-primary">Products</a></li>
              <li><a href="#" className="text-sm hover:text-primary">About</a></li>
              <li><a href="#" className="text-sm hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm hover:text-primary">FAQs</a></li>
              <li><a href="#" className="text-sm hover:text-primary">Shipping</a></li>
              <li><a href="#" className="text-sm hover:text-primary">Returns</a></li>
              <li><a href="#" className="text-sm hover:text-primary">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-foreground hover:text-primary">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-secondary-foreground hover:text-primary">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center">
          <p className="text-sm">&copy; 2023 SoftwareStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

