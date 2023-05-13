import { supabase } from '@/supabaseClient';
import Link from 'next/link';

export default async function Etc() {
  const { data: EtctItems } = await supabase.from('EtctItems').select();

  const content = (
    <div className="flex justify-center flex-wrap gap-4 p-8">
      {EtctItems?.map((item, index) => (
        <Link
          key={item.index}
          href={item.href ?? ''}
          className="w-72 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow transform hover:-translate-y-1 cursor-pointer"
          target={item.target ?? ''}
        >
          <div
            className="h-48 bg-cover bg-center rounded-t-lg"
            style={{ backgroundImage: `url(${item.image})` }}
          ></div>
          <h2 className="text-xl text-gray-600 font-semibold mb-2 text-center">{item.title}</h2>
          <p className="text-gray-600 text-sm text-center">{item.description}</p>
        </Link>
      ))}
    </div>
  );

  return <div>{content}</div>;
}
