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
        rol: string; 
        ciudad: string;
        numVotos:    number; 
        numReviews: number;
        numSeguidores: number;  
        numSiguiendo: number;  
    }
    

    export interface Votacion {
        codigo:  number;
        juego:   Juego;
        usuario: Usuario;
        votante: string;
        voto:    number;
        numVotosVotante: number; 
        review:  string;
        fecha:   Date;
    }

    export interface FollowCredentials {
        user:  Usuario;
        esAmigo:   boolean;
    }

    export interface Amistad {
        usuarioSource:  Usuario;
        follower:   Usuario;
    }
    
    
    
    
