// src/services/authService.js
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const registerUser = async (userData) => {
    try {
      // Hacer la solicitud de registro
      const response = await axios.post(`${API_BASE_URL}register/`, userData);
      return response.data;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return null;
    }
  };

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}login/`, userData);
        const { access, refresh } = response.data;

        // Verificar los tokens
        console.log('Access Token:', access);
        console.log('Refresh Token:', refresh);

        if (!access || !refresh) {
            
            return null;
        }

        // Guardar los tokens en localStorage
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);

        // Obtener los datos del usuario con el token de acceso
        const userResponse = await axios.get(`${API_BASE_URL}user/`, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });

        const user = userResponse.data;
        console.log('Datos del usuario:', user);
        ;
        return user;
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response?.data);
       
        return null;
    }
};

export const getUserData = async () => {
    const token = localStorage.getItem('accessToken');
    console.log('Access Token obtenido de localStorage:', token);

    try {
        const response = await axios.get(`${API_BASE_URL}user/`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener datos del usuario:', error.response?.data);
        return null;
    }
};