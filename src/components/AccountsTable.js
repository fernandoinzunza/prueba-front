import React, { useState, useEffect } from 'react';
import AccountsTableRow from './AccountsTableRow';
import { Modal, Button } from 'react-bootstrap'
import { useParams } from 'react-router';
export default function AccountsTable(props) {
    const { id } = useParams();
    const [show, setShow] = useState(false);

    const [accountNumber,setAccountNumber] = useState('');
    const [accountId,setAccountId] = useState(0);
    const [accounts, setAccounts] = useState([]);
    const [clientInfo, setClientInfo] = useState({});
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
   
   
    const handleCreateAccount = () =>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accountNumber: accountNumber,clientId:id })
        };
        fetch('https://localhost:7066/SavingsAccounts/CreateSavingsAccount', requestOptions)
            .then(response => response.json())
            .then(data => {
                setShow(false);
                alert(data.id)
                accounts.push(data);
                
            });
    }
    useEffect(() => {
        async function getAccounts() {
            await fetch("https://localhost:7066/SavingsAccounts/SavingsAccounts/" + id)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                        setAccounts(result);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        }
        getAccounts();
    }, []);
    useEffect(() => {
        async function getClientInfo() {
            await fetch("https://localhost:7066/Clients/GetById/" + id)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                        setClientInfo(result);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        }
        getClientInfo();
    }, [])
    return (
        <div>
            
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create an account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'><input type='text' onChange={event => setAccountNumber(event.target.value)} placeholder="Account number"></input></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateAccount}>Add</Button>
                </Modal.Footer>
            </Modal>
            <div className='card' style={{ height: 500, marginTop: 50, marginRight: 100, marginLeft: 100 }}>
                <div className="card-header">
                    Dashboard
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-6'><h5 className="card-title">Accounts</h5></div>
                        <div className='col-6 justify-content-end'><button className='btn btn-primary btn-sm mb-1' onClick={handleShow}>Add Account</button></div>
                        <p class="card-text">{'Client: ' + clientInfo.fullName}</p>
                    </div>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Account Number</th>
                                <th scope="col">Balance</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(accounts).map((account, i) => {
                                return <AccountsTableRow key={account.id} id={account.id} index={i} number={account.accountNumber} balance={account.balance}></AccountsTableRow>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}