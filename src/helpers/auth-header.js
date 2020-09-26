export function authHeader(file = false, form = '') {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        if (file)
            return {
                'Authorization': 'Bearer ' + user.token,
                "content-type": "multipart/form-data"
            };
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}