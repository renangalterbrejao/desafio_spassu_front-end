import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root",
})

export class VariaveisGlobais {

    private tituloApp: string = "Spassu BookStore";
    private baseURL: string = "http://localhost:8080/"

    getTitulo() {
        return this.tituloApp
    }

    getBaseUrl() {
        return this.baseURL
    }

}

