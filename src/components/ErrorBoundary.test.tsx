import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ErrorBoundary } from "./ErrorBoundary";

// ─── Helper: component that throws ────────────────────────────────────────────

const BrokenChild = ({ shouldThrow = true }) => {
	if (shouldThrow) throw new Error("Test error message");
	return <p>All good</p>;
};

// Suppress the noisy console.error output that React prints for caught errors
beforeEach(() => vi.spyOn(console, "error").mockImplementation(() => {}));
afterEach(() => vi.restoreAllMocks());

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("ErrorBoundary", () => {
	describe("normal rendering", () => {
		it("renders children when no error is thrown", () => {
			render(
				<ErrorBoundary>
					<p>Safe content</p>
				</ErrorBoundary>,
			);
			expect(screen.getByText("Safe content")).toBeInTheDocument();
		});
	});

	describe("default fallback UI", () => {
		it("shows the default error heading when a child throws", () => {
			render(
				<ErrorBoundary>
					<BrokenChild />
				</ErrorBoundary>,
			);
			expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
		});

		it("displays the thrown error message", () => {
			render(
				<ErrorBoundary>
					<BrokenChild />
				</ErrorBoundary>,
			);
			expect(screen.getByText("Test error message")).toBeInTheDocument();
		});

		it('renders a "Try again" button in the default fallback', () => {
			render(
				<ErrorBoundary>
					<BrokenChild />
				</ErrorBoundary>,
			);
			expect(
				screen.getByRole("button", { name: /try again/i }),
			).toBeInTheDocument();
		});

		it('resets the error state when "Try again" is clicked', () => {
			// Use a mutable flag so we can toggle it before the boundary re-renders
			const throwFlag = { value: true };
			const ToggleChild = () => {
				if (throwFlag.value) throw new Error("Test error message");
				return <p>All good</p>;
			};

			render(
				<ErrorBoundary>
					<ToggleChild />
				</ErrorBoundary>,
			);

			// Stop throwing before the boundary resets so the child renders cleanly
			throwFlag.value = false;
			fireEvent.click(screen.getByRole("button", { name: /try again/i }));

			expect(screen.getByText("All good")).toBeInTheDocument();
		});
	});

	describe("custom fallback prop", () => {
		it("calls the fallback render-prop with the caught error", () => {
			const fallback = vi.fn((err) => <p>Custom: {err.message}</p>);

			render(
				<ErrorBoundary fallback={fallback}>
					<BrokenChild />
				</ErrorBoundary>,
			);

			expect(fallback).toHaveBeenCalledWith(
				expect.objectContaining({ message: "Test error message" }),
			);
			expect(
				screen.getByText("Custom: Test error message"),
			).toBeInTheDocument();
		});

		it("does not render the default heading when a custom fallback is provided", () => {
			render(
				<ErrorBoundary fallback={() => <p>Custom UI</p>}>
					<BrokenChild />
				</ErrorBoundary>,
			);
			expect(
				screen.queryByText("Something went wrong."),
			).not.toBeInTheDocument();
		});
	});

	describe("componentDidCatch logging", () => {
		it("logs the error to console.error", () => {
			render(
				<ErrorBoundary>
					<BrokenChild />
				</ErrorBoundary>,
			);
			expect(console.error).toHaveBeenCalled();
		});
	});
});
