import http from "./http";

export function get(url, params) {
    return http.get(url, { params });
}

export function post(url, data) {
    return http.post(url, data);
}
