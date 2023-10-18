'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import SimpleMDE from 'react-simplemde-editor';

import { ErrorMessage, Spinner } from '@/app/components';
import { issueSchema } from '@/app/validationSchemas';
import 'easymde/dist/easymde.min.css';
import { Issue } from '@prisma/client';

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(issueSchema),
	});
	const router = useRouter();

	const onSubmit = handleSubmit(async (data) => {
		try {
			setIsSubmitting(true);
			if (issue) await axios.patch('/api/issues/' + issue.id, data);
			else await axios.post('/api/issues', data);
			router.push('/issues/list');
		} catch (error) {
			setIsSubmitting(false);
			setError('An unexpected error occurred.');
		}
	});

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root
					color="red"
					className="mb-4">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form
				onSubmit={onSubmit}
				className="max-w-xl space-y-3">
				<TextField.Root>
					<TextField.Input
						defaultValue={issue?.title}
						placeholder="Title"
						{...register('title')}></TextField.Input>
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>

				<Controller
					name="description"
					defaultValue={issue?.description}
					control={control}
					render={({ field }) => (
						<SimpleMDE
							placeholder="Description"
							{...field}
						/>
					)}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<Button disabled={isSubmitting}>
					{issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
				</Button>
			</form>
		</div>
	);
};

export default IssueForm;
