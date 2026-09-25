import { useSyncExternalStore } from 'react';

const format = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

// Um único intervalo compartilhado por todos os relógios da página.
let now = format.format(new Date());
const listeners = new Set();
let timer = null;

function subscribe(listener) {
  listeners.add(listener);
  if (!timer) {
    timer = setInterval(() => {
      now = format.format(new Date());
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = () => now;

// Relógio de America/Sao_Paulo: "hms" → HH:MM:SS, "hm" → HH:MM
export function useBrasiliaClock(mode = 'hm') {
  const time = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return mode === 'hms' ? time : time.slice(0, 5);
}
