import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Post, PostComment } from "../types/Post";
import axiosInstance from "../axios";

function usePostComments({
  postId,
  queryKey,
  hasMoreComments,
}: {
  postId: number;
  queryKey?: string[];
  hasMoreComments: boolean;
}) {
  const [page, setPage] = useState(0);
  const queryClient = useQueryClient();
  const fetchPostComments = async (): Promise<{
    data: PostComment[];
    hasMore: boolean;
    page: number;
  }> => {
    const response = await axiosInstance.get(`/posts/${postId}/comments`, {
      params: { limit: 5, page, skip: 5 },
    });
    return response.data;
  };

  const { data } = useQuery({
    queryKey: ["post-comments", postId, page],
    queryFn: fetchPostComments,
    enabled: !!page && hasMoreComments,
  });

  useEffect(() => {
    if (data && queryKey?.length) {
      queryClient.setQueryData(queryKey, (oldPosts: any) => {
        let newPosts = JSON.parse(JSON.stringify(oldPosts));
        for (let page = 0; page < newPosts.pages.length; page++) {
          let updated = false;
          for (const post of newPosts.pages[page].data) {
            if (post.id === postId) {
              post.comments = [...data.data, ...post.comments];
              post.hasMoreComments = data.hasMore;
              updated = true;
              break;
            }
          }
          if (updated) break;
        }
        return newPosts;
      });
    }
  }, [data]);

  return { page, setPage };
}

export default usePostComments;
