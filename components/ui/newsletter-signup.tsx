"use client"

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/context'
import { subscribeToNewsletter } from '@/app/actions/newsletter'

export default function NewsletterSignup() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setIsSubmitting(true)
    setMessage(null)

    try {
      const result = await subscribeToNewsletter(email)
      
      if (result.success) {
        setMessage({ type: 'success', text: t('subscriptionSuccess') })
        setEmail('')
      } else {
        // Handle specific error messages
        let errorKey = 'subscriptionError'
        if (result.message.includes('already subscribed')) {
          errorKey = 'alreadySubscribed'
        } else if (result.message.includes('valid email')) {
          errorKey = 'invalidEmail'
        }
        setMessage({ type: 'error', text: t(errorKey as any) })
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setMessage({ type: 'error', text: t('subscriptionError') })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-3">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('newsletterPlaceholder')}
          disabled={isSubmitting}
          className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={isSubmitting || !email.trim()}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600/80 hover:bg-green-600 disabled:bg-gray-600/50 disabled:cursor-not-allowed rounded-md transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          {isSubmitting ? t('subscribing') : t('subscribeNewsletter')}
        </button>
      </form>
      
      {message && (
        <div className={`text-xs px-2 py-1 rounded ${
          message.type === 'success' 
            ? 'bg-green-600/20 text-green-200 border border-green-500/30' 
            : 'bg-red-600/20 text-red-200 border border-red-500/30'
        }`}>
          {message.text}
        </div>
      )}
    </div>
  )
}