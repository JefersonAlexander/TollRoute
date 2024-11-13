import axios from 'axios';
import { API_BASE_URL_ROUTE } from '../config/api';

export const addRoute = async (routeData) => {
    try {
        const response = await axios.post(`${API_BASE_URL_ROUTE}addRoute/`, routeData);
        alert('Ruta creada exitosamente');
        return response.data;
    } catch (error) {
        console.error('Error al agregar nueva ruta:', error);
        alert(error.response?.data?.error || 'Error al agregar ruta');
        return null;
    }
};

export const addToll = async (tollData) => {
    try {
        const response = await axios.post(`${API_BASE_URL_ROUTE}addToll/`, tollData);
        alert('Peaje creado exitosamente');
        return response.data;
    } catch (error) {
        console.error('Error al agregar nuevo peaje:', error);
        alert(error.response?.data?.error || 'Error al agregar peaje');
        return null;
    }
};


// Función para obtener la lista de rutas (listRoutes)
export const listRoutes = async () => {
    const token = localStorage.getItem('accessToken'); // Obtener el token de acceso

    try {
        const response = await axios.get(`${API_BASE_URL_ROUTE}listRoutes/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Enviar el token de autenticación
            },
        });
        return response.data; // Retornar los datos de las rutas
    } catch (error) {
        console.error('Error al obtener las rutas:', error);
        alert(error.response?.data?.error || 'Error al obtener las rutas');
        return null;
    }
};