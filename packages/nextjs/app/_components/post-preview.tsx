import Link from "next/link";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

export function PostPreview({ title, date, excerpt, slug }: Props) {
  return (
    <div className="flex items-center py-4 border-b border-gray-200 justify-between w-full">
      <div className="mb-5">
        <h3 className="text-3xl mb-3 leading-snug">
          <Link href={`/posts/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
        <div className="text-lg text-gray-600 mb-4 text-ellipsis">{excerpt.slice(0, 500)}</div>
      </div>
      <Link as={`/posts/${slug}`} href="/[...slug]" className="block shrink-0 ml-6">
        <span className="sr-only">Leer más</span>
        <svg className="w-4 h-4 fill-current text-blue-600" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.3 14.7l-1.4-1.4L12.2 9H0V7h12.2L7.9 2.7l1.4-1.4L16 8z" />
        </svg>
      </Link>
    </div>
  );
}
