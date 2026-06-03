const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api/v1';

export const apiClient = {
  async get(endpoint) {
    const res = await fetch(`${apiBaseUrl}${endpoint}`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const error = new Error(data.message || 'GET Request failed');
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  },

  async post(endpoint, body, headers = {}) {
    const res = await fetch(`${apiBaseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const error = new Error(data.message || 'POST request failed');
      error.status = res.status;
      error.data = data;
      throw error;
    }
    return data;
  }
};
export { apiBaseUrl };
