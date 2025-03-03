import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lqzuqfonfvgmmdmhicvb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxenVxZm9uZnZnbW1kbWhpY3ZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA5NTU0OTUsImV4cCI6MjA1NjUzMTQ5NX0.1lrZYc72SnYa5baglT_gczsbPrQTz85AsTGo6wa5R6o';

export const supabase = createClient(supabaseUrl, supabaseKey);
