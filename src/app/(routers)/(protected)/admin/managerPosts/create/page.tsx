'use client';
import { PostForm } from '@/components/Posts/PostForm/PostForm';
import { withAdminAuthHOC } from '@/shared/HOCS';

function CreatePostPage() {
	return <PostForm />;
}

export default withAdminAuthHOC(CreatePostPage);
