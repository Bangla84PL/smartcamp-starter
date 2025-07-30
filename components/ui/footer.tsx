"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/context'

export default function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="w-full border-t border-white/20 shadow-md mt-auto" style={{
      backgroundImage: "url('/jungle background.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <div className="bg-black/30 backdrop-blur-sm">
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
            <p>&copy; 2025 SmartCamp AI. {t('allRightsReserved')}.</p>
            <p className="mt-1">
              {t('poweredBy')}{' '}
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
      </div>
    </footer>
  )
}