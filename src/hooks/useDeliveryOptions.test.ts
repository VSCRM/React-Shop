/**
 * Tests for the `useDeliveryOptions` hook.
 *
 * Coverage:
 * a) Valid API data is parsed and returned correctly.
 * b) Malformed API responses (caught by DeliveryOptionListSchema) surface an error.
 * c) Loading / error state transitions.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useDeliveryOptions } from "./useDeliveryOptions";

vi.mock("@/services/api", () => ({
	default: { get: vi.fn() },
}));

import api from "@/services/api";

/** Valid delivery options — all pass DeliveryOptionSchema. */
const VALID_OPTIONS = [
	{ id: "1", priceCents: 0, estimatedDeliveryTimeMs: 1_716_000_000_000 },
	{ id: "2", priceCents: 499, estimatedDeliveryTimeMs: 1_715_000_000_000 },
	{ id: "3", priceCents: 999, estimatedDeliveryTimeMs: 1_714_000_000_000 },
];

beforeEach(() => vi.clearAllMocks());

describe("useDeliveryOptions", () => {
	// ── a) Valid data ──────────────────────────────────────────────────────────

	describe("successful fetch with valid data", () => {
		it("returns delivery options after load", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: VALID_OPTIONS });
			const { result } = renderHook(() => useDeliveryOptions());

			await waitFor(() => expect(result.current.loading).toBe(false));

			expect(result.current.deliveryOptions).toEqual(VALID_OPTIONS);
			expect(result.current.error).toBeNull();
		});

		it("calls GET /api/delivery-options with estimatedDeliveryTime expand param", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: VALID_OPTIONS });
			renderHook(() => useDeliveryOptions());

			await waitFor(() => {});

			expect(api.get).toHaveBeenCalledWith(
				"/api/delivery-options?expand=estimatedDeliveryTime",
			);
		});

		it("accepts an empty array response", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: [] });
			const { result } = renderHook(() => useDeliveryOptions());

			await waitFor(() => expect(result.current.loading).toBe(false));
			expect(result.current.deliveryOptions).toEqual([]);
			expect(result.current.error).toBeNull();
		});
	});

	// ── b) Zod rejects malformed data ─────────────────────────────────────────

	describe("Zod validation of API response", () => {
		it("sets an error when an option has a negative priceCents", async () => {
			const invalid = [{ ...VALID_OPTIONS[0], priceCents: -1 }];
			vi.mocked(api.get).mockResolvedValue({ data: invalid });

			const { result } = renderHook(() => useDeliveryOptions());

			await waitFor(() => {
				expect(result.current.error).toBe(
					"Could not load delivery options. Please try again.",
				);
			});
		});

		it("sets an error when an option is missing the id field", async () => {
			const invalid = [{ priceCents: 0, estimatedDeliveryTimeMs: 0 }];
			vi.mocked(api.get).mockResolvedValue({ data: invalid });

			const { result } = renderHook(() => useDeliveryOptions());

			await waitFor(() => {
				expect(result.current.error).not.toBeNull();
			});
		});

		it("sets an error when the API returns null instead of an array", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: null });

			const { result } = renderHook(() => useDeliveryOptions());

			await waitFor(() => {
				expect(result.current.error).not.toBeNull();
			});
		});

		it("leaves deliveryOptions empty on a validation failure", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: null });
			const { result } = renderHook(() => useDeliveryOptions());

			await waitFor(() => expect(result.current.loading).toBe(false));
			expect(result.current.deliveryOptions).toEqual([]);
		});
	});

	// ── c) Loading & error states ─────────────────────────────────────────────

	describe("loading state", () => {
		it("starts in loading state", () => {
			vi.mocked(api.get).mockResolvedValue({ data: VALID_OPTIONS });
			const { result } = renderHook(() => useDeliveryOptions());
			expect(result.current.loading).toBe(true);
		});

		it("sets loading to false after a successful fetch", async () => {
			vi.mocked(api.get).mockResolvedValue({ data: VALID_OPTIONS });
			const { result } = renderHook(() => useDeliveryOptions());

			await waitFor(() => expect(result.current.loading).toBe(false));
		});

		it("sets loading to false even after a failed fetch", async () => {
			vi.mocked(api.get).mockRejectedValue(new Error("Network"));
			const { result } = renderHook(() => useDeliveryOptions());

			await waitFor(() => expect(result.current.loading).toBe(false));
		});
	});

	describe("network error handling", () => {
		it("sets an error message when the request fails", async () => {
			vi.mocked(api.get).mockRejectedValue(new Error("Network"));
			const { result } = renderHook(() => useDeliveryOptions());

			await waitFor(() => {
				expect(result.current.error).toBe(
					"Could not load delivery options. Please try again.",
				);
			});
		});
	});
});
