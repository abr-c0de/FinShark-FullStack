import { handleError } from "../Helpers/ErrorHandler";
import type { CommentGet, CommentPost } from "../Models/Comment";
import apiClient from "./AxiosClient";

export const commentPostApi = async (title: string, content: string, symbol: string) => {
    try{
        const data = await apiClient.post<CommentPost>(`comments/${symbol}`,{
            title,
            content
        })
        return data;
    } catch(error) {
        handleError(error);
        return null;
    }
}

export const commentsGetApi = async (symbol: string) => {
    try{
        const {data} = await apiClient.get<CommentGet[]>(`comments/`,{
      params: { Symbol: symbol } // axios automatically converts this to ?Symbol=AAPL
    })
        return data;
    } catch(error) {
        handleError(error);
        return null;
    }
}