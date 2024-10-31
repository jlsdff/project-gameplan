import { useInfiniteQuery, skipToken } from "@tanstack/react-query";
import { search } from "@/utils/algolia/search";

const useAlgolia = ({
  indexName,
  query,
  customQueryFn,
  limit,
  staleTime = Infinity,
  gcTime,
  ...rest
}) => {
  const queryInfo = useInfiniteQuery({
    queryKey: ["algolia", indexName, query, limit],
    queryFn: query
      ? async ({ pageParam = 0 }) => {
          const { hits, nextPage } = await search(
            indexName,
            query,
            pageParam,
            limit
          );
          if (customQueryFn) {
            return await customQueryFn({ hits, nextPage });
          }
          return hits;
        }
      : skipToken,

    getNextPageParam: (lastPage) => {
      return lastPage.hits.length === limit ? lastPage.nextPage : undefined;
    },
    staleTime,
    gcTime,
    ...rest,
  });

  const hits = queryInfo.data?.pages.map((page) => page.hits).flat() || [];

  return { ...queryInfo, hits };
};

export default useAlgolia;
