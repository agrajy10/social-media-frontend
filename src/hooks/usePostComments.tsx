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
      queryClient.setQueryData(queryKey, (posts: Post[]) => {
        return posts.map((post) => {
          if (post.id === postId)
            return {
              ...post,
              comments: [...post.comments, ...data.data],
              hasMoreComments: data.hasMore,
            };
          return post;
        });
      });
    }
  }, [data]);

  return { page, setPage };
}

export default usePostComments;
