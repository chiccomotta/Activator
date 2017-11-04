import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';


// Interfaccia della Risposta delle API
interface Risposta {
    openServiceUrl: string;
    loading: boolean;
}

// This works!
export class Home extends React.Component  {

    constructor() {
        super();
    
        // chamata api per prendere Url api Open Service
        fetch('api/Activator/DummyActivation/4116a6c6-6f08-417a-a6c5-aed9acd3ecff')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //this.setState({ openServiceUrl: data.openServiceUrl, loading: false });
            });
    }

    public render() {
        return <div>
            <h1>Hello, world!</h1>
            <p>Welcome to your new single-page application, built with:</p>
        </div>;
    }
}


export interface ICode {
    id: string;
}

export class FetchData extends React.Component<RouteComponentProps<{ id: string }>, Risposta> {
    constructor() {
        super();
        this.state = { openServiceUrl: '', loading: true};

        // chamata api per prendere Url api Open Service
        fetch('api/Home/GetOpenServiceUrl')
            .then(response => response.json() as Promise<Risposta>)
            .then(data => {
                console.log(data);
                this.setState({ openServiceUrl: data.openServiceUrl, loading: false });
            })
            .then(
                () => this.ValidateUser()
            );                
    }


    
    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : '';

        return <div>
            <h1>Chiamata</h1>
            { this.state.openServiceUrl}
            <h2>Risposta</h2>
            <h2>:id is {this.props.match.params.id}</h2>
        </div>;
    }

   
    private ValidateUser()
    {
        // Chiamata alla validate        
        // this.state.openServiceUrl

        fetch('api/Home/DummyActivation/' + this.props.match.params.id)
            .then(response => response.json())
            .then(response => {
                console.log("::::::: RESPONSE");
                console.log(response);
            });
    }


    //private handleErrors(response: any) {
    //    if (!response.ok) {
    //        throw Error(response.statusText);
    //    }
    //    return response;
    //}
}
