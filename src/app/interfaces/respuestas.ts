export interface Respuesta{
    access_token?: string;
    // status?: number;
    // message?: string;     
}

export interface Error{
    status: number;
    message: string;
}
