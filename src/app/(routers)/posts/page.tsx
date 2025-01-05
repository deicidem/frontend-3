'use client';
import './catalogPage.scss';
import { Box, Pagination, PaginationItem } from '@mui/material';
import { ChangeEvent, Suspense, useEffect, useState } from 'react';
import { useQuery } from '@blitzjs/rpc';
import getPostsWithFilters from '@/features/post/api/queries/getPostsWithFilters';
import PostCardList from '@/components/Posts/PostCardList/PostCardList';
import { PostFilters } from '@/components/Posts/EventFilters/PostFilters';
import { Loader } from '@/shared/components';

export default function CatalogPage() {
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const [{ posts, totalPages }, { refetch }] = useQuery(getPostsWithFilters, {
		page: currentPage,
		perPage: 6,
		categoryIds: selectedCategories,
		sortBy: sortOrder,
	});

	useEffect(() => {
		setCurrentPage(1);
		refetch();
	}, [selectedCategories, sortOrder]);

	function handlePageChange(_: ChangeEvent<unknown>, page: number) {
		setCurrentPage(page);
	}

	if (!posts) {
		return <Loader />;
	}

	return (
		<Suspense fallback={<Loader />}>
			<Box className='card-list-wrapper'>
				<Box className='card-list-wrapper_container'>
					<PostFilters
						selectedCategories={selectedCategories}
						sortOrder={sortOrder}
						onCategoriesChange={setSelectedCategories}
						onSortChange={setSortOrder}
					/>

					<PostCardList posts={posts} />
				</Box>

				{totalPages > 1 && (
					<Pagination
						count={totalPages}
						page={currentPage}
						onChange={handlePageChange}
						renderItem={(item) => (
							<PaginationItem
								className={
									item.type === 'page' && item.page === currentPage
										? 'current-page'
										: 'no-current-page'
								}
								{...item}
							/>
						)}
					/>
				)}
			</Box>
		</Suspense>
	);
}
