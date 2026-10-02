import { Component } from 'react';

// Isola falhas de um trecho da árvore: sem isso, um erro em qualquer componente
// (ex.: WebGL indisponível no iOS) desmonta a página inteira e deixa a tela preta.
class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn(`[${this.props.name ?? 'ErrorBoundary'}]`, error);
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children;
  }
}

export default ErrorBoundary;
