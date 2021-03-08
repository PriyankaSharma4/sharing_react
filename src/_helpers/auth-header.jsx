export function authHeader() {
 
    // return authorization header with basic auth credentials
    let user = localStorage.getItem('access_token')

    let timezone = localStorage.getItem('time_zone')

    if (user && user) {
        return {'Access-Control-Allow-Origin': '*',  'deviceType':'w','appVersion' : '1.0','Authorization':  user, "timezone":timezone};
    } else {
        return {};
    }
}