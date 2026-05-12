interface Props {
	loading: boolean;
	error: string | null;
	isEmpty: boolean;
}

export function TrackingStatusMessage({ loading, error, isEmpty }: Props) {
	if (loading) return <div className="tracking-state-message">Loading order details…</div>;
	if (error) return <div className="tracking-state-message tracking-error">{error}</div>;
	if (isEmpty) return <div className="tracking-state-message">No products found for this order.</div>;
	return null;
}
