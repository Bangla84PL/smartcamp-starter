'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export type NewsletterResult = {
  success: boolean
  message: string
}

export async function subscribeToNewsletter(email: string): Promise<NewsletterResult> {
  try {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      }
    }

    // Check if email already exists in Newsletter-signup table
    const { data: existingSubscription, error: checkError } = await supabaseServer
      .from('Newsletter-signup')
      .select('email')
      .eq('email', email.toLowerCase())
      .eq('source', 'llmcalc')
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing subscription:', checkError)
      return {
        success: false,
        message: 'An error occurred while checking subscription. Please try again.'
      }
    }

    if (existingSubscription) {
      return {
        success: false,
        message: 'This email is already subscribed to our newsletter'
      }
    }

    // Insert new subscription into Newsletter-signup table
    const { error: insertError } = await supabaseServer
      .from('Newsletter-signup')
      .insert({
        email: email.toLowerCase(),
        source: 'llmcalc'
      })

    if (insertError) {
      console.error('Error inserting newsletter subscription:', insertError)
      return {
        success: false,
        message: 'An error occurred while subscribing. Please try again.'
      }
    }

    // Revalidate the current path to refresh any cached data
    revalidatePath('/')

    return {
      success: true,
      message: 'Successfully subscribed to newsletter!'
    }
  } catch (error) {
    console.error('Unexpected error in newsletter subscription:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.'
    }
  }
}