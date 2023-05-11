import { MenuItems } from "@/Data/MainMenu";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface MenuProps {
  type: "toggle" | "normal";
  onClick?: () => void;
}


export default async function Menu({ type, onClick }: MenuProps) {
  const pathName = usePathname()
  const defaultStyleString =
    "dark:text-white dark:hover:text-green-500 text-center transition duration-250 hover:scale-125 hover:text-green-500";

  return (
    <>
      {MenuItems.map((item) => {
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
