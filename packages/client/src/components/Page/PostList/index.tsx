'use client';

import { useMemo, useEffect, useState } from 'react';
import {
  Link, Select, Input, Button, Row, Col,
} from '@react-board/common';
import type {
  CustomError, IPost, IPostWithComment, OrderBy,
} from '@/types';
import { readPostList } from '@/services/post';
import {
  rowPerPageDefault, rowPerPageOptions, orderOptions, defaultSortOrder,
} from '@/constants';
import ListItem from './ListItem';
import { PageWrapper } from '@/components/Layout';
import {
  BoardContainer, BoardTop, PaginationContainer, PageSizeSelect, BoardEmpty,
} from './page.style';
import useDebounce from '@/hooks/useDebounce';

export default function PostsPage() {
  const [postList, setPostList] = useState<IPostWithComment[]>([]);
  const getPostList = async () => {
    try {
      const params = {
        // ...(sortBy && { _sort: sortBy }),
        // ...(orderBy && { _order: orderBy }),
      };
      const result = await readPostList(params);
      if (result) {
        const sortKey = sortBy || defaultSortBy;
        setPostList(
          Object.entries(result)
            .map(([key, value]) => ({ ...value, id: key }))
            .sort((a, b) => {
              const order = (orderBy === 'desc') ? 1 : -1;
              // @ts-ignore
              return (a[sortKey] > b[sortKey]) ? order : order * -1;
            }),
        );
      } else {
        setPostList([]);
      }
    } catch (error) {
      window.alert((error as CustomError).message);
      console.log(error);
    }
  };

  // 필터 기능
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 500);
  const filteredPosts = useMemo(
    () => (
      postList
        .filter(({ title, content }) => (
          title.includes(debouncedSearchText) || content.includes(debouncedSearchText)
        ))
    ),
    [postList, debouncedSearchText],
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchText]);

  // 페이징 기능
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(Number(rowPerPageDefault));
  const disablePrevButton = useMemo(() => (currentPage === 1), [currentPage]);
  const disableNextButton = useMemo(
    () => (currentPage * rowPerPage >= filteredPosts.length),
    [currentPage, rowPerPage, filteredPosts],
  );
  const pagedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * rowPerPage;
    const endIndex = currentPage * rowPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  }, [currentPage, rowPerPage, filteredPosts]);

  const onChangeRowPerPage = (value: string) => {
    const newRowPerPage: number = Number(value);
    setRowPerPage(newRowPerPage);
    setCurrentPage(1);
  };
  const onClickPageChange = (newPageSize: number) => {
    setCurrentPage(newPageSize);
  };

  // 정렬 기능
  const [defaultSortBy, defaultOrderBy] = defaultSortOrder.split(' ');
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [orderBy, setOrderBy] = useState<OrderBy>(defaultOrderBy as OrderBy);
  const onChangeSort = (value: string) => {
    const [newSort, newOrder] = value.split(' ');
    setSortBy(newSort);
    setOrderBy(newOrder as OrderBy);
  };
  useEffect(() => {
    getPostList();
  }, [sortBy, orderBy]);

  return (
    <PageWrapper title="글 목록">
      <BoardTop>
        <Row gap={10}>
          <Col>
            <Select
              options={orderOptions}
              defaultValue={defaultSortOrder}
              onChange={onChangeSort}
            />
          </Col>
          <Col>
            <Input value={searchText} placeholder="Filter" onChange={setSearchText} />
          </Col>
        </Row>
        <div>
          <Link type="button" href="/posts/form">Write</Link>
        </div>
      </BoardTop>
      <BoardContainer>
        {(pagedPosts.length === 0)
          ? <BoardEmpty>글이 없습니다.</BoardEmpty>
          : pagedPosts.map((post) => (<ListItem key={post.id} data={post} />))}
      </BoardContainer>

      <PaginationContainer>
        <PageSizeSelect
          defaultValue={rowPerPageDefault}
          options={rowPerPageOptions}
          onChange={onChangeRowPerPage}
        />
        <span />
        <Button
          disabled={disablePrevButton}
          onClick={() => onClickPageChange(currentPage - 1)}
        >
          Prev
        </Button>
        <Button
          disabled={disableNextButton}
          onClick={() => onClickPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </PaginationContainer>
    </PageWrapper>
  );
}
