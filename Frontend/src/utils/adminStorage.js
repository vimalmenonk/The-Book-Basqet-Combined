const ADMIN_TOKEN_KEY = 'bookBasqetAdminToken';
const ADMIN_USER_KEY = 'bookBasqetAdminUser';

export const getAdminToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);

export const getAdminUser = () => {
  const raw = localStorage.getItem(ADMIN_USER_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return {
      name: parsed?.name || parsed?.fullName || '',
      email: parsed?.email || '',
      role: parsed?.role || '',
      expiresAt: parsed?.expiresAt || ''
    };
  } catch {
    localStorage.removeItem(ADMIN_USER_KEY);
    return null;
  }
};

export const setAdminSession = (token, user) => {
  if (token) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
  }
  if (user) {
    localStorage.setItem(
      ADMIN_USER_KEY,
      JSON.stringify({
        name: user?.name || user?.fullName || '',
        email: user?.email || '',
        role: user?.role || '',
        expiresAt: user?.expiresAt || ''
      })
    );
  }
};

export const clearAdminSession = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
};
