export interface MenuItem {
  index?: number;
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export const MenuItemsEmergency: MenuItem[] = [
  {
    id: 'testest',
    title: '테스트들',
    description: '심리테스트 및 여러 흥미로운 테스트들로 이동합니다.',
    href: '/testest',
    image: 'https://source.unsplash.com/1600x900/?test',
  },
  {
    id: 'versus',
    title: '이상형월드컵',
    description: '이상형월드컵으로 이동합니다.',
    href: '/versus',
    image: 'https://source.unsplash.com/1600x900/?versus',
  },
  {
    id: 'etc',
    title: '잡동사니',
    description: '잡동사니로 이동합니다.',
    href: '/etc',
    image: 'https://source.unsplash.com/1600x900/?etc',
  },
  {
    id: 'DevLog',
    title: '개발일지',
    description: '개발일지로 이동합니다.',
    href: '/DevLog',
    image: 'https://source.unsplash.com/1600x900/?dev',
  },
];
