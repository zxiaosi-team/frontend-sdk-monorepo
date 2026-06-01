const request = async (url: string, options: RequestInit = {}) => {
  const { method, headers, ...rest } = options;

  try {
    const response = await fetch(url, {
      ...rest,
      method,
      headers: { 'Content-Type': 'application/json', ...headers },
    });

    return await response.json();
  } catch (error) {
    console.error('Request failed:', url, error);
    return Promise.reject(error);
  }
};

export default request;
