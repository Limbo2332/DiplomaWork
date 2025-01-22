import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: (error: string) => ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  state = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error) {
    this.setState({ errorMessage: error.message });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.state.errorMessage);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;