const apiBaseUrl = "http://localhost:3000/api/";

export class APIEndPoints {
    static readonly API_BASE_URL = apiBaseUrl;
    static readonly REGISTER = apiBaseUrl + 'signup';
    static readonly LOGIN = apiBaseUrl + 'signin';
    static readonly LOGOFF_USER = apiBaseUrl + 'logout';
    static readonly LOGIN_USER = apiBaseUrl + 'user';
    static readonly UPLOAD = apiBaseUrl + 'upload_image';
    static readonly DELETE_UPLOAD = apiBaseUrl + 'delete_old_image';
    static readonly MOMENT = apiBaseUrl + 'moment';
    static readonly EDIT_MOMENT = apiBaseUrl + 'editmoment';
    static readonly DELETE_MOMENT = apiBaseUrl + 'delete';
}