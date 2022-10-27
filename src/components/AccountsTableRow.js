import React, { useState, useEffect } from 'react';
import { Modal } from 'bootstrap';
import "bootstrap/dist/css/bootstrap.css";
export default function AccountsTableRow(props) {
    console.log(props.id)
    console.log(props.number);
    return (
        <tr>
            <th scope="row">{props.index + 1}</th>
            <td>{props.number}</td>
            <td>{props.balance}</td>
            <td><a id={props.id}  className='btn btn-success' href={'/account/'+props.id+'/movements'}>See movements</a></td>
        </tr>

    );
}