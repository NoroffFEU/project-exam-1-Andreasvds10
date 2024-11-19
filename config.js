export const API_BASE = 'https://v2.api.noroff.dev';

export const options = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`,
    'X-Noroff-API-Key': 'a003e435-e19d-41f9-b3f7-06a0e22f4922'
  }
};
