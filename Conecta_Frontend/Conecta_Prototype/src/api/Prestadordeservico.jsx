const API_BASE_URL = 'http://localhost:5295';

export const getAllPrestadoresDeServico = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/PrestadorDeServico`);
    if (!response.ok) {
      const message = `An error occurred: ${response.status}`;
      throw new Error(message);
    }
    const prestadoresData = await response.json();
    return prestadoresData;
  } catch (error) {
    console.error('Error fetching prestadores:', error);
    throw error;
  }
};
