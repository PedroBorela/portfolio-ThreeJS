import { useSyncExternalStore } from 'react';

// Roteamento mínimo para as duas páginas do site (/ e /servicos), com a History API.
// O Railway devolve o index.html em qualquer caminho, então os links diretos funcionam.
export const ROUTES = {
  home: '/',
  services: '/servicos',
};

const TITLES = {
  [ROUTES.home]: 'Pedro Borela | Desenvolvimento full-stack, dados e interfaces',
  [ROUTES.services]: 'Serviços | Pedro Borela · Sistemas e landing pages',
};

const listeners = new Set();
const normalize = (path) => (path.length > 1 ? path.replace(/\/+$/, '') : path);
const currentPath = () => normalize(window.location.pathname);

function emit() {
  document.title = TITLES[currentPath()] ?? TITLES[ROUTES.home];
  listeners.forEach((listener) => listener());
}

window.addEventListener('popstate', emit);

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function usePath() {
  return useSyncExternalStore(subscribe, currentPath, () => ROUTES.home);
}

export function navigate(url) {
  window.history.pushState(null, '', url);
  emit();
}

// Caminho conhecido? Os desconhecidos caem na home.
export const resolveRoute = (path) => (Object.values(ROUTES).includes(path) ? path : ROUTES.home);

document.title = TITLES[currentPath()] ?? TITLES[ROUTES.home];
