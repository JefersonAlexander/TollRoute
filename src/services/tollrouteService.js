import axios from 'axios';
import { API_BASE_URL_ROUTE } from '../config/api';

export const addRoute = async (routeData) => {
    try {
        const response = await axios.post(`${API_BASE_URL_ROUTE}CreateRoute/`, routeData);
        alert('Ruta creada exitosamente');
        return response.data;
    } catch (error) {
        console.error('Error al agregar nueva ruta:', error);
        alert(error.response?.data?.error || error.message || 'Error al agregar ruta');
        return null;
    }
};


// Función para agregar 
export const addToll = async (tollData) => {
    try {
        const response = await axios.post(`${API_BASE_URL_ROUTE}CreateToll/`, tollData);
        alert('Peaje creado exitosamente');
        return response.data;
    } catch (error) {
        console.error('Error al agregar nuevo peaje:', error);
        alert(error.response?.data?.error || 'Error al agregar peaje');
        return null;
    }
};

// Función para agregar los precios de los peajes
export const addRate = async (tollData) => {
    try {
        const response = await axios.post(`${API_BASE_URL_ROUTE}CreateRate/`, tollData);
        alert('Precias de peaje creados ');
        return response.data;
    } catch (error) {
        console.error('Error al agregar los precios:', error);
        alert(error.response?.data?.error || 'Error al agregar los precios');
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











export const getRoutesByCities = async (originCity, destinationCity) => {
    const token = localStorage.getItem('accessToken');

    try {
        // Solicitar las rutas filtradas por ciudad de origen y destino
        const response = await axios.get(`${API_BASE_URL_ROUTE}listRoutes/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                origin_city: originCity,
                destination_city: destinationCity,
            },
        });

        // Si no se encuentran rutas, devolver un array vacío
        if (response.data.length === 0) {
            alert('No se encontraron rutas con las ciudades seleccionadas.');
            return [];
        }

        return response.data; // Devuelve las rutas encontradas
    } catch (error) {
        console.error('Error al obtener las rutas filtradas:', error);
        alert('Error al obtener las rutas. Verifique la conexión y los filtros seleccionados.');
        return [];
    }
};




export const filterTolls = async (filters) => {
    const token = localStorage.getItem('accessToken'); // Obtener el token de autenticación

    try {
        // Obtener las rutas filtradas con las ciudades de origen y destino
        const routes = await getRoutesByCities(filters.originCity, filters.destinationCity);

        // Si no se encuentran rutas, retornar null
        if (routes.length === 0) {
            return null;
        }

        // Crear el array de ids de las rutas encontradas
        const routeIds = routes.map(route => route.id);

        // Ahora filtrar los peajes basados en las rutas obtenidas
        const response = await axios.get(`${API_BASE_URL_ROUTE}filterTolls/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                route_ids: routeIds, // Usar los ids de las rutas filtradas
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error al obtener los peajes filtrados:', error);
        if (error.response?.status === 404) {
            alert('No se encontraron peajes con las rutas filtradas.');
        } else {
            alert('Error al obtener los peajes. Verifique los filtros y la conexión.');
        }
        return null;
    }
};