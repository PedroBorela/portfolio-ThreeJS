// Chrome (CriOS) e app do Google (GSA) no iOS travam a aba com os efeitos completos; o Safari e o
// navegador do Instagram, no mesmo aparelho, não. Só neles o <html> ganha .gpu-lite (ver index.css).
export function needsGpuLite(ua = navigator.userAgent) {
  const ios = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);
  return ios && /\b(CriOS|GSA)\//.test(ua);
}

export function applyGpuLite() {
  if (needsGpuLite()) document.documentElement.classList.add('gpu-lite');
}
