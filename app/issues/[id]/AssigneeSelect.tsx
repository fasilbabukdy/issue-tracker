'use client';
import axios from 'axios';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { Issue, User } from '@prisma/client';
import { Skeleton } from '@/app/components';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const { data: users, error, isLoading } = useUsers();

	const assinedIssue = (userId: string) => {
		const assignedId = userId !== 'null' ? userId : null;
		axios
			.patch('/api/issues/' + issue.id, {
				assignedToUserId: assignedId,
			})
			.catch((error) => {
				toast.error('Changes could not be saved');
			});
	};

	if (isLoading) return <Skeleton height="2rem" />;
	if (error) return null;

	return (
		<>
			<Select.Root
				defaultValue={issue.assignedToUserId || 'null'}
				onValueChange={assinedIssue}>
				<Select.Trigger placeholder="Assign..."></Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.Label>Suggetions</Select.Label>
						<Select.Item value="null">Unassigned</Select.Item>
						{users?.map((user) => (
							<Select.Item
								key={user.id}
								value={user.id}>
								{user.name}
							</Select.Item>
						))}
					</Select.Group>
				</Select.Content>
			</Select.Root>

			<Toaster />
		</>
	);
};

const useUsers = () =>
	useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => axios.get('/api/users').then((res) => res.data),
		staleTime: 60 * 1000, //60s
		retry: 3,
	});

export default AssigneeSelect;
