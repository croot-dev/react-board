import Page from '@/components/Page/PostEdit';
import { readPostList } from '@/services/post';
import type { IPost } from '@/types';

interface IProps {
  params: { postId: string }
}
export default function PostViewPage({ params }: IProps) {
  return <Page />;
}

export async function generateStaticParams() {
  const postList: IPost[] = await readPostList();

  return postList.map(({ id }) => ({
    postId: id.toString(),
  }));
}
