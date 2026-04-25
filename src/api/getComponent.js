import { get } from "../http/request";


export function getComponent() {
    return get('/lowcode')
}