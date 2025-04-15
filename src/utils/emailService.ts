import { supabase } from './supabase';

type EmailData = {
  to: string;
  subject: string;
  body: string;
};

export async function sendEmailNotification(emailData: EmailData): Promise<boolean> {
  try {
    // Store the email data locally in localStorage as a fallback
    const storedEmails = JSON.parse(localStorage.getItem('emailNotifications') || '[]');
    const newEmail = {
      ...emailData,
      sent_at: new Date().toISOString()
    };
    
    storedEmails.push(newEmail);
    localStorage.setItem('emailNotifications', JSON.stringify(storedEmails));
    
    console.log('Email notification stored locally:', emailData);
    
    // In a real production environment, we would use a proper email service
    // like SendGrid, Mailgun, AWS SES, etc.
    
    // Try to store in Supabase if possible
    if (supabase) {
      try {
        console.log('Attempting to save email notification to Supabase:', {
          recipient: emailData.to,
          subject: emailData.subject,
          body_preview: emailData.body.substring(0, 50) + '...'
        });
        
        const { error } = await supabase
          .from('email_notifications')
          .insert({
            recipient: emailData.to,
            subject: emailData.subject,
            body: emailData.body,
            sent_at: new Date().toISOString()
          });
          
        if (error) {
          console.warn('Could not store email in Supabase, using local storage instead:', error);
        } else {
          console.log('Email notification stored in Supabase successfully');
        }
      } catch (supabaseError) {
        console.warn('Supabase connection failed, using local storage instead:', supabaseError);
      }
    } else {
      console.warn('Supabase not configured. Email stored locally only.');
    }
    
    return true;
  } catch (err) {
    console.error('Error in sendEmailNotification:', err);
    return false;
  }
}

// Function to get all locally stored email notifications
export function getLocalEmailNotifications() {
  return JSON.parse(localStorage.getItem('emailNotifications') || '[]');
}