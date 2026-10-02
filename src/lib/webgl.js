// O three r175 só renderiza com WebGL2. Testa antes de baixar o chunk da bolha 3D
// e libera o contexto de teste na hora (o iOS limita quantos contextos ficam vivos).
export function supportsWebGL2() {
  try {
    const gl = document.createElement('canvas').getContext('webgl2');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}
