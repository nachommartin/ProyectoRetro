

export interface Juego {
        referencia:    number;
        titulo:        string;
        plataforma:    Plataforma;
        year:          string;
        desarrollador: string;
        categoria:     string;
        votos:         any[];
        votacionMedia: number; 
    }
    
    export enum Plataforma {
        MegaDrive = "Mega Drive",
    }

    export interface Usuario {
        correo: string;
        nick:   string;
    }
    

    export interface Votacion {
        codigo:  number;
        juego:   Juego;
        usuario: Usuario;
        voto:    number;
        review:  any;
        fecha:   Date;
    }
    
    
