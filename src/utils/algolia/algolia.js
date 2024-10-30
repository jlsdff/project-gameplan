import { searchClient } from "@algolia/client-search";

const app_id = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
const search_api_key = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY

const client = searchClient(app_id, search_api_key)

export default client;