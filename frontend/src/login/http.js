import axios from 'axios'

import {URL} from '../Auth/config'


//peticiones al servidor

export const http = async (usuario, password) => {

    // console.log("hola desde servicios login")
    return await axios.get(URL, {params:{ 
            "user":usuario, 
            "pass" :password
    }})

}