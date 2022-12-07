import useAuth from "../../Auth/useAuth";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Inactivo from '../ausencias';
import React from 'react';


function Home() {
    const auth = useAuth()

    useEffect(() => {
        if (localStorage.getItem('token') != null) {
            const inter = setInterval(() => {
                Inactivo(auth)
            }, 10000);
            return inter;
        }

    }, [auth])

    const salir = () => {
        let ok = window.confirm('Cerrar Sesion ?')
        if (ok) {
            auth.logout()
        }
    }


    const handleClick = () => {
        localStorage.setItem('tiempo', new Date().getMinutes())

    }

    const handleKeyPress = () => {
        localStorage.setItem('tiempo', new Date().getMinutes())
    }
    return (
        <>
            <div onClick={handleClick} onKeyPress={handleKeyPress}>
                <nav className="main-header navbar navbar-expand navbar-white navbar-light" style={{ height: '60px' }}>
                    <ul className="navbar-nav" style={{ paddingTop: '10px' }}>
                        <li key="uniqueId1" className="nav-item">
                            <p className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars"></i></p>
                        </li>
                        <li key="uniqueId2" className="nav-item d-none d-sm-inline-block">
                            <Link to="/" className="nav-link">Inicio</Link>
                        </li>
                        <li key="uniqueId3" className="nav-item d-none d-sm-inline-block">
                            <Link to='/contactos' className="nav-link">Contactos</Link>
                        </li>
                    </ul>

                </nav>
                <aside className="main-sidebar sidebar-dark-primary " style={{ height: '100%' }}>
                    <div className="brand-link pb-0" >
                        <div className="text-center">
                            <img src="dist/img/sp.png" alt="perfil" className="img-circle elevation-4" style={{ width: '50px', height: '50px' }} />
                        </div>
                        <div className="text-center">
                            <p className="brand-text font-weight-light" style={{ fontSize: '14px' }}>{localStorage.getItem('nombre') + ' ' + localStorage.getItem('apellido')}</p>
                            <p className="brand-text font-weight-light" style={{ fontSize: '14px' }}>{localStorage.getItem('username')}</p>

                            <p className="brand-text font-weight-light" style={{ fontSize: '10px' }}>{localStorage.getItem('servicio')}</p>
                            <p className="brand-text font-weight-light" style={{ fontSize: '10px' }}>{localStorage.getItem('rol')}</p>

                        </div>
                    </div>

                    <div className="sidebar">
                        <nav className="mt-1">

                            {parseInt(localStorage.getItem('numRol')) === 1 && <div>
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                    <li key="uniqueId64" className="nav-item">
                                        <Link to='/autorizarsolicitud' className="nav-link">
                                            <i className="fas fa-notes-medical nav-icon"></i>
                                            <p>AUTORIZAR</p>
                                        </Link>
                                    </li>

                                    <li key="uniqueId5" className="nav-item" >
                                        <Link to='#' className="nav-link">
                                            <i className="nav-icon fas fa-hospital"></i>
                                            <p>
                                                ADMINISTRACION
                                                <i className="right fas fa-angle-left"></i>
                                            </p>
                                        </Link>
                                        <ul className="nav nav-treeview">
                                            <li key="uniqueId7" className="nav-item">
                                                <Link to='/servicio' className="nav-link">
                                                    <i className="fas fa-clinic-medical nav-icon"></i>
                                                    <p>servicios</p>
                                                </Link>
                                            </li>

                                            <li key="uniqueId9" className="nav-item">
                                                <Link to='/laboratorio' className="nav-link">
                                                    <i className="fas fa-microscope nav-icon"></i>
                                                    <p>Archivos</p>
                                                </Link>
                                            </li>
                                            <li key="uniqueId10" className="nav-item">
                                                <Link to='/usuarios' className="nav-link">
                                                    <i className="fas fa-hospital-user nav-icon"></i>
                                                    <p>usuarios</p>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li key="uniqueId02" className="nav-item">
                                        <Link to='/reportes' className="nav-link">
                                            <i className="fas fa-laptop-medical nav-icon"></i>
                                            <p>REPORTES</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>}
                            {parseInt(localStorage.getItem('numRol')) === 2 && <div>
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                    <li key="uniqueIdss47" className="nav-item">
                                        <Link to='/registrarsolicitud' className="nav-link">
                                            <i className="fas fa-notes-medical nav-icon"></i>
                                            <p>SOLICITAR </p>
                                        </Link>
                                    </li>
                                    <li key="uniqueId01" className="nav-item">
                                        <Link to='/paciente' className="nav-link">
                                            <i className="nav-icon fas fa-solid fa-person-half-dress"></i>
                                            <p>
                                                Pacientes
                                                <span className="right badge badge-danger">New</span>
                                            </p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>}
                            {parseInt(localStorage.getItem('numRol')) === 3 && <div>
                                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                                    <li key="uniqueIdss41" className="nav-item">
                                        <Link to='/resultados' className="nav-link">
                                            <i className="fas fa-notes-medical nav-icon"></i>
                                            <p>RESULTADOS </p>
                                        </Link>
                                    </li>
                                    <li key="uniqueId8" className="nav-item">
                                        <Link to='/itemservicio' className="nav-link">
                                            <i className="fas fa-list nav-icon"></i>
                                            <p>Servicios</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>}
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <li key="uniqueId04" className="nav-item" >
                                    <Link to='#' className="nav-link">
                                        <i className="nav-icon fas fa-power-off"></i>
                                        <p>
                                            CERRAR SESION
                                            <i className="right fas fa-angle-left"></i>
                                        </p>
                                    </Link>
                                    <ul className="nav nav-treeview">
                                        <li key="uniqueI05" className="nav-item">
                                            <Link to='#' onClick={salir} className="nav-link">
                                                <i className="fas fa-exclamation nav-icon"></i>
                                                <p>SALIR</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </aside>
            </div>

        </>
    )
}
export default Home;