import { Component, type ReactNode, type ErrorInfo } from "react";

interface Props {
	children: ReactNode;
	fallback?: (error: Error) => ReactNode;
}

interface State {
	hasError: boolean;
	error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false, error: null };
	}

	static getDerivedStateFromError(error: Error): State {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, info: ErrorInfo): void {
		console.error("[ErrorBoundary]", error, info.componentStack);
	}

	render(): ReactNode {
		if (this.state.hasError) {
			if (this.props.fallback && this.state.error) {
				return this.props.fallback(this.state.error);
			}

			return (
				<div style={{ padding: "2rem", textAlign: "center" }}>
					<h2>Something went wrong.</h2>
					<p>{this.state.error?.message}</p>
					<button
						onClick={() => this.setState({ hasError: false, error: null })}
					>
						Try again
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}
