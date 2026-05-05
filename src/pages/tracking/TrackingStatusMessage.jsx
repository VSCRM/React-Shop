export function TrackingStatusMessage({ loading, error, isEmpty }) {
	if (loading) {
		return <div className="tracking-state-message">Loading order details…</div>;
	}

	if (error) {
		return <div className="tracking-state-message tracking-error">{error}</div>;
	}

	if (isEmpty) {
		return <div className="tracking-state-message">No products found for this order.</div>;
	}

	return null;
}
