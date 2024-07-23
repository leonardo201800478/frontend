import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'your_supabase_url';
const supabaseKey = 'your_supabase_key';

export const supabase = createClient(supabaseUrl, supabaseKey);
