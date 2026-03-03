import { supabase } from './supabaseClient';

export function getOAuthRedirectUrl() {
  return import.meta.env.VITE_SITE_URL || (window.location.origin + window.location.pathname);
}

export async function signInWithGoogle() {
  const redirectTo = getOAuthRedirectUrl();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

