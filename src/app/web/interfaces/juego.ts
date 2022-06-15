//Interfaces de juego, usuario y votación

import { Byte } from "@angular/compiler/src/util";

export interface Juego {
        referencia:    number;
        titulo:        string;
        plataforma:    Plataforma;
        year:          string;
        desarrollador: string;
        categoria:     string;
        votos:         Votacion[];
        votacionMedia: number; 
        numVotos: number; 
        imagen:        Byte[];
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
        numListas: number;  
        baneado:boolean;
        fechaBaneo?:Date;
        rango:string;
        avatar:   Byte[];

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
    
    export interface Comentario {
        codigoComentario: number;
        texto:            string;
        fecha:            Date;
        usuarioReceptor:  Usuario;
        usuarioEmisor:    Usuario;
    }
    
    export interface Listado {
        referencia: number;
        publico:    boolean;
        nombre:     string;
        numJuego: number;
    }  
