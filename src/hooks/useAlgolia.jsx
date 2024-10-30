import { useInfiniteQuery, skipToken } from "@tanstack/react-query"
import { search } from "@/utils/algolia/search"

export default useAlgolia = ({
  indexName,
  query,
  limit,
  staleTime=Infinity,
  gcTime,
}) => {

  const queryInfo = useInfiniteQuery({
    queryKey: ['algolia', indexName, query, limit],
    queryFn: query ?
      ({pageParam}) => {
        search(indexName, query, pageParam, limit)
      } : skipToken,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime,
    gcTime
  })
  const hits = queryInfo.data?.pages.map( (page) => page.hits ).flat()

  return { ...queryInfo, hits }

}