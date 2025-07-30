import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full border-t border-green-800/30 bg-gradient-to-r from-green-800 to-green-700 shadow-md mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo */}
          <Link 
            href="https://smartcamp.ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block transition-all duration-300 ease-in-out hover:scale-105 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
          >
            <Image
              src="/SmartCampAIpng.png"
              alt="SmartCamp AI"
              width={120}
              height={60}
              className="h-8 w-auto sm:h-10"
            />
          </Link>
          
          {/* Copyright and additional info */}
          <div className="text-center text-sm text-white/80">
            <p>&copy; 2025 SmartCamp AI. All rights reserved.</p>
            <p className="mt-1">
              Powered by{' '}
              <Link 
                href="https://smartcamp.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                SmartCamp AI
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}