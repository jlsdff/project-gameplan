import client from "./algolia"

export const search = async (indexName, query, pageParam = 1, limit = 10) => {
  const { hits, page, nbPages } = await client.searchSingleIndex({
    indexName: indexName,
    searchParams: { query, page: pageParam, hitsPerPage: limit }
  });

  console.log(`search ${query}: `, hits);

  const nextPage = page + 1 > nbPages ? undefined : page + 1;

  return { hits, nextPage };
}