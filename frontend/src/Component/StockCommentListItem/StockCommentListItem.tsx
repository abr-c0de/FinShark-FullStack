import type { CommentGet } from "../../Models/Comment";

type Props = {
  comment: CommentGet;
};

const StockCommentListItem = ({ comment }: Props) => {
  return (
    <div className="relative grid grid-cols-1 gap-4 p-4 mb-8 w-full border rounded-lg bg-white shadow-lg">
      <div className="flex flex-row gap-4 w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between w-full">
            <p className="text-xl font-semibold truncate w-full">
              {comment.title}
            </p>
          </div>
          <p className="text-dark text-sm">@{comment.createdBy}</p>
        </div>
      </div>
      <p className="text-gray-500 wrap-break-words">{comment.content}</p>
    </div>
  );
};

export default StockCommentListItem;
