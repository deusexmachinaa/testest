import { MenuItems } from "@/Data/MainMenu";
import Link from "next/link";

interface MenuProps {
  type: "toggle" | "normal";
  onClick?: () => void;
}

export default function Menu({ type, onClick }: MenuProps) {
  const defaultStyleString =
    "dark:text-white dark:hover:text-green-500 text-center transition duration-250 hover:scale-125 hover:text-green-500";
  return (
    <>
      {MenuItems.map((item) => {
        const { title, href } = item;
        return (
          <Link
            href={href}
            key={title}
            className={
              type === "normal"
                ? defaultStyleString
                : defaultStyleString + " text-lg py-4"
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
