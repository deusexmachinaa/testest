import { supabase } from '@/supabaseClient';
import Link from 'next/link';

export default async function TesTesT() {
  const { data: TestItems } = await supabase.from('TestItems').select();
  const content = (
    <div className="flex justify-center flex-wrap gap-4 p-8">
      {TestItems?.map((item, index) => (
        <Link
          key={index}
          href={item.Href ?? ''}
          className="w-72 rounded-lg shadow-md p-6 bg-white hover:shadow-lg transition-shadow transform hover:-translate-y-1 cursor-pointer"
        >
          <div
            className="h-48 bg-cover bg-center rounded-t-lg"
            style={{ backgroundImage: `url(${item.Image})` }}
          ></div>
          <h2 className="text-xl text-gray-600 font-semibold mb-2 text-center">{item.Title}</h2>
          <p className="text-gray-600 text-sm text-center">{item.Description}</p>
        </Link>
      ))}
    </div>
  );

  return <div>{content}</div>;
}
