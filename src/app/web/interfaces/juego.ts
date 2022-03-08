//Interfaces de juego, usuario y votación

export interface Juego {
        referencia:    number;
        titulo:        string;
        plataforma:    Plataforma;
        year:          string;
        desarrollador: string;
        categoria:     string;
        votos:         Votacion[];
        votacionMedia: number; 
    }
    
    export enum Plataforma {
        MegaDrive = "Mega Drive",
    }

    export interface Usuario {
        correo: string;
        nick:   string;
        numVotos:    number;    }
    

    export interface Votacion {
        codigo:  number;
        juego:   Juego;
        usuario: Usuario;
        voto:    number;
        review:  string;
        fecha:   Date;
    }
    
    
