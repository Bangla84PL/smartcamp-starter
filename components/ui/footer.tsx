"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/context'
import NewsletterSignup from './newsletter-signup'

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
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
            {/* Main footer content - centered on mobile, left on desktop */}
            <div className="flex flex-col items-center lg:items-start space-y-2 lg:flex-1">
              {/* Newsletter Signup */}
              <div className="w-full lg:max-w-sm">
                <NewsletterSignup />
              </div>

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
                  width={100}
                  height={50}
                  className="h-6 w-auto sm:h-8"
                />
              </Link>
              
              {/* Copyright */}
              <div className="text-center lg:text-left text-xs text-white/70">
                <p>&copy; 2025 <Link 
                    href="https://smartcamp.ai" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors duration-200"
                  >
                    SmartCamp AI
                  </Link>. {t('allRightsReserved')}.</p>
              </div>
            </div>

            {/* Contact Info - right side on desktop, centered on mobile */}
            <div className="flex flex-col items-center lg:items-end space-y-2 text-sm text-white/80">
              {/* Email */}
              <Link
                href="mailto:hello@smartcamp.ai"
                className="flex items-center space-x-2 hover:text-white transition-colors duration-200 group"
              >
                <svg 
                  className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>hello@smartcamp.ai</span>
              </Link>

              {/* Phone */}
              <Link
                href="tel:+48518894156"
                className="flex items-center space-x-2 hover:text-white transition-colors duration-200 group"
              >
                <svg 
                  className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>+48 518 894 156</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}