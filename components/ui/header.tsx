"use client"

import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 shadow-md" style={{
      backgroundImage: "url('/jungle background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <div className="bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and taglines on the left */}
          <div className="flex items-center space-x-4">
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
            
            {/* Taglines */}
            <Link 
              href="https://smartcamp.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:block text-white hover:text-emerald-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-1"
            >
              <div className="text-sm font-medium leading-tight">
                <div>AI | Automations | Web Dev</div>
                <div className="text-emerald-300 font-semibold">You are the Future!</div>
              </div>
            </Link>
          </div>
          
          {/* Navigation placeholder - customize for your app */}
          <nav className="flex items-center space-x-4">
            <div className="text-white/80 text-sm">
              Starter Template
            </div>
          </nav>
        </div>
        </div>
      </div>
    </header>
  )
}