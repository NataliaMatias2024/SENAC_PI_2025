const API_BASE_URL = 'http://localhost:5295';

export const getAllPrestadoresDeServico = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/PrestadorDeServico`);
    if (!response.ok) {
      const message = `Ocorreu um erro: ${response.status}`;
      throw new Error(message);
    }
    const prestadoresData = await response.json();
    return prestadoresData;
  } catch (error) {
    console.error('Erro ao recuperar prestadores:', error);
    throw error;
  }
};

export const getPrestadorDeServicoById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/PrestadorDeServico/${id}`);
    if (!response.ok) {
      const message = `Ocorreu um erro: ${response.status}`;
      throw new Error(message);
    }
    const prestadorData = await response.json();
    return prestadorData;
  } catch (error) {
    console.error(`Error fetching prestador with ID ${id}:`, error);
    throw error;
  }
};

export const createPrestadorDeServico = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/PrestadorDeServico`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errorMessage = `Erro ao cadastrar usuário: ${response.status}`;
      try {
        const errorText = await response.text();
        if (errorText) {
          try {
            const errorData = JSON.parse(errorText);
            if (errorData && errorData.message) {
              errorMessage += ` - ${errorData.message}`;
            } else {
              errorMessage += ` - ${errorText}`;
            }
          } catch (parseError) {
            errorMessage += ` - ${errorText}`;
          }
        } else {
          errorMessage += ` - ${response.statusText}`;
        }
      } catch (textError) {
        errorMessage += ` - ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    return true;
  } catch (error) {
    console.error('Erro ao enviar dados de cadastro:', error);
    throw error;
  }
};
