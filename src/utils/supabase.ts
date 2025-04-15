import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are available and valid
const hasSupabaseConfig = supabaseUrl && supabaseAnonKey && 
  supabaseUrl.startsWith('https://') && 
  supabaseAnonKey.length > 20;

// Create client only if config is available
export const supabase = hasSupabaseConfig 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

// Log connection status for debugging
if (supabase) {
  console.log('Supabase client initialized with URL:', supabaseUrl);
} else {
  console.warn('Supabase client not initialized. Check your environment variables.');
}

export type ValuationLead = {
  id: string;
  email: string;
  created_at: string;
  last_valuation_at: string | null;
  industry: string | null;
  revenue: number | null;
  ebitda: number | null;
};

export async function saveValuationLead(email: string, valuationData?: {
  industry?: string;
  revenue?: number;
  ebitda?: number;
}) {
  // Store locally first as backup
  const localData = {
    email,
    created_at: new Date().toISOString(),
    last_valuation_at: valuationData ? new Date().toISOString() : null,
    ...valuationData
  };
  
  // Get existing leads or initialize empty array
  const existingLeads = JSON.parse(localStorage.getItem('valuationLeads') || '[]');
  
  // Check if this email already exists
  const existingLeadIndex = existingLeads.findIndex((lead: any) => lead.email === email);
  
  if (existingLeadIndex >= 0) {
    // Update existing lead
    existingLeads[existingLeadIndex] = {
      ...existingLeads[existingLeadIndex],
      last_valuation_at: localData.last_valuation_at,
      ...valuationData
    };
  } else {
    // Add new lead
    existingLeads.push(localData);
  }
  
  // Save to localStorage
  localStorage.setItem('valuationLeads', JSON.stringify(existingLeads));
  
  // If Supabase is not configured, return the local data
  if (!supabase) {
    console.warn('Supabase not configured. Data saved locally only.');
    return localData;
  }
  
  try {
    console.log('Attempting to save to Supabase:', {
      email,
      last_valuation_at: valuationData ? new Date().toISOString() : null,
      ...valuationData
    });
    
    // Prepare the data object for Supabase
    const dataToInsert = {
      email,
      last_valuation_at: valuationData ? new Date().toISOString() : null,
      ...(valuationData?.industry ? { industry: valuationData.industry } : {}),
      ...(valuationData?.revenue ? { revenue: valuationData.revenue } : {}),
      ...(valuationData?.ebitda ? { ebitda: valuationData.ebitda } : {})
    };
    
    // Attempt to save to Supabase
    const { data, error } = await supabase
      .from('valuation_leads')
      .upsert(
        dataToInsert,
        { onConflict: 'email' }
      );

    if (error) {
      console.error('Error saving valuation lead to Supabase:', error);
      // Return local data if Supabase fails
      return localData;
    }

    console.log('Successfully saved to Supabase:', data);
    return data;
  } catch (err) {
    console.error('Failed to connect to Supabase:', err);
    // Return local data if Supabase fails
    return localData;
  }
}

// Function to get all locally stored leads
export function getLocalValuationLeads() {
  return JSON.parse(localStorage.getItem('valuationLeads') || '[]');
}

// Function to test Supabase connection
export async function testSupabaseConnection() {
  if (!supabase) {
    return {
      success: false,
      message: 'Supabase client not initialized. Check your environment variables.'
    };
  }
  
  try {
    // Try a simple query to test the connection
    const { data, error } = await supabase
      .from('valuation_leads')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      return {
        success: false,
        message: `Connection error: ${error.message}`,
        error
      };
    }
    
    return {
      success: true,
      message: 'Successfully connected to Supabase',
      data
    };
  } catch (err: any) {
    return {
      success: false,
      message: `Exception: ${err.message}`,
      error: err
    };
  }
}