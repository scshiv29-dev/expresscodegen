import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const supabase = createClient(
        'https://knynjdymqqfoqqbbmsvq.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtueW5qZHltcXFmb3FxYmJtc3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI0MTkyMjcsImV4cCI6MTk4Nzk5NTIyN30.g7plIYSn93kt-DSvs1ES0TTLIXVup2j04ftz8C1FKHo'
);