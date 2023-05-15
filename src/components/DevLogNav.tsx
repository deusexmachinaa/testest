import Link from 'next/link';

interface NavProps {
  type: 'toggle' | 'normal';
  onClick?: () => void;
}

const navlinks: { title: string; location: string }[] = [
  { title: 'Home', location: '/DevLog' },
  { title: 'Blog', location: '/DevLog/blog' },
];

export default function DevLogNav({ type, onClick }: NavProps) {
  const defaultStyleString =
    'dark:text-white dark:hover:text-green-500 text-center transition duration-250 hover:scale-125 hover:text-green-500';
  return (
    <>
      {navlinks.map((item) => {
        const { title, location } = item;
        return (
          <Link
            href={location}
            key={title}
            className={
              type === 'normal' ? defaultStyleString : defaultStyleString + ' text-lg py-4'
            }
            onClick={
              onClick
                ? onClick
                : () => {
                    return;
                  }
            }
          >
            {title}
          </Link>
        );
      })}
    </>
  );
}
