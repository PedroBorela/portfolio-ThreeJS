// No iPhone/iPad, Safari e Chrome travam a aba com os efeitos completos: as abas dividem o mesmo
// processo de GPU, que já chega ocupado pelas outras. Os navegadores internos do Instagram e do app
// do Google abrem o site num processo limpo e aguentam, então ficam com tudo. Os demais ganham
// .gpu-lite no <html> (ver index.css).
export function needsGpuLite(ua = navigator.userAgent) {
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  return ios && !/\bInstagram\b|\bGSA\//.test(ua);
}

export function applyGpuLite() {
  if (needsGpuLite()) document.documentElement.classList.add('gpu-lite');
}
