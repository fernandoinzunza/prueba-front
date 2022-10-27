import React from 'react';
export default class ClientsTableRow extends React.Component {
    render() {
        return (
                    <tr>
                        <th scope="row">{this.props.index+1}</th>
                        <td>{this.props.fullName}</td>
                        <td>{this.props.numberId}</td>
                        <td><a id={this.props.id} className='btn btn-primary' href={'/accounts/'+this.props.id}>See accounts</a></td>
                    </tr>
        );
    }
}