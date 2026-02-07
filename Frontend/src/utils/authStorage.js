const TOKEN_STORAGE_KEY = 'bookBasqetJwtToken';
const TOKEN_EXP_STORAGE_KEY = 'bookBasqetJwtTokenExp';
const USER_STORAGE_KEY = 'bookBasqetAuthUser';

export const getStoredToken = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const exp = localStorage.getItem(TOKEN_EXP_STORAGE_KEY);
  if (!token) return null;
  if (exp && new Date(exp) <= new Date()) {
    clearStoredToken();
    return null;
  }
  return token;
};

export const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);
  if (storedUser) {
    try {
      const parsed = JSON.parse(storedUser);
      return {
        name: parsed?.name || parsed?.fullName || '',
        email: parsed?.email || '',
        role: parsed?.role || ''
      };
    } catch {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  const token = getStoredToken();
  if (!token) return null;

  try {
    const base64 = token.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/');
    if (!base64) return null;
    const claims = JSON.parse(atob(base64));

    return {
      name: claims.unique_name || claims.name || '',
      email: claims.email || '',
      role: claims.role || ''
    };
  } catch {
    return null;
  }
};

export const setStoredToken = (token, expiresAt, user = null) => {
  if (!token) return;
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
  localStorage.setItem(TOKEN_EXP_STORAGE_KEY, expiresAt || '');
  if (user) {
    localStorage.setItem(
      USER_STORAGE_KEY,
      JSON.stringify({
        name: user?.name || user?.fullName || '',
        email: user?.email || '',
        role: user?.role || ''
      })
    );
  }
};

export const clearStoredToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXP_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
};
