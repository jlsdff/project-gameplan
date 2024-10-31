import { searchClient } from "@algolia/client-search";

const app_id = "E0U8VX4KVQ"
const search_api_key = "c8bc8457576a9c30c322b5ebcbc59182"

const client = searchClient(app_id, search_api_key)

export default client;