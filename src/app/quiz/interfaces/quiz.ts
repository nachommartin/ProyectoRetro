export interface Quiz {
    ref:  number;
    name: string;
    numPreguntas: number;
}
export interface Question {
ref:              number;
texto:            string;
orden:            number;
respuestaCorrect: Respuesta;
isValid:          boolean;
numRespuesta:     number;
}

export interface Respuesta {
referencia: number;
text:       string;
orden:      number;
}