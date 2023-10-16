'use client';

import styled from '@emotion/styled';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Wrapper = styled.main`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #000;
  color: #fff;
  text-align: center;

  h1 {
    margin-bottom: 15px;
    font-size: 3.2rem;
    font-weight: 700;
  }
  p {
    font-size: 1.87rem;
  }
`;

export default function WelcomePage() {
  const router = useRouter();
  const [delay, setDelay] = useState(5);
  const counter = (count: number) => {
    if (count < 0) {
      router.push('/posts');
    } else {
      setTimeout(() => {
        setDelay(count);
        counter(count - 1);
      }, 1000);
    }
  };
  useEffect(() => {
    counter(5);
  }, []);
  return (
    <Wrapper>
      <div>
        <h1>Welcome!</h1>
        <p>
          {`Redirect to list page in ${delay}`}
        </p>
      </div>
    </Wrapper>
  );
}
