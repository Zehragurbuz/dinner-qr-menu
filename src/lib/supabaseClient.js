import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Supabase URL veya Anon Key bulunamadı. .env dosyanı kontrol et.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)