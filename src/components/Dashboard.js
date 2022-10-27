import React, { useState,useEffect } from 'react';
import ClientsTable from './ClientsTable';
import { Modal, Button } from 'react-bootstrap'
export default function Dashboard(props) {
    const [show, setShow] = useState(false);
    const[fullName,setFullName] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCreateClient = () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName: fullName })
        };
        fetch('https://localhost:7066/Clients/CreateClient', requestOptions)
            .then(response => response.json())
            .then(data => {
                setShow(false);
                alert("Client created!!")
                props.clients.push(data);
                
            });
    }
    return (
        <div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'><input type='text' onChange={event => setFullName(event.target.value)} placeholder="Enter the client's name"></input></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateClient}>Add</Button>
                </Modal.Footer>
            </Modal>
            <div className='card' style={{ height: 500, marginTop: 50, marginRight: 100, marginLeft: 100 }}>
                <div className="card-header">
                    Dashboard
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-6'><h5 className="card-title">Clients</h5></div>
                        <div className='col-6 justify-content-end'><button className='btn btn-primary btn-sm mb-1' onClick={handleShow}>Add Client</button></div>
                    </div>
                    <ClientsTable clients={props.clients}></ClientsTable>
                </div>
            </div>
        </div>

    );

}