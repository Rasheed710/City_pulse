export const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.toLowerCase());
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6 && /\d/.test(password);
};
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};