'use client';
import { PostForm } from '@/components/Posts/PostForm/PostForm';
import { withClientAuthHOC } from '@/shared/HOCS';

function CreatePostPage() {
	return <PostForm />;
}

export default withClientAuthHOC(CreatePostPage);
