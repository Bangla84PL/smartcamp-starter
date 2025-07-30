import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-800/30 bg-gradient-to-r from-green-800 to-green-700 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo on the left */}
          <Link 
            href="https://smartcamp.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          >
            <Image
              src="/SmartCampAIpng.png"
              alt="SmartCamp AI"
              width={160}
              height={80}
              className="h-12 w-auto sm:h-14 md:h-16"
              priority
            />
          </Link>
          
          {/* Navigation or additional content can be added here */}
          <nav className="hidden sm:flex items-center space-x-6">
            {/* Future navigation items */}
          </nav>
        </div>
      </div>
    </header>
  )
}