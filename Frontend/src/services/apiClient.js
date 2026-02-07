const normalizeBaseUrl = (baseUrl) => (baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl);

export const API_BASE_URL = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL || '/api');

const parsePayload = async (response) => {
  try {
    return await response.json();
  } catch {
    return null;
  }
};

export const apiRequest = async (path, options = {}) => {
  const { token, headers, requiresAuth, ...rest } = options;
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...(headers || {})
  };

  const requestUrl = `${API_BASE_URL}${path}`;
  const method = rest.method || 'GET';

  if (requiresAuth && !token) {
    console.warn(`[api] Missing auth token for ${method} ${requestUrl}`);
    throw new Error('Missing authentication token.');
  }

  if (token) {
    requestHeaders.Authorization = `Bearer ${token}`;
  }

  console.info(`[api] ${method} ${requestUrl}`);

  let response;
  try {
    response = await fetch(requestUrl, {
      ...rest,
      headers: requestHeaders
    });
  } catch (error) {
    console.error(`[api] Network error for ${method} ${requestUrl}. Check CORS or network connectivity.`, error);
    throw error;
  }

  const payload = await parsePayload(response);
  if (!response.ok || payload?.success === false) {
    const message = payload?.message || payload?.title || payload?.error || `Request failed with status ${response.status}`;
    console.error(`[api] ${method} ${requestUrl} failed with status ${response.status}.`, {
      status: response.status,
      message,
      payload
    });
    if (response.status === 401) {
      console.warn(`[api] Unauthorized (401) for ${method} ${requestUrl}. Token may be missing or invalid.`);
    }
    if (response.status === 403) {
      console.warn(`[api] Forbidden (403) for ${method} ${requestUrl}. Check user role/permissions.`);
    }
    if (response.status === 404) {
      console.warn(`[api] Not found (404) for ${method} ${requestUrl}. Check endpoint path.`);
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return payload?.data ?? payload;
};
