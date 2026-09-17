export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {

const token = localStorage.getItem('token');


const headers = {
...options.headers,
'Authorization': `Bearer ${token}`,
};


const response = await fetch(url, { ...options, headers });


if (response.status === 401 || response.status === 403) {
localStorage.removeItem('token');
localStorage.removeItem('user');
window.location.href = '/login'; 
}

return response;
};