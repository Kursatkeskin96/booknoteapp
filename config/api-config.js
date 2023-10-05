
let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost:3000') {
  backendHost = 'http://localhost:3000';
} else if (hostname === 'booknoteapp.vercel.app') {
  backendHost = 'https://booknoteapp.vercel.app';
}

export const host = `${backendHost}`;