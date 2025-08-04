'use server'

import { supabaseServer } from '@/lib/supabase/server'
import { formatRecommendationsAsHTML } from '@/lib/email-formatter'
import type { CalculatorResult } from '@/lib/calculator'

export type SaveEmailReportResult = {
  success: boolean
  message: string
  reportId?: number
}

export async function saveEmailReport(
  email: string, 
  result: CalculatorResult
): Promise<SaveEmailReportResult> {
  try {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address'
      }
    }

    // Generate HTML content
    const htmlContent = formatRecommendationsAsHTML(result, email)

    // Insert into LLM-calc-report table (using the exact table structure from Supabase)
    const { data, error } = await supabaseServer
      .from('LLM-calc-report')
      .insert({
        email: email.toLowerCase().trim(),
        html_string: htmlContent
      })
      .select('id')
      .single()

    if (error) {
      console.error('Error saving email report:', error)
      return {
        success: false,
        message: 'Failed to save report. Please try again.'
      }
    }

    return {
      success: true,
      message: 'Report saved! You should receive an email shortly.',
      reportId: data.id
    }

  } catch (error) {
    console.error('Unexpected error saving email report:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again.'
    }
  }
}