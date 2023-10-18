import authOption from '@/app/auth/AuthOptions';
import NextAuth from 'next-auth';

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
