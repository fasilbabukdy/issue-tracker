import { Box } from '@radix-ui/themes';
import React from 'react';
import { Skeleton } from '@/app/components';

const IssueFormSkeleton = () => {
	return (
		<Box className="max-w-xl">
			<Skeleton
				className="mb-2 rounded-sm"
				height="2rem"
			/>
			<Skeleton
				className="mb-2 rounded-sm"
				height="20rem"
			/>
		</Box>
	);
};

export default IssueFormSkeleton;
