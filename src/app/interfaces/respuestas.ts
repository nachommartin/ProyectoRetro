export interface Respuesta{
    access_token: string;
    // status?: number;
    // message?: string;     
}

export interface Error{
    status: number;
    message: string;
}

export interface RespuestaCorreo{
    correo: string;
    // status?: number;
    // message?: string;     
}

//Interfaces del tipo de respouestas Http