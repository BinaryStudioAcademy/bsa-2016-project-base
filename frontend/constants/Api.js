export const HOST = 'localhost';
export const PROTOCOL = 'http';
export const PORT = '6500';
export const URL = `${PROTOCOL}://${HOST}:${PORT}/api/`;
export const ORIGIN = `${PROTOCOL}://${HOST}:${PORT}`;

export const cookieMarker = { credentials: 'same-origin' };
export const jsonHedeaders = {
    headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
}