const DB_DATABASE = process.env.DB_DATABASE || 'sp';
const URL = 'http://localhost:3001'
const INPUT = {
    INPUT_BUSCAR: /^.{1,200}$/,
    INPUT_USUARIO: /^[a-zA-ZÑñ0-9_-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    PASSWORD: /^.{4,12}$/, // 4 a 12 digitos.
    NOMBRE_PERSONA: /^[a-zA-ZÑñ ]{2,30}$/, 
    CI: /^\d{7,10}$/,
    DIRECCION : /^.{4,100}$/,
    SEGURO:/^.{3,50}$/,
    TELEFONO: /^\d{5,10}$/, // 7 a 10 numeros.
    ID :/^\d{1,10}$/, // id de redes, 1 a 4 digitos
    FECHA: /\d{4}[-]\d{2}[-]\d{2}/,
    HORA : /\d{2}[:]\d{2}[:]\d{2}/,
    SEXO:/^[FMfm]{1}$/,
    SEXO3:/^[FMfmTt]{1}$/,
    NHC : /^\d{1,10}$/,
    EDAD :/^\d{1,3}$/, // id de redes, 1 a 4 digitos
    DIAGNOSTICO :/^.{8,200}$/,
    TEXT :/^.{1,200}$/,
    NUMEROS :  /^-?\d+([.]\d+)?(?:[Ee][-+]?\d+)?$/   // /^[0-9]+([.][0-9]+)?$/,  //NUMEROS ENTEROS MAS NUMEROS REALES, negativos, mas notacion cientifica (ej: 1.2e+05)   /^-?\d+([.]\d+)?(?:[Ee][-+]?\d+)?$/ 


}
export{
    URL, DB_DATABASE, INPUT
}