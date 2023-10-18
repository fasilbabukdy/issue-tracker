import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth/next';
import { notFound } from 'next/navigation';

import authOption from '@/app/auth/AuthOptions';
import prisma from '@/prisma/client';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import { Metadata } from 'next';
import { cache } from 'react';

interface Props {
	params: { id: string };
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

const IssueDetailPage = async ({ params }: Props) => {
	const session = await getServerSession(authOption);
	const issue = await fetchUser(parseInt(params.id));

	if (!issue) return notFound();

	return (
		<Grid
			columns={{ initial: '1', sm: '5' }}
			gap="4">
			<Box className="md:col-span-4">
				<IssueDetails issue={issue} />
			</Box>
			{session && (
				<Box>
					<Flex
						direction="column"
						gap="4">
						<AssigneeSelect issue={issue} />
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
					</Flex>
				</Box>
			)}
		</Grid>
	);
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const issue = await fetchUser(parseInt(params.id));
	return {
		title: issue?.title,
		description: 'Details of issue ' + issue?.id,
	};
}

export default IssueDetailPage;
