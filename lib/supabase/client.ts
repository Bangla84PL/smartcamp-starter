import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      Newsletter: {
        Row: {
          id: number
          email: string
          source: string
          created_at: string
        }
        Insert: {
          id?: number
          email: string
          source: string
          created_at?: string
        }
        Update: {
          id?: number
          email?: string
          source?: string
          created_at?: string
        }
      }
    }
  }
}