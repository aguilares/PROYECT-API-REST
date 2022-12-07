import { Link } from 'react-router-dom'
import React from 'react';

function E500() {
    // console.log(parseInt(localStorage.getItem('numRol')), 'numero de rol')

    return (
        <>

            <div className="">
                <section className="content-header">
                    <div className="container-fluid">

                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>500 Error Page</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to='/solicitud'>Home</Link></li>
                                    <li className="breadcrumb-item active">500 Error Page</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="error-page">
                        <h2 className="headline text-danger">500</h2>

                        <div className="error-content">
                            <h3><i className="fas fa-exclamation-triangle text-danger"></i> Oops! Something went wrong.</h3>

                            <p>
                                We will work on fixing that right away.
                                Meanwhile, you may <Link to="/solicitud">return to dashboard</Link> or try using the search form.
                            </p>

                        </div>
                    </div>

                </section>
            </div>

        </>
    )

}
export default E500