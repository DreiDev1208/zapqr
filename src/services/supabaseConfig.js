import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dgsopvluskwwstepebkq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRnc29wdmx1c2t3d3N0ZXBlYmtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5MTg5NjIsImV4cCI6MjAxMjQ5NDk2Mn0.R7bWSXm9_XIJuw091ym-7MUEJpWXEE_uJii5zLE3goU'

export const supabase = createClient(supabaseUrl, supabaseKey)