import { supabase } from './supabase';
import { sendEmailNotification } from './emailService';

export type ContactRequest = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
};

export async function submitContactRequest(contactData: ContactRequest): Promise<{
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}> {
  try {
    // Store the contact request locally in localStorage as a fallback
    const storedRequests = JSON.parse(localStorage.getItem('contactRequests') || '[]');
    const newRequest = {
      ...contactData,
      created_at: new Date().toISOString()
    };
    
    storedRequests.push(newRequest);
    localStorage.setItem('contactRequests', JSON.stringify(storedRequests));
    
    console.log('Contact request stored locally:', contactData);
    
    // Send email notification
    await sendEmailNotification({
      to: 'leo@mastellagroup.com',
      subject: `New Contact Request: ${contactData.interest}`,
      body: `
New contact request from the website:

Name: ${contactData.name}
Company: ${contactData.company}
Email: ${contactData.email}
Phone: ${contactData.phone || 'Not provided'}
Interest: ${contactData.interest}
Message:
${contactData.message}

Date: ${new Date().toLocaleString()}
      `
    });
    
    // Try to store in Supabase if possible
    if (supabase) {
      try {
        console.log('Attempting to save contact request to Supabase');
        
        const { data, error } = await supabase
          .from('contact_requests')
          .insert({
            name: contactData.name,
            company: contactData.company,
            email: contactData.email,
            phone: contactData.phone || null,
            interest: contactData.interest,
            message: contactData.message
          });
          
        if (error) {
          console.warn('Could not store contact request in Supabase, using local storage instead:', error);
          return {
            success: true,
            message: 'Your request was submitted successfully, but there was an issue with our database. We will still contact you shortly.',
            error
          };
        } else {
          console.log('Contact request stored in Supabase successfully');
          return {
            success: true,
            message: 'Your request was submitted successfully. We will contact you shortly.',
            data
          };
        }
      } catch (supabaseError) {
        console.warn('Supabase connection failed, using local storage instead:', supabaseError);
        return {
          success: true,
          message: 'Your request was submitted successfully, but there was an issue with our database. We will still contact you shortly.',
          error: supabaseError
        };
      }
    } else {
      console.warn('Supabase not configured. Contact request stored locally only.');
      return {
        success: true,
        message: 'Your request was submitted successfully. We will contact you shortly.',
      };
    }
  } catch (err) {
    console.error('Error in submitContactRequest:', err);
    return {
      success: false,
      message: 'There was an error submitting your request. Please try again later.',
      error: err
    };
  }
}

// Function to get all locally stored contact requests
export function getLocalContactRequests() {
  return JSON.parse(localStorage.getItem('contactRequests') || '[]');
}