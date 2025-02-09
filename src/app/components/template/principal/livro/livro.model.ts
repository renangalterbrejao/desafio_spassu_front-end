import { Assunto } from "../assunto-principal/assunto.model"
import { Autor } from "../autor/autor.model"

export interface Livro {
    codl?: number
    titulo: string
    editora: string
    edicao?: number
    anoPublicacao: string
    preco?: string
    autores: Autor[]
    assuntos: Assunto[]
}