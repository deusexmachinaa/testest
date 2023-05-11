import { supabase } from "@/lib/supabaseClient"


export default async function Posts() {
  const { data: MenuItems } = await supabase.from('MenuItems').select()
  return <pre>{JSON.stringify(MenuItems, null, 2)}</pre>
}