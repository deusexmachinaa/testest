import { supabase } from '@/supabaseClient'
import Link from 'next/link'


export default async function Posts() {
  const { data: MenuItems } = await supabase.from('MenuItems').select()

  if (!MenuItems) {
    return <p>No posts found.</p>
  }

  return MenuItems.map((post) => (
    <p key={post.id}>
      <Link href={`/static/${post.id}`}>{post.title}</Link>
    </p>
  ))
}