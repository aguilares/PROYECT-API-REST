import express from 'express'
import {dirname,join} from 'path'
import {fileURLToPath} from 'url'

// mis modulos
import rutas from "./vista/rutas.js"
import {PORT} from "./config.js"


//inicializar 
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
// console.log(__dirname)

app.set("puerto", PORT)
app.set(express.static(join(__dirname,"public")));


app.use(express.urlencoded({ extended: false }))
// le diremos a la API que recibirá archivos de tipo json
app.use(express.json())

app.use(rutas)



app.listen(app.get("puerto"),()=>{
    console.log("servidor corrinedo en: ", PORT)
});

