import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { issueSchema } from '@/app/validationSchemas';
import { getServerSession } from 'next-auth/next';
import authOption from '@/app/auth/AuthOptions';

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOption);
	if (!session) return NextResponse.json({ message: 'Error Unauthorized Access' }, { status: 401 });

	const body = await request.json();
	const validation = issueSchema.safeParse(body);

	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
	}

	const newIssue = await prisma.issue.create({
		data: {
			title: body.title,
			description: body.description,
		},
	});

	return NextResponse.json(newIssue, { status: 201 });
}