import '@radix-ui/themes/styles.css';
import './globals.css';
import './theme-config.css';

import { Container, Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './NavBar';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './auth/Provider';

const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			suppressHydrationWarning>
			<body className={inter.variable}>
				<QueryClientProvider>
					<AuthProvider>
						<Theme
							appearance="light"
							accentColor="violet"
							panelBackground="solid">
							<NavBar />
							<main className="p-5">
								<Container>{children}</Container>
							</main>
						</Theme>
					</AuthProvider>
				</QueryClientProvider>
			</body>
		</html>
	);
}
