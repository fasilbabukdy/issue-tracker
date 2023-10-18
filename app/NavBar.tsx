'use client';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import { Skeleton } from '@/app/components';

const NavBar = () => {
	return (
		<nav className="border-b mb-5 px-5 py-3">
			<Container>
				<Flex
					justify="between"
					align="center">
					<Flex
						align="center"
						gap="4">
						<Link href={'/'}>
							<AiFillBug className="h-6 w-6" />
						</Link>
						<NavLinks />
					</Flex>
					<AuthStatus />
				</Flex>
			</Container>
		</nav>
	);
};

const NavLinks = () => {
	const currentPath = usePathname();

	const links = [
		{ label: 'Dashborad', href: '/' },
		{ label: 'Issues', href: '/issues/list' },
	];

	return (
		<ul className="flex space-x-6">
			{links.map((link, index) => (
				<li key={index}>
					<Link
						href={link.href}
						className={classnames({
							'nav-link': true,
							'!text-zinc-900': link.href === currentPath,
						})}>
						{link.label}
					</Link>
				</li>
			))}
		</ul>
	);
};

const AuthStatus = () => {
	const { status, data: session } = useSession();

	if (status === 'loading') return <Skeleton width="3rem" />;
	if (status === 'unauthenticated')
		return (
			<Link
				className="nav-link"
				href="/api/auth/signin">
				Login
			</Link>
		);

	return (
		<Box>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Avatar
						className="cursor-pointer"
						size="2"
						radius="full"
						src={session!.user!.image!}
						fallback="?"
						referrerPolicy="no-referrer"></Avatar>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size="2">{session!.user!.email}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item>
						<Link href="/api/auth/signout">SigOut</Link>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};
export default NavBar;
