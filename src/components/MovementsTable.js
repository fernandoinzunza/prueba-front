import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Modal, Button } from 'react-bootstrap'
export default function MovementsTable(props) {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const [movements, setMovements] = useState([]);
    const [movementType, setMovementType] = useState();
    const [showDeposito, setShowDeposito] = useState(false);
    const handleCloseDeposito = () => setShowDeposito(false);
    const [amount, setAmount] = useState(0);
    const handleShowDeposito = () => {
        setShowDeposito(true);
    };
        useEffect(() => {
        async function getMovements() {
            await fetch("https://localhost:7066/Movements/GetByAccount/" + id)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                        setMovements(result);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        }
        getMovements();
    }, []);
    useEffect(() => {
        async function getAccount() {
            await fetch("https://localhost:7066/SavingsAccounts/GetById/" + id)
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result)
                        setAccount(result);
                    },
                    (error) => {
                        console.log(error)
                    }
                );
        }
        getAccount();
    }, []);
    const handleCreateMovement = event => {
        let newAmount = movementType == "0" ? amount * -1 : amount;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: parseFloat(newAmount), movementType: parseInt(movementType), savingsAccountId: id })
        };
        console.log(requestOptions.body)

        fetch('https://localhost:7066/Movements/CreateMovement', requestOptions)
            .then(response => response.json())
            .then(data => {
                setShowDeposito(false);
                if(data === null)
                    alert('Error: Balance is lower than amount')              
                else{
                    alert("Movement created!!")
                    account.balance+=parseInt(newAmount);
                    movements.push(data);
                    }
                

            });
    }

    return (
        <div>
            <Modal
                show={showDeposito}
                onHide={handleCloseDeposito}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create an account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'><input type='text' onChange={event => setAmount(event.target.value)} placeholder="How much money are you going to move?"></input></div>
                    <div className='row mt-2'>
                        <select class="form-select" onChange={event => setMovementType(event.target.value)} aria-label="Default select example">
                            <option selected>Movement type</option>
                            <option value="0">Withdrawal</option>
                            <option value="1">Deposit</option>
                        </select>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeposito}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreateMovement}>Add</Button>
                </Modal.Footer>
            </Modal>
            <div className='card' style={{ height: 500, marginTop: 50, marginRight: 100, marginLeft: 100 }}>
                <div className="card-header">
                    Dashboard
                </div>
                <div className="card-body">
                    <div className='row'>
                        <div className='col-6'><h5 className="card-title">Movements</h5></div>
                        <div className='col-6 justify-content-end'><button className='btn btn-primary btn-sm mb-1' onClick={handleShowDeposito}>Create movement</button></div>
                        <p class="card-text">{'Destiny account: '+(account===null ?'':account.accountNumber)} { ' Balance:'+(account===null ?'':account.balance)}</p>
                    </div>

                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">MovementId</th>
                                <th scope="col">Movement type</th>
                                <th scope="col">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(movements).map((mov, i) => {
                                return (
                                    <tr>
                                        <th scope="row">{i}</th>
                                        <td>{mov.id}</td>
                                        <td>{mov.movementType == 0 ? "RETIRO" : "DEPOSITO"}</td>
                                        <td>{mov.amount}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}