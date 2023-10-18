import { Box, Card, Flex, Heading } from '@radix-ui/themes';
import { Skeleton } from '@/app/components';

const LoadingIssueDetailPage = () => {
	return (
		<Box className="max-w-xl">
			<Heading>
				<Skeleton />
			</Heading>
			<Flex
				className="space-x-3"
				my="2">
				<Skeleton />
				<Skeleton />
			</Flex>
			<Card
				className="prose"
				mt={'4'}>
				<Skeleton />
			</Card>
		</Box>
	);
};

export default LoadingIssueDetailPage;
