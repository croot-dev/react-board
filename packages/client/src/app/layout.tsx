import React from 'react';
import type { Metadata } from 'next';
import '@/styles/reset.css';
import '@/styles/global.css';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const metadata: Metadata = {
  title: 'React Board',
  description: '',
};

interface IProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
