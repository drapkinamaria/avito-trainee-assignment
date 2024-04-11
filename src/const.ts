export enum AppRoute {
    Root = '/',
    Movie = '/movie/:id',
    Login = '/login',
}

export enum AuthorizationStatus {
    Auth = 'AUTH',
    NoAuth = 'NO_AUTH',
    Unknown = 'UNKNOWN'
}
