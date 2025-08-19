
export const translateSupabaseError = (message: string): string => {
  if (message.includes('User already registered')) {
    return 'Este e-mail já está cadastrado. Tente fazer login.';
  }
  if (message.includes('Invalid login credentials')) {
    return 'E-mail ou senha inválidos.';
  }
  if (message.includes('Password should be at least 6 characters')) {
    return 'A senha deve ter pelo menos 6 caracteres.';
  }
  if (message.toLowerCase().includes('failed to fetch')) {
    return 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.';
  }
  if (message.includes('You must select an image to upload')) {
    return 'Você deve selecionar uma imagem para enviar.';
  }
   if (message.includes('Unable to validate email address')) {
    return 'O formato do e-mail é inválido.';
  }

  console.warn(`Untranslated Supabase error: ${message}`);
  // Default fallback message
  return 'Ocorreu um erro inesperado. Tente novamente.';
};
