import { useMemo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { BiCommentDetail } from 'react-icons/bi';
import type { IPostWithComment } from '@/types';
import { Link } from '@react-board/common';

import {
  PostList,
  PostTitle,
  PostContent,
  PostCreatedAt,
  CommentCount,
} from './style';

dayjs.extend(relativeTime);

interface IProps {
  data: IPostWithComment
}

export default function ListItem({ data }: IProps) {
  const content = useMemo(() => ((data?.content) ? data.content.replace(/(<([^>]+)>)/ig, '') : ''), [data.content]);
  const displayCreatedAt = useMemo(() => {
    const time = dayjs(data.created_at);
    return (dayjs().diff(time, 'day') > 1 ? time.format('YYYY/MM/DD') : time.fromNow());
  }, [data.created_at]);
  return (
    <Link key={data.id} href={`/posts/view?postId=${data.id}`}>
      <PostList>
        <div data-testid="post-item">
          <PostTitle>
            {data.title}
            {(data.comments?.length > 0) && (
              <CommentCount>
                <BiCommentDetail />
                {`${data.comments?.length}`}

              </CommentCount>
            )}
          </PostTitle>

          <PostContent>{content}</PostContent>
        </div>
        <div>
          <PostCreatedAt>{displayCreatedAt}</PostCreatedAt>
        </div>
      </PostList>
    </Link>
  );
}
