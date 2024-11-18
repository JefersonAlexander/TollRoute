import axios from 'axios';
import { API_BASE_URL_ROUTE } from '../config/api';

export const addRoute = async (routeData) => {
    try {
        const response = await axios.post(`${API_BASE_URL_ROUTE}CreateRoute/`, routeData);
        return response.data;
    } catch (error) {
        console.error('Error al agregar nueva ruta:', error);
        return null;
    }
};


// Función para agregar 
export const addToll = async (tollData) => {
    try {
        const response = await axios.post(`${API_BASE_URL_ROUTE}CreateToll/`, tollData);
        return response.data;
    } catch (error) {
        console.error('Error al agregar nuevo peaje:', error);
        return null;
    }
};

// Función para agregar los precios de los peajes
export const addRate = async (tollData) => {
    try {
        const response = await axios.post(`${API_BASE_URL_ROUTE}CreateRate/`, tollData);
        return response.data;
    } catch (error) {
        console.error('Error al agregar los precios:', error);
        return null;
    }
};


// Función para obtener la lista de rutas (listRoutes)
export const listRoutes = async () => {
    const token = localStorage.getItem('accessToken'); // Obtener el token de acceso

    try {
        const response = await axios.get(`${API_BASE_URL_ROUTE}GetRoute/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Enviar el token de autenticación
            },
        });
        return response.data; // Retornar los datos de las rutas
    } catch (error) {
        console.error('Error al obtener las rutas:', error);
        return null;
    }
};


// Función para obtener los peajes
export const listPeajes = async () => {
    const token = localStorage.getItem('accessToken'); // Obtener el token de acceso

    try {
        const response = await axios.get(`${API_BASE_URL_ROUTE}GetToll/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Enviar el token de autenticación
            },
        });
        return response.data; // Retornar los datos de los peajes
    } catch (error) {
        console.error('Error al obtener los peajes:', error);
        return null;
    }
};




export const filterRoutesByCities = async (originCity, destinationCity) => {
    const routes = await listRoutes(); // Obtener todas las rutas
    if (routes) {
        // Filtrar rutas por ciudad de origen y destino
        const filteredRoutes = routes.filter(
            route =>
                route.originCity.toLowerCase() === originCity.toLowerCase() &&
                route.destinationCity.toLowerCase() === destinationCity.toLowerCase()
        );
        return filteredRoutes;
    }
    return [];
};

export const getPeajesForRoute = async (routeId) => {
    const tolls = await listPeajes(); // Obtener todos los peajes
    if (tolls) {
        // Filtrar peajes que pertenecen a la ruta seleccionada
        const filteredTolls = tolls.filter(toll => toll.routeId === routeId);
        return filteredTolls;
    }
    return [];
};

// Función para obtener los precios
export const listRate = async () => {
    const token = localStorage.getItem('accessToken'); // Obtener el token de acceso

    try {
        const response = await axios.get(`${API_BASE_URL_ROUTE}GetRate/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Enviar el token de autenticación
            },
        });
        return response.data; // Retornar los datos de los precios
    } catch (error) {
        console.error('Error al obtener los precios:', error);
        return null;
    }
};


// Función para obtener los municipios
export const listCity = async () => {
    const token = localStorage.getItem('accessToken'); // Obtener el token de acceso

    try {
        const response = await axios.get(`${API_BASE_URL_ROUTE}GetCity/`, {
            headers: {
                Authorization: `Bearer ${token}`, // Enviar el token de autenticación
            },
        });
        return response.data; // Retornar los datos de los municipios
    } catch (error) {
        console.error('Error al obtener los precios:', error);
        return null;
    }
};