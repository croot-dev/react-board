import React from 'react';
import Loading from '@/components/Loading';
import { Wrapper, PageTitle } from './style';

interface IProps {
  title: React.ReactNode;
  loading?: boolean
  children?: React.ReactNode
}
export default function PageWrapper({ title, loading = false, children }: IProps) {
  return (
    <Wrapper>
      <>
        <PageTitle>{title}</PageTitle>
        {loading ? <Loading /> : children}
      </>
    </Wrapper>
  );
}
