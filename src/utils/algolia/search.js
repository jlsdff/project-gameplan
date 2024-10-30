import client from "./algolia"

export const search = async ( indexName, query, pageParam=1, limit=10  ) => {

  const { hits, page, nbPages } = client.searchSingleIndex({
    indexName: indexName,
    searchParams: {query, pageParam, limit}
  })

  const nextPage = page + 1 > nbPages ? page + 1 : undefined;

  return {hits, nextPage}

}