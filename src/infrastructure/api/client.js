const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const apiClient = {
  async get(endpoint, customHeaders = {}) {
    const res = await fetch(`${apiBaseUrl}${endpoint}`, {
      headers: { ...getAuthHeaders(), ...customHeaders }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 401) localStorage.removeItem('token');
      const error = new Error(data.message || 'GET Request failed');
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  },

  async post(endpoint, body, customHeaders = {}) {
    const res = await fetch(`${apiBaseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
        ...customHeaders
      },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 401) localStorage.removeItem('token');
      const error = new Error(data.message || 'POST request failed');
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  }
};
export { apiBaseUrl };
