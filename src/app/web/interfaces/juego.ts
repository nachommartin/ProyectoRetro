

export interface Juego {

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

   
    
