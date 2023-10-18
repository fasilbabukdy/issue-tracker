'use client';
import { Spinner } from '@/app/components';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger, Box, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const [error, setError] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const router = useRouter();

	const deleteIssue = async () => {
		try {
			setIsDeleting(true);
			await axios.delete('/api/issues/' + issueId);
			router.push('/issues/list');
			router.refresh();
		} catch (error) {
			setIsDeleting(false);
			setError(true);
		}
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button
						disabled={isDeleting}
						color="red">
						{isDeleting && <Spinner />} Delete Issue
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
					<AlertDialogDescription>Are you sure you want to delete this issue ? This action cannot be undone.</AlertDialogDescription>
					<Flex
						mt="4"
						gap="4"
						justify="end">
						<AlertDialog.Cancel>
							<Button
								variant="soft"
								color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button
								variant="surface"
								color="red"
								onClick={deleteIssue}>
								Delete Issue
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title color="red">Error</AlertDialog.Title>
					<AlertDialog.Description>This is issue could not be deleted.</AlertDialog.Description>
					<Button
						mt="3"
						className="uppercase cursor"
						color="gray"
						variant="soft"
						onClick={() => setError(false)}>
						Ok
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;
