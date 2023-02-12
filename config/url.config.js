const url_local_server = "https://localhost:8080"
const url_online_server = "https://serve.alwaysdata.net"

// server
console.log(window.location.hostname);
export const url_server = window.location.hostname === "127.0.0.1" ? url_local_server : url_online_server
export const url_player_server = `${url_server}/players`

// api
const url_api = `${url_server}/api`

const url_auth = `${url_api}/auth`
const url_rating = `${url_api}/rating`
const url_inventory = `${url_api}/inventory`
const url_shop = `${url_api}/shop`
const url_player = `${url_api}/player`

// authentification
export const url_autoconnect = `${url_auth}/autoconnect/`
export const url_signin = `${url_auth}/signin/`
export const url_signup = `${url_auth}/signup/`
export const url_refresh = `${url_auth}/refresh/`

// rating
export const url_allRating = `${url_rating}/all/`

// inventory
export const url_myInventory = `${url_inventory}/myInventory/`

// shop
export const url_shopCategory = `${url_shop}/category/`
export const url_basicPurchase = `${url_shop}/basicPurchase/`

// player
export const url_playerInfos = `${url_player}/infos/`