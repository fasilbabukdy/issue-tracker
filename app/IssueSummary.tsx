import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

interface Props {
	open: number;
	inProgress: number;
	closed: number;
}

interface containerProps {
	label: string;
	value: number;
	status: Status;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
	const containers: containerProps[] = [
		{ label: 'Open Issues', value: open, status: 'OPEN' },
		{ label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
		{ label: 'Closed Issues', value: closed, status: 'CLOSED' },
	];

	return (
		<Flex gap="4">
			{containers.map((container) => (
				<Card
					key={container.value}
					className="flex-1 shadow-md">
					<Flex
						direction="column"
						gap="1">
						<Link
							className="text-sm font-medium text-gray-500"
							href={`/issues/list?${container.status}`}>
							{container.label}
						</Link>
						<Text
							size="7"
							className="font-bold">
							{container.value}
						</Text>
					</Flex>
				</Card>
			))}
		</Flex>
	);
};

export default IssueSummary;
