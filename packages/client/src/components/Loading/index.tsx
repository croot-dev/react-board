import Image from 'next/image';
import { Background, LoadingText } from './style';

export default function Loading() {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <Image
        src="/loading.gif"
        alt="loading"
        width="150"
        height="150"
      />
    </Background>
  );
}
