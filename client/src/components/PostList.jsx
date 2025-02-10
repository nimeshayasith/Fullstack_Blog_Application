import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async (pageParam, searchParams) => {
  try {
    const searchParamsObj = Object.fromEntries([...searchParams]);
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
      params: { page: pageParam, limit: 10, ...searchParamsObj },
    });

    if (!res.data || !Array.isArray(res.data.posts)) {
      throw new Error("Invalid response format");
    }

    return res.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], hasMore: false };
  }
};

const PostList = () => {
  const [searchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  if (isFetching) return "Loading...";
  if (error) return "Something went wrong!";

  const allPosts = data?.pages?.flatMap((page) => page?.posts ?? []) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      endMessage={<p><b>All posts loaded!</b></p>}
    >
      {allPosts.filter(post => post && post._id).map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;
