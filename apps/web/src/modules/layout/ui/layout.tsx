import { FC, ReactNode } from 'react';
import { Button } from '@repo/components/shadcn';
import { Container, Logo } from '@repo/components/ui';
import { Header } from '@repo/components/widgets';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { DynamicLayout } from './dynamic-layout';

import { APP_PATHS } from '@/shared/constants';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = props => {
  const t = useTranslations();

  return (
    <>
      <Header>
        <Header.Group>
          <Link href={APP_PATHS.MAIN}>
            <Logo />
          </Link>
        </Header.Group>
        <Header.Group>
          <Link href={APP_PATHS.SIGN_UP}>
            <Button variant={'outline'}>{t('AUTH.SIGN_UP')}</Button>
          </Link>
          <Link href={APP_PATHS.SIGN_IN}>
            <Button>{t('AUTH.SIGN_IN')}</Button>
          </Link>
        </Header.Group>
      </Header>
      <Container className={'pt-32'}>{props.children}</Container>
      <DynamicLayout />
    </>
  );
};
