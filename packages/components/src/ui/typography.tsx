import { FC, ReactNode } from 'react';
import { clsx } from 'clsx';

type Tag = 'h1' | 'h2' | 'p';

interface TypographyProps {
  tag?: Tag;
  variant?: Tag;
  className?: string;
  children?: ReactNode;
}

export const Typography: FC<TypographyProps> = props => {
  const Tag = props.tag ?? 'p';
  const variant = props.variant ?? Tag;

  return (
    <Tag
      className={clsx(
        {
          'text-4xl font-extrabold': variant === 'h1',
          'text-3xl font-bold': variant === 'h2',
        },
        props.className,
      )}
    >
      {props.children}
    </Tag>
  );
};
