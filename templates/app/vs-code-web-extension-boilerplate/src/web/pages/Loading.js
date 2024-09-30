import React from 'react';

const Loading = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-50">
			<div className="flex flex-col items-center">
				<svg
					className="animate-spin h-12 w-12 text-indigo-600 mb-4"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
					></path>
				</svg>
				<h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Loading...
				</h2>
				<p className="mt-2 text-center text-sm text-gray-500">
					Please wait while we load your content
				</p>
			</div>
		</div>
	);
};

export default Loading;
