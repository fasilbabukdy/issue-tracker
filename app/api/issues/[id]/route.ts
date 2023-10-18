import authOption from '@/app/auth/AuthOptions';
import { patchIssueSchema } from '@/app/validationSchemas';
import prisma from '@/prisma/client';
import delay from 'delay';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
	const session = await getServerSession(authOption);
	if (!session) return NextResponse.json({ messsage: 'Error Unauthorized Access' }, { status: 401 });

	const body = await request.json();
	const { title, description, assignedToUserId } = body;

	const validation = patchIssueSchema.safeParse(body);
	if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

	if (assignedToUserId) {
		const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });
		if (!user) return NextResponse.json({ error: 'Invalid User.' }, { status: 400 });
	}

	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	});

	if (!issue) return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

	const updatedIssue = await prisma.issue.update({
		where: { id: issue.id },
		data: { title, description, assignedToUserId },
	});

	return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
	// await delay(2000);
	const session = await getServerSession(authOption);
	if (!session) return NextResponse.json({ message: 'Error Unauthorized Access' }, { status: 401 });

	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) },
	});

	if (!issue) return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

	await prisma.issue.delete({
		where: { id: issue.id },
	});

	return NextResponse.json({});
}
