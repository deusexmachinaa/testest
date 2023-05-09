export interface MenuItem {
    title: string;
    description: string;
    href: string;
    image: string;
  }
  
export const MenuItems: MenuItem[] = [
  {
    title: "테스트들",
    description: "심리테스트 및 여러 흥미로운 테스트들로 이동합니다.",
    href: "/testest",
    image: "https://source.unsplash.com/1600x900/?test",
  },
  {
    title: "이상형월드컵",
    description: "이상형월드컵으로 이동합니다.",
    href: "/versus",
    image: "https://source.unsplash.com/1600x900/?versus",
  },
  {
    title: "잡동사니",
    description: "잡동사니로 이동합니다.",
    href: "/etc",
    image: "https://source.unsplash.com/1600x900/?etc",
  },
  {
    title: "개발일지",
    description: "개발일지로 이동합니다.",
    href: "/DevLog",
    image: "https://source.unsplash.com/1600x900/?dev",
  },
  // 필요한 만큼 메뉴 항목 추가
];