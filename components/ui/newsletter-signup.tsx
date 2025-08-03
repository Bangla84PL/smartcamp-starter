"use client"

import { useState } from 'react'
import { useLanguage } from '@/lib/i18n/context'
import { subscribeToNewsletter } from '@/app/actions/newsletter'
import { Button } from '@/components/ui/button'

type ErrorMessageKey = 'subscriptionError' | 'alreadySubscribed' | 'invalidEmail'

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
        let errorKey: ErrorMessageKey = 'subscriptionError'
        if (result.message.includes('already subscribed')) {
          errorKey = 'alreadySubscribed'
        } else if (result.message.includes('valid email')) {
          errorKey = 'invalidEmail'
        }
        setMessage({ type: 'error', text: t(errorKey) })
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
        <Button
          type="submit"
          variant="jungle"
          size="lg"
          disabled={isSubmitting || !email.trim()}
          className="relative"
        >
          {isSubmitting ? t('subscribing') : t('subscribeNewsletter')}
        </Button>
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