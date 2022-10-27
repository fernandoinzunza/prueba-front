import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountsTable from './components/AccountsTable';
import MovementsTable from './components/MovementsTable';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    };
  }
  componentDidMount() {
    fetch("https://localhost:7066/Clients/GetClients")
      .then(res => res.json())
      .then(
        (result) => {
          //console.log(result)
          this.setState({
            clients: [...result]
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error)
        }
      );

  }
  render() {
    return (

      <Router>
        <Routes>
          <Route path="/" element={<Dashboard clients={this.state.clients}></Dashboard>} />
          <Route exact path="/accounts/:id" element={
            <AccountsTable />} />
          <Route path="/account/:id/movements" element={<MovementsTable></MovementsTable>}></Route>
        </Routes>
      </Router>
    )

  }
}

export default App;
