module.exports = {
    url:'http://localhost:3001',
    abandono :30, // TIEMPO DE TOLERANCIA AL ABANDONO DE LA PAGINA CON LA SESION INICIADA  (MINUTOS)

    // EXPRESIONES REGULARES 
    //expresiones para validar los campos  de los diferentes input o entradas
    usuario: /^[a-zA-ZÑñ0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre:  /^[a-z A-Z0-9Ññ_-À-ÿ\s]{4,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
    nombrePersona:  /^[a-z A-ZÑñ_-À-ÿ\s]{4,40}$/, // Letras, numeros y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    persona: /^[a-zA-ZÑñ]{4,16}$/, 
    sexo:/^[FMfm]{1}$/,
    celular: /^\d{8}$/ , // 8 digitos
    nhc: /^\d{1,10}$/ , // 10 digitos
    telefono: /^\d{5,10}$/, // 7 a 10 numeros.
    ci: /^\d{7,10}$/,
    ciBuscar: /^\d{1,10}$/,
    direccion :/^.{8,50}$/,
    diagnostico :/^.{8,200}$/,
    red :/^\d{1,4}$/, // id de redes, 1 a 4 digitos
    edad :/^\d{1,3}$/, // id de redes, 1 a 4 digitos
    sala :/^\d{1,10}$/, // id de redes, 1 a 4 digitos
    cama :/^\d{1,10}$/, // id de redes, 1 a 4 digitos
    fechas: /\d{4}[-]\d{2}[-]\d{2}/,
    hora : /\d{2}[:]\d{2}[:]\d{2}/,
    cinhc : /^\d{1,10}$/,
    laboratorio:'EXAMENES DE LABORATORIO'

} 


