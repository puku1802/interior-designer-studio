import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jmvcoozlusofzhuauwoi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptdmNvb3psdXNvZnpodWF1d29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMyMzQ2OTAsImV4cCI6MjA5ODgxMDY5MH0.Qq5gifEIHZE-_j1xfQU0kbsgKNRp_JdAXukEXhNR3zs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
