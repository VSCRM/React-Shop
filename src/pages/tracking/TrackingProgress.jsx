import { TRACKING_STEPS, PROGRESS_MAP } from '../../utils/constants';

export function TrackingProgress({ status }) {
	const progressWidth = PROGRESS_MAP[status] ?? '0%';

	return (
		<>
			<div className="progress-labels-container">
				{TRACKING_STEPS.map((step) => (
					<div
						key={step}
						className={`progress-label${step === status ? ' current-status' : ''}`}
					>
						{step}
					</div>
				))}
			</div>

			<div className="progress-bar-container">
				<div
					className="progress-bar"
					style={{ width: progressWidth }}
				/>
			</div>
		</>
	);
}
