import React from 'react';
import ClientsTableRow from './ClientsTableRow';
export default class ClientsTable extends React.Component {
    render() {
        return (
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Number Id</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.clients.map((client,i)=>{
                       return <ClientsTableRow key={client.id} id={client.id} index={i} fullName={client.fullName} numberId={client.id}></ClientsTableRow>
                    })}
                </tbody>
            </table>
        );
    }
}