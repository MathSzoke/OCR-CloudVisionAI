import axios from 'axios';

const apiUrl = 'https://localhost:44364/';

const postApiData = async (endpoint, file) => {
    const url = `${apiUrl}${endpoint}`;
    
    const formData = new FormData();
    formData.append('file', file);
    try
    {
        const response = await axios.post(url, formData);
        return response.data;
    }
    catch (error)
    {
        throw new Error(error.response.data.error || 'Erro ao fazer a requisição');
    }
};

const getApiData = async (endpoint) =>
{
    const url = `${apiUrl}${endpoint}`;
    const response = await fetch(url);
    return response.json();
};

export {postApiData, getApiData};