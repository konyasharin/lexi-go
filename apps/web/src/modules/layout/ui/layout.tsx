import { FC, ReactNode } from 'react';
import { Container, Logo } from '@repo/components/ui';
import { Header } from '@repo/components/widgets';

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: FC<LayoutProps> = props => {
  return (
    <>
      <Header>
        <Header.Group>
          <Logo />
        </Header.Group>
        <Header.Group>123</Header.Group>
      </Header>
      <Container className={'pt-32'}>{props.children}</Container>
    </>
  );
};
