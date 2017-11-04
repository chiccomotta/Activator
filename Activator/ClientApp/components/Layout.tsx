import * as React from 'react';
import { FetchData, ICode, Home } from "./FetchData";
import { NavLink } from "react-router-dom";


export interface LayoutProps {
    children?: React.ReactNode;    
}

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>                                
                <ul className='nav navbar-nav'>
                    <li>
                        <NavLink to={'/home'} activeClassName='active'>
                            <span className='glyphicon glyphicon-th-list'></span> Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className='col-sm-9'>
            </div>
        </div>;
    }
}

//export class Layout extends React.Component<LayoutProps, {}> {
//    public render() {
//        return <Home />
//    }
//}