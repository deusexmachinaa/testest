import Link from 'next/link';

interface DevlogPostProps {
  date: string;
  title: string;
  des: string;
  slug: string;
}

const DevlogPost = ({ date, title, des, slug }: DevlogPostProps) => {
  return (
    <Link href={`/DevLog/blog/${slug}`} className="w-full my-7">
      <div className="font-medium text-xs transition text-gray-500 dark:text-gray-300">{date}</div>
      <div className="font-extrabold text-xl sm:text-2xl mt-2 transition hover:text-green-500">
        {title}
      </div>
      <div className="font-medium text-lg transition text-gray-600 dark:text-gray-400 sm:text-xl mt-1">
        {des}
      </div>
    </Link>
  );
};

export default DevlogPost;