export const HOST = 'localhost';
export const PROTOCOL = 'http';
export const PORT = '6500';
//export const URL = '/api/'
export const URL = `/projects/api/`;
export const ORIGIN = `http://team.binary-studio.com/projects`;
export const DEFAULT = `${ORIGIN}/resources/default/`;
export const cookieMarker = { credentials: 'same-origin' };
export const jsonHedeaders = {
    headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
    }
};