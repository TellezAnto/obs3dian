import { PostTitle } from "../_components/post-title";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  date: string;
};

export function PostHeader({ title, date }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12"></div>
      <div className="mb-8 md:mb-16 sm:mx-0"></div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6"></div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
