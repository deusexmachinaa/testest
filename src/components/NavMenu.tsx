import { MenuItemsEmergency } from "@/Data/MainMenu";
import { supabase } from "@/supabaseClient";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface MenuProps {
  type: "toggle" | "normal";
  onClick?: () => void;
}

// type datas = {
//   description: string;
//   href: string;
//   id: string;
//   image: string;
//   indesx: number;
//   title: string;
// }

// type MenuItem = {
//   description: string;
//   href: string;
//   id: string;
//   image: string;
//   indesx: number;
//   title: string;
// }

export default function Menu({ type, onClick }: MenuProps) {
  const rawPathName = usePathname()
  const pathName = rawPathName.split("/")[1]
  const defaultStyleString =
    "dark:text-white dark:hover:text-green-500 text-center transition duration-250 hover:scale-125 hover:text-green-500 min-w-fit";
  return (
    <>
      {(MenuItemsEmergency).map((item) => {
        const { title, href, id } = item;
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
              {id == pathName ? "✔" : ""}
            {title}
          </Link>
        );
      })}
      {type == "toggle" && (
        <button
        onClick={
          onClick
          ? onClick
          : () => {
            return;
          }
        }
        className={
           defaultStyleString + " text-lg py-4"
           }
           >
             ✕
           </button>
           )}
    </>
  );
}
