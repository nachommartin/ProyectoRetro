export interface Quiz {
    ref:  number;
    name: string;
}
export interface Question {
ref:              number;
texto:            string;
orden:            number;
respuestaCorrect: Respuesta;
isValid:          boolean;
}

export interface Respuesta {
referencia: number;
text:       string;
orden:      number;
}