import { toast } from "react-toastify";
import { commentsGetApi, commentPostApi } from "../../Services/CommentService";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { useCallback, useEffect, useState } from "react";
import type { CommentGet } from "../../Models/Comment";
import Spinner from "../Spinners/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComments] = useState<CommentGet[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await commentsGetApi(stockSymbol);
      setComments(res ?? []);
    } finally {
      setLoading(false);
    }
  }, [stockSymbol]); // <- now function is stable

  useEffect(() => {
    fetchComments();
  }, [fetchComments]); // ESLint happy

  const handleCommentSubmit = async (data: CommentFormInputs) => {
    try {
      await commentPostApi(data.title, data.content, stockSymbol);
      toast.success("Comment created!");
      fetchComments(); // re-fetch after successful post
    } catch {
      toast.error("Failed to post comment");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {loading && <Spinner />}
      {!loading && <StockCommentList comments={comments} />}
      <StockCommentForm handleComment={handleCommentSubmit} />
    </div>
  );
};

export default StockComment;
