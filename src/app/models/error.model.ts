export interface Error {
    path: string;
    detail?: { [key: string]: string; };
    error: string;
    message: string;
    status: number;
}
