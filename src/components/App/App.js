import React, { Component } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    console.log(this.state.orders)
    getOrders()
      .then(data => this.setState({orders: [data]}))
      .catch(err => console.error('Error fetching:', err));
  }

  setOrders = (data) => {
    this.setState({orders: [...this.state.orders, data]})
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm setOrders={this.setOrders}/>
        </header>
        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;

//orders equal to data and not a react component
//keep conditional rendering in mind