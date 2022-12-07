import {
    LeyendaError, Input, Inputfecha, Select, InputDisabled, InputArea, ContenedorCheck,
    ContenedorCheck2, Label, ContenedorCheckSimple
} from './estilos';

import React from 'react';


import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faSearch, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import ReactPrint from 'react-to-print'
import { useRef } from 'react'


import './my_style.css';



import { Link } from "react-router-dom";
import { URL } from '../../Auth/config';




// USUARIO


// const useStyles = makeStyles((theme) => ({
//     container: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         // width: 50,

//     },
//     textField: {
//         // marginLeft: theme.spacing(1),
//         // marginRight: theme.spacing(1),
//         height: 100,
//         width: 100,
//         border: 2
//     },
// }));



// const Calendario = ({ estado, cambiarEstado }) => {


//     const classes = useStyles();
//     return (
//         <div className={classes.container}>
//             <DatePicker
//                 className={classes.textField}
//                 autoOk
//                 animateYearScrolling
//                 value={estado}
//                 onChange={cambiarEstado}
//             // variant="static"
//             />
//         </div>

//     )
// }





const InputUsuario = ({ estado, cambiarEstado, tipo, name, placeholder, ExpresionRegular, span }) => {

    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value }) // cambiarEstado({ ...estado, campo: e.target})
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo))
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            else
                cambiarEstado({ ...estado, valido: 'false' })
        }
    }

    let tipoinput = ''
    if (tipo === 'password')
        tipoinput = tipo
    else
        tipoinput = 'text'

    return (
        <div>
            <div className="input-group mb-0">
                <Input
                    type={tipoinput}
                    className="form-control form-control-sm"
                    id={name}
                    name={name}
                    value={estado.campo || ''}
                    placeholder={placeholder}
                    onChange={onChange}
                    onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                    onBlur={validacion}  //si presionamos fuera del input
                    valido={estado.valido}
                    style={{ fontSize: '12px', height: '20px' }}
                />

                <div className="input-group-append">
                    <div className="input-group-text styles" >
                        <span className={span}></span>
                    </div>
                </div>
            </div>
            {estado.valido === 'false' && <LeyendaError valido={estado.valido} >{"campo invalido !"}</LeyendaError>}
        </div>
    )
}


const ComponenteInputUser = ({ estado, cambiarEstado, name, placeholder, tipo = 'text', ExpresionRegular, etiqueta, campoUsuario = false }) => {

    const onChange = (e) => {
        if (campoUsuario === true)
            cambiarEstado({ ...estado, campo: e.target.value })
        else
            cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() })
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }

    return (
        <div className=" field">
            <label >{etiqueta}</label>
            <Input
                type={tipo}
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                placeholder={placeholder}
                value={estado.campo || ''}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
            />
        </div>
    )
}

const ComponenteInputFile = ({ cambiarEstado, name }) => {

    const asignar = e => {
        // console.log(e.target.files[0])
        cambiarEstado(e.target.files[0])
    }
    return (
        < input
            type='file'
            className="form-control form-control-sm"
            id={name}
            name={name}
            onChange={asignar}
        />
    )
}


const ComponenteInputUserRow = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, etiqueta, campoUsuario = false }) => {

    const onChange = (e) => {
        if (campoUsuario === true)
            cambiarEstado({ ...estado, campo: e.target.value })
        else
            cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() })
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }

    return (
        <div className=" fieldRow">
            <label >{etiqueta + ': '}</label>
            <Input
                type='text'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                placeholder={placeholder}
                value={estado.campo || ''}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
            />
        </div>
    )
}


const ComponenteInputBuscarPaciente = ({ estado, cambiarEstado, name, ExpresionRegular, etiqueta, placeholder, eventoBoton }) => {


    const onchange = (e) => {

        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})

    }

    const validacion = () => {
        if (ExpresionRegular) {

            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }

    }

    return (
        <div className='fieldBuscar'>
            <label>{etiqueta}</label>
            <div className="input-group form-inline">

                <Input
                    type='text'
                    value={estado.campo || ''}
                    id={name}
                    className="form-control form-control-sm"
                    name={name}
                    placeholder={placeholder}
                    onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                    onBlur={validacion}  //si presionamos fuera del input
                    onChange={onchange}
                    valido={estado.valido}
                />
                <Button color="primary" className='btnIcono' onClick={eventoBoton}><FontAwesomeIcon icon={faSearch} /> </Button>
            </div>
        </div>
    )
}




const ComponenteInputBuscar = ({ estado, cambiarEstado, name, ExpresionRegular, placeholder, eventoBoton }) => {

    const onchange = (e) => {

        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})

    }

    const validacion = () => {
        if (ExpresionRegular) {

            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }

    }

    return (
        <div className="input-group form-inline ">
            <Input
                type='text'
                value={estado.campo || ''}
                id={name}
                className="form-control form-control-sm"
                name={name}
                placeholder={placeholder}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                onChange={onchange}
                valido={estado.valido}
            />
            <Button className='btnIcono' onClick={eventoBoton}><FontAwesomeIcon icon={faSearch} /> </Button>
        </div>
    )
}



const Select1 = ({ estado, cambiarEstado, Name, ExpresionRegular, lista, funcion, etiqueta }) => {

    // console.log(estado, 'estado del laboratorio')
    const onChange = (e) => {
        cambiarEstado({ campo: e.target.value, valido: 'true' })

    }
    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
                // console.log('servicio seleccionado: ', estado.campo)
                if (funcion) {
                    funcion()
                }

            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }

    return (
        <div className="field">
            <label>  {etiqueta} </label>

            <Select
                name={Name}
                className="form-control form-control-sm"
                onChange={onChange}
                // onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                // onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                value={estado.campo || ''}
                onClick={validacion}
            >
                <option>seleccione</option>
                {lista.map((r) => (
                    <option key={r.id} value={r.id}>{r.nombre}</option>
                ))}
            </Select>
        </div>
    )
}



const SelectRow = ({ estado, cambiarEstado, Name, ExpresionRegular, lista, funcion, funcion2, etiqueta }) => {

    const onChange = (e) => {

        cambiarEstado({ campo: e.target.value, valido: 'true' })
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
                // console.log('servicio seleccionado: ', estado.campo)
                if (funcion) {
                    funcion()
                }
                if (funcion2) {
                    funcion2()
                }

            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }


    return (
        <div className="fieldRow ">
            <label>  {etiqueta} </label>

            <Select
                name={Name}
                className="form-control form-control-sm"
                onChange={onChange}
                // onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                // onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                value={estado.campo || ''}
                onClick={validacion}
            >
                <option>seleccione</option>
                {lista.map((r) => (
                    <option key={r.id} value={r.id}>{r.nombre}</option>
                ))}
            </Select>
        </div>
    )
}



const ComponenteCheckSiNo = ({ estado, cambiarEstado, name, etiqueta }) => {
    const onChange = (e) => {
        cambiarEstado({ campo: e.target.checked, valido: 'true' })
        console.log(estado)
    }

    return (
        <ContenedorCheck>
            <label htmlFor={name} > {/*el id es un elemento escencial al momento de marcar el check  */}
                <input
                    type="checkbox"
                    name={name}
                    value={estado.campo}
                    id={name}
                    onChange={onChange}
                />
                {etiqueta}
            </label>
        </ContenedorCheck>
    )
}

const ComponenteInputfecha = ({ estado, cambiarEstado, name, ExpresionRegular, etiqueta }) => {

    // 
    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
        // console.log("fechas: ", estado)

    }

    return (
        <div className="field" >
            <label>{etiqueta}</label>
            <Inputfecha
                type='date'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                min='1900-12-12'
                // placeholder={placeholder}
                value={estado.campo || ''}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                toUpperCase
            />
        </div>
    )
}




const ComponenteInputfechaRow = ({ estado, cambiarEstado, name, ExpresionRegular, etiqueta }) => {

    // 
    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
        // console.log("fechas: ", estado)

    }

    return (
        <div className="fieldRow" >
            <label>{etiqueta}</label>
            <Inputfecha
                type='date'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                min='1900-12-12'
                // placeholder={placeholder}
                value={estado.campo || ''}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                toUpperCase
            />
        </div>
    )
}

const ComponenteInputHora = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, etiqueta }) => {

    // 
    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
        // console.log("fechas: ", estado)

    }

    return (
        <div className="field" >
            <label>{etiqueta}</label>
            <Inputfecha
                type='time'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                placeholder={placeholder}
                value={estado.campo || ''}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                toUpperCase
            />
        </div>
    )
}
const ComponenteInputUserDisabled = ({ estado, name, ExpresionRegular, span = '', etiqueta }) => {


    return (
        <div className="field" >
            <label> {etiqueta} </label>
            <InputDisabled
                type='text'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                value={estado.campo || ''}
                valido={estado.valido}
                toUpperCase
                disabled={true}
            />
            {span !== '' && <div className="input-group-append">
                <div className="input-group-text styles" >
                    <span className={span}></span>
                </div>
            </div>}
        </div>
    )
}
const ComponenteInputUserDisabledRow = ({ estado, name, ExpresionRegular, span = '', etiqueta }) => {


    return (
        <div className="fieldRow" >
            <label> {etiqueta} </label>
            <InputDisabled
                type='text'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                value={estado.campo || ''}
                valido={estado.valido}
                toUpperCase
                disabled={true}
            />
            {span !== '' && <div className="input-group-append">
                <div className="input-group-text styles" >
                    <span className={span}></span>
                </div>
            </div>}
        </div>
    )
}

const ComponenteCheck = ({ id, item, admitidos, funcion }) => {

    const onChange = (e) => {

        if (e.target.checked) {
            admitidos[e.target.value] = parseInt(e.target.value)
            if (funcion) {
                funcion()
            }
        }
        else {
            admitidos[e.target.value] = null
            if (funcion) {
                funcion()
            }
        }
    }
    // let ok = admitidos.filter(e =>e===id)
    // if (ok !== null)
    // document.getElementById(id).click()
    // console.log('componentes check   imprimir: ', admitidos.filter(element =>element=id))
    // console.log('componentes check   imprimir: ', admitidos)

    return (
        <ContenedorCheck>
            <label htmlFor={id + 'ser'} > {/*el id es un elemento escencial al momento de marcar el check  */}
                <input
                    type="checkbox"
                    name={id}
                    value={id}
                    id={id + 'ser'}
                    // checked = {admitidos.filter(element => element > id)?document.getElementById(id).checked = true: false}
                    onChange={onChange}
                />
                <small>{item}</small>
            </label>
        </ContenedorCheck>
    )
}

const VerDependientes = ({ dependientes, cabeceras, actual, categoria, abrirModal }) => {

    // console.log('dependientes para item: ', categoria)
    return (
        dependientes.length > 0 ?
            <>
                <div className='row verSolicitud ' style={{ margin: '30px' }}>
                    <div className='col-5 fontTitulo'>
                        <label>{cabeceras[0]} </label>
                    </div>
                    <div className='col-7 fontContenido'>
                        <label>  {cabeceras[1]}</label>
                    </div>
                </div>
                {dependientes.map((d) => (
                    <div className='row verSolicitud' style={{ marginLeft: '30px' }} key={d.y}>
                        <div className='col-5 fontTitulo' >
                            {
                                d.x != null ? <label>{d.x + ' :  '} </label> : <label>{categoria + ' :  '} </label>
                            }
                        </div>
                        <div className='col-7 fontContenido' >
                            {categoria != null ? <Button>modificar</Button> : null}
                            <label>  {d.y}</label>
                        </div>
                    </div>
                ))}
                {categoria != null ? <Button onClick={() => abrirModal(true)}>agregar</Button> : null}

            </> :
            <div className='row verSolicitud' style={{ margin: '30px' }}>
                <div className='col-5 fontTitulo'>
                    <label>{'Total  ' + cabeceras[0] + ' :  '}</label>
                </div>
                <div className='col-7 fontContenido'>
                    <label>  {actual.length}</label>
                </div>
                {categoria != null && dependientes.length === 0 ?
                    <div className='col-12 fontContenido'>
                        <label  >{categoria}</label>
                        <p style={{ color: "red" }} >SIN COMPLEMENTOS</p>
                        <Button onClick={() => abrirModal(true)}>agregar</Button>

                    </div> : null
                }

            </div>

    )
}


















































const CheckSimple = ({ estado, cambiarEstado, item, funcion, funcion2 }) => {
    const onChange = (e) => {
        if (e.target.checked) {
            cambiarEstado(true)
            if (funcion) {
                funcion()
            }
        }
        else {
            cambiarEstado(false)
            if (funcion2) {
                funcion2()
            }
        }

    }
    return (
        <ContenedorCheckSimple>
            <label htmlFor={item + 'ssl'} > {/*el id es un elemento escencial al momento de marcar el check  */}
                <input
                    type="checkbox"
                    name={item}
                    value={estado}
                    id={item + 'ssl'}
                    onChange={onChange}
                />
                <small >{item}</small>
            </label>
        </ContenedorCheckSimple>
    )
}



const ComponenteCheck2 = ({ id, item, admitidos }) => {
    const onChange = (e) => {
        if (e.target.checked) {
            admitidos[e.target.value] = e.target.value
            console.log(item, admitidos)
        }
        else {
            admitidos[e.target.value] = null
            console.log(item, admitidos)
        }
    }
    return (
        <ContenedorCheck2>
            <label htmlFor={id + ' ' + item + 'ssl'} > {/*el id es un elemento escencial al momento de marcar el check  */}
                <input
                    type="checkbox"
                    name={item}
                    value={id}
                    id={id + ' ' + item + 'ssl'}
                    onChange={onChange}
                />
                <small>{item}</small>
            </label>
        </ContenedorCheck2>
    )
}


const ComponenteInputfechaDisabled = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular }) => {

    // 
    const onChange = (e) => {
        cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() }) // cambiarEstado({ ...estado, campo: e.target})
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
        // console.log("fechas: ", estado)

    }

    return (
        <>

            {/* <div className="input-group-prepend"> */}
            {/* <span className="input-group-text"><i className='far fa-calendar-alt'></i></span> */}
            <Inputfecha
                type='date'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                placeholder={placeholder}
                value={estado.campo}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                toUpperCase
                disabled={true}
            />
            {/* <IconoValidacionfecha valido={estado.valido}
                icon={estado.valido === 'false' && faTimesCircle} /> */}

            {/* </div> */}
            {/* {estado.valido === 'false' && <LeyendaError valido={estado.valido} >{"campo invalido !"}</LeyendaError>} */}
        </>
    )
}






const ComponenteInputUser2 = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, useri = null, etiqueta }) => {

    const onChange = (e) => {
        if (useri) {
            cambiarEstado({ ...estado, campo: e.target.value }) // cambiarEstado({ ...estado, campo: e.target})
        }
        if (useri === null || useri === false) {
            cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() })
        }
        // console.log(estado)
    }
    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }

    return (
        <div className="input-group form-inline mb-1">
            <div className="btn btn-sidebar ">
                <div className='input-group-append '>
                    <Label> {etiqueta + ':'} </Label>
                </div>
            </div>
            <Input
                type='text'
                className="form-control form-control-sm"
                id={name}
                name={name}
                expresionRegular={ExpresionRegular}
                placeholder={placeholder}
                value={estado.campo}
                onChange={onChange}
                onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                onBlur={validacion}  //si presionamos fuera del input
                valido={estado.valido}
                toUpperCase
            />
        </div>
    )
}

const ComponenteInputArea = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, span = '', useri = null }) => {

    const onChange = (e) => {
        if (useri) {
            cambiarEstado({ ...estado, campo: e.target.value }) // cambiarEstado({ ...estado, campo: e.target})
        }
        if (useri === null || useri === false) {
            cambiarEstado({ ...estado, campo: e.target.value.toUpperCase() })
        }
        // console.log(estado)
    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(estado.campo)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
            }
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }

    return (
        <div className="row">
            <div className="input-group mb-0">

                <InputArea

                    className="form-control form-control-sm"
                    id={name}
                    name={name}
                    expresionRegular={ExpresionRegular}
                    placeholder={placeholder}
                    value={estado.campo}
                    onChange={onChange}
                    onKeyUp={validacion} //se ejecuta cuando dejamos de presionar la tecla
                    onBlur={validacion}  //si presionamos fuera del input
                    valido={estado.valido}
                    toUpperCase
                />




                {/* {span !== '' ? (<IconoValidacion valido={estado.valido}
                    icon={estado.valido === 'false' && faTimesCircle}/>)
                    : (<IconoValidacionCampos valido={estado.valido}
                        icon={estado.valido === 'false' && faTimesCircle} />)
                } */}

                {span !== '' && <div className="input-group-append">
                    <div className="input-group-text">
                        <span className={span}></span>
                    </div>
                </div>}

            </div>
            {estado.valido === 'false' && <LeyendaError valido={estado.valido} >{"campo invalido !"}</LeyendaError>}
        </div>
    )
}




const ComponenteInputCampo = ({ estado, cambiarEstado, name, placeholder, ExpresionRegular, validar, evento = null, eventoBoton = null }) => {

    const onChange = (e) => {
        cambiarEstado({
            ...estado,
            [e.target.name]: e.target.value
        })
        // console.log(estado, 'valores')

    }

    const validacion = () => {
        if (ExpresionRegular) {
            if (ExpresionRegular.test(validar)) {
                cambiarEstado({ ...estado, valido: 'true' })  //el valor del campo valido, debe ser una cadena 
                // console.log(estado)
            }
            // setUsername(event.target.value.toUpperCase());
            else {
                cambiarEstado({ ...estado, valido: 'false' })
            }
        }
    }

    // console.log(estado, 'desde el input')
    return (
        // <div className="row">
        <>
            <div className="input-group mb-0">

                {/* <label htmlFor = {name}>{placeholder}</label> */}
                <Input
                    className="form-control form-control-sm"
                    type='text'
                    id={name}
                    name={name}
                    expresionRegular={ExpresionRegular}
                    placeholder={placeholder}
                    value={validar.toUpperCase()}
                    onChange={onChange}
                    onKeyUp={validacion}    //se ejecuta cuando dejamos de presionar la tecla
                    onBlur={validacion}     //si presionamos fuera del input
                    valido={estado.valido}

                />
                {evento === true && <Link to="#" className="btn btn-primary boton" type="submit" id="btnNavbarSearch" onClick={eventoBoton}><i className="fas fa-search icono"></i></Link>}
                {/* 
                {evento == null ? (<IconoValidacionCampos valido={estado.valido}
                    icon={estado.valido === 'false' && faTimesCircle} />
                ) : (
                    <IconoValidacionCamposBuscar valido={estado.valido}
                    icon={estado.valido === 'false' && faTimesCircle}/>
                )} */}


            </div>
            {estado.valido === 'false' && <LeyendaError valido={estado.valido} >{'campo invalido !!!'}</LeyendaError>}
            {/* </div> */}
        </>
    )
}



const GenerarPdf = ({ informe, setEstado, volver, lab }) => {
    // console.log(lab[0][0].red, 'laboratorio')
    const ref = useRef()
    let hoy = new Date()
    let antes = new Date(informe[0].fechaNac) // formato: yyyy-MM-dd
    let edad1 = hoy.getFullYear() - antes.getFullYear()
    let mes = hoy.getMonth() - antes.getMonth()
    if (mes < 0 || (mes === 0 && hoy.getDate() < antes.getDate())) {
        edad1--
    }
    let data = []
    let codigos = []
    informe.forEach(element => {
        data.push(element.codigo)
    });
    codigos = data.filter((item, index) => {
        return data.indexOf(item) === index
    })

    return (
        <div className='row mt-3' style={{ background: 'white' }} >
            <div ref={ref} className='page col-10' style={{ paddingLeft: '100px', paddingRight: '0px', background: 'white' }}>
                <div className='title' style={{ padding: '5px' }}>
                    <img src="dist/img/sp.png" alt="perfil" className="img-circle elevation-4" style={{ width: '50px', height: '50px', marginRight: '5px' }} />
                    <label>LABORATORIO DE ANALISIS CLINICO</label>
                </div>
                <div style={{ fontSize: '15px', textAlign: 'center', margin: '20px' }}>Resultados siempre confiables</div>
                <div style={{ fontSize: '12px', textAlign: 'center', margin: '10' }}>DATOS DEL PACIENTE</div>
                <div className='row'>
                    <div className='col-7'>
                        <div style={{ height: '20px' }} ><label className='subtitulo'>Nombre  </label><label style={{ fontSize: '12px' }}>{': ' + informe[0].paciente}</label></div>
                        <div style={{ height: '20px' }}><label className='subtitulo'>Fecha de Nacimiento  </label><label style={{ fontSize: '12px' }}>{': ' + informe[0].fechaNac.split('T')[0]}</label></div>
                        <div style={{ height: '20px' }}><label className='subtitulo'> Edad  </label><label style={{ fontSize: '12px' }}>{': ' + edad1 + ' años'}</label></div>
                        <div style={{ height: '20px' }}><label className='subtitulo'> Sexo  </label><label style={{ fontSize: '12px' }}>{': ' + informe[0].sexo}</label></div>
                        <div style={{ height: '20px' }}><label className='subtitulo'> Medico  </label><label style={{ fontSize: '12px' }}>{': ' + informe[0].solicitante}</label></div>
                    </div>
                    <div className='col-5'>
                        <div style={{ height: '20px' }} ><label className='subtitulo'> Fecha Registro  </label><label style={{ fontSize: '12px' }}>{': ' + informe[0].fechaHoraPublicacionRes.split('T')[0]}</label></div>
                        <div style={{ height: '20px' }}><label className='subtitulo'> Numero de muestra  </label><label style={{ fontSize: '12px' }}>{': ' + informe[0].numIdentificacionLab}</label></div>
                    </div>
                </div>

                <div className="card-body table table-responsive mt-3" style={{ padding: '0px' }}>
                    <div style={{ height: '20px' }}><p className='subtitulo'> Servicios Solicitados </p></div>

                    <Table id="example12" className=" table table-sm">
                        <thead style={{ color: '#006572', background: 'white' }}>
                            <tr >
                                <th className="col-4 ">PARAMETRO</th>
                                <th className="col-2 ">RESULTADO</th>
                                <th className="col-2 ">UNIDAD</th>
                                <th className="col-4 ">INDICE DE REFERENCIA</th>
                            </tr>
                        </thead>
                        <tbody>
                            {codigos.map(cod => (
                                informe.map(e => (
                                    cod === e.codigo &&
                                    <>
                                        {e.encabezado === 1 ?
                                            <tr style={{ margin: '0px', padding: '0px', color: '#006572', fontSize: '14px' }} key={e.id}>
                                                <td style={{ margin: '2px', padding: '2px' }} className="col-4 ">{e.prueba}</td>
                                                <td style={{ margin: '2px', padding: '2px' }} className="col-2 ">{e.resultado}</td>
                                                <td style={{ margin: '2px', padding: '2px' }} className="col-2 ">{e.unidad ? e.unidad : 'No adminite'}</td>
                                                <td style={{ margin: '2px', padding: '2px' }} className="col-4 ">{e.intervalo ? e.intervalo : 'No admite'}</td>
                                            </tr> :
                                            <tr style={{ margin: '0px', padding: '0px' }} key={e.id}>
                                                <td style={{ margin: '2px', padding: '2px' }} className="col-4 ">{e.prueba}</td>
                                                <td style={{ margin: '2px', padding: '2px' }} className="col-2 ">{e.resultado}</td>
                                                <td style={{ margin: '2px', padding: '2px' }} className="col-2 ">{e.unidad ? e.unidad : 'No adminite'}</td>
                                                <td style={{ margin: '2px', padding: '2px' }} className="col-4 ">{e.intervalo ? e.intervalo : 'No admite'}</td>
                                            </tr>
                                        }
                                    </>
                                ))
                            ))}
                        </tbody>
                    </Table>
                </div>
                {codigos.map(cod => (
                    informe.map(e => (
                        cod === e.codigo && e.encabezado === 1 &&
                        <div key={e.id}>
                            <p style={{ color: '#006572', fontSize: '14px', margin: '2px', padding: '2px', paddingTop: '15px' }}>{e.prueba}</p>
                            {e.metodologia && <p style={{ fontSize: '11px', margin: '2px', padding: '2px' }}>{'Método : ' + e.metodologia}</p>}

                            {
                                (e.procedenciaMuestra || e.condicionMuestra || e.condicionPaciente || e.farmacosPaciente || e.interpretacionResLab || e.observacionLab) ?
                                    <div>
                                        {e.procedenciaMuestra && <p style={{ fontSize: '12px', margin: '2px', padding: '2px' }}>{'Procedencia de la Muestra  : ' + e.procedenciaMuestra}</p>}
                                        {e.condicionMuestra && <p style={{ fontSize: '12px', margin: '2px', padding: '2px' }}>{'Condicion de la Muestra  : ' + e.condicionMuestra}</p>}
                                        {e.condicionPaciente && <p style={{ fontSize: '12px', margin: '2px', padding: '2px' }}>  {'Condiciones del Paciente : ' + e.condicionPaciente}</p>}
                                        {e.farmacosPaciente && <p style={{ fontSize: '12px', margin: '2px', padding: '2px' }}>{'farmacos del paceinte del Paciente : ' + e.farmacosPaciente}</p>}
                                        {e.interpretacionResLab && <p style={{ fontSize: '12px', margin: '2px', padding: '2px' }}>{'Interpretacion de los resultados: ' + e.interpretacionResLab}</p>}
                                        {e.observacionLab && <p style={{ fontSize: '12px', margin: '2px', padding: '2px' }}> {' Otras observaciones : ' + e.observacionLab}</p>}
                                    </div> :
                                    <p style={{ fontSize: '12px', margin: '2px', padding: '2px' }}> {'Sin detalles'}</p>
                            }
                        </div>
                    ))
                ))}

                <div  style={{ textAlign: 'right' }}>
                    
                    {informe[0].firma && <img src={URL + '/' + informe[0].firma} alt="frima concedida por El laboratorio de San Pedro Claver" style={{ width: '170px', fontSize: '10', height: '170px', margin: '30px' }} />}
                </div>



                <div className='mt-4' style={{ fontSize: '15px' }}><label className='subtitulo'>IMPORTANTE: Los resultados incluidos en este reporte no sustituyen la consulta médica. Para una interpretación adecuada,
                    es necesario que un médico los revise y coleccione con información clínica (signos, síntomas, antecedentes) y la obtenida de
                    otras pruebas complementarias. </label>
                </div>

                <div style={{ height: '20px', fontSize: '12px', color: '#757575', marginTop: '40px', fontFamily: 'Verdana' }}><p > {lab[0][0].red + '  -  ' + lab[0][0].nombre} </p></div>
                <div style={{ height: '20px', fontSize: '12px', color: '#757575', marginTop: '0px', fontFamily: 'Verdana' }}><p > {lab[0][0].direccion + '   ' + lab[0][0].telefono} </p></div>
            </div>
            <div className='col-1 check-r'>
                <div className='row contendorButton'>
                    <button className='mt-3 cancelar' onClick={() => { setEstado(false); volver(true) }}><FontAwesomeIcon icon={faAngleLeft} /> </button>
                    <ReactPrint trigger={() => <button className='mt-3 autorizar'><FontAwesomeIcon icon={faPrint} /> </button>} content={() => ref.current} documentTitle={informe[0].fecha.split('T')[0] + '_' + informe[0].paciente} />
                </div>
            </div>
        </div >
    )
}

export {
    InputUsuario,
    ComponenteInputUser,
    ComponenteInputBuscar,
    Select1,
    ComponenteCheckSiNo,
    ComponenteInputBuscarPaciente,
    ComponenteInputUserDisabledRow,
    ComponenteInputUserRow,
    SelectRow,
    // Calendario,
    ComponenteInputFile,
    GenerarPdf,
    VerDependientes,
    ComponenteInputfechaRow,





    ComponenteInputfecha, ComponenteInputCampo, ComponenteCheck, ComponenteInputUserDisabled,
    ComponenteInputfechaDisabled,
    ComponenteInputArea, ComponenteInputHora, ComponenteCheck2, ComponenteInputUser2, CheckSimple
}
