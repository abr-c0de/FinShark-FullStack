import type { CommentGet } from "../../Models/Comment";
import StockCommentListItem from "../StockCommentListItem/StockCommentListItem";

type Props = {
  comments: CommentGet[];
};

const StockCommentList = ({ comments }: Props) => {
  return (
    <div>
      {comments?.length ? (
        comments.map((comment, index) => (
          <StockCommentListItem comment={comment} key={index} />
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default StockCommentList;
