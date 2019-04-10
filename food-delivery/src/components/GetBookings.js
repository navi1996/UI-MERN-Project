import React, { Component } from "react";
import axios from "axios";
import Redirect from "../../node_modules/react-router-dom/Redirect";

const url = "http://localhost:1050/getAllBookings/";
const url1 = "http://localhost:1050/deleteBooking/";

class GetBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingData: "",
      bookingId: "",
      updateStatus: false,
      errorMessage: "",
      successMessage: ""
    };
  }


  updateBooking = (bid) => {
    /* update the updateStatus and bookingId state with appropriate values */
    this.setState({bookingId : bid, updateStatus : true})
  }

  fetchBooking = () => {
    /* 
      Send an AXIOS GET request to the url http://localhost:1050/getAllBookings/ to fetch all the bookings 
      and handle the success and error cases appropriately 
    */
   axios.get(url).then(response => {
     console.log(response)
     this.setState({bookingData : response.data, errorMessage : ""})
     console.log(this.state.bookingData)
    }).catch(error => {
      if (error.status === 404) {
        this.setState({ errorMessage: error.res.data.message })
      }
      else {
        this.setState({ errorMessage: "Please start your Express server" })
      }
    })
  }

  componentDidMount(){
    this.fetchBooking()
  }
  deleteBooking = (id) => {
    /*
      Send an AXIOS DELETE request to the url http://localhost:1050/deleteBooking/ to delete the selected booking
      and handle the success and error cases appropriately 
    */
   axios.delete(url1+id).then(response => {
     console.log(response)
     this.setState({successMessage : response.data.message, errorMessage:""})
      this.fetchBooking()
     console.log(this.state.successMessage)
   }).catch(err => {
     this.setState({errorMessage : err.response.data.message})
   })
  }

  render() {
    const { bookingData } = this.state;
    var red = null
    if(this.state.updateStatus){
      red = <Redirect to={"/updateBooking/"+this.state.bookingId} push/>
    }
    const Table = ({ list }) => (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Booking Id</th>
            <th>Total Tickets</th>
            <th>Total Cost</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map(item => (
            <tr key={item.bookingId} className="text text-center">
              <td>
                <span>{item.customerId}</span>
              </td>
              <td>
                <span>{item.bookingId}</span>
              </td>
              <td>
                <span>{item.noOfTickets}</span>
              </td>
              <td>
                <span>{item.bookingCost}</span>
              </td>
              <td style={{width:220}}>
               
                <button type="submit" className="btn btn-success" onClick={()=>{this.updateBooking(item.bookingId)}}>Update</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button type="submit" className="btn btn-danger" onClick={()=>{this.deleteBooking(item.bookingId)}}>Cancel</button>
     
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    
    return (
      <div className="GetBooking">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <br />
            <div className="card">
              <div className="card-header bg-custom">
                <h3 align="center">Booking Details</h3>
              </div>
              <div className="card-body">
                {/* code here to get the view as shown in QP for GetBooking component */}
                {/* Display booking data in tabular form */}
                {/* Display error message if the server is not running */}
                {/* code appropriately to redirect on click of update button */}
                {bookingData ? <Table list={bookingData} /> : null}
                <span className="text text-success" name="successMessage">
                  {this.state.successMessage}</span>
                  <p className="text text-center text-danger" name="errorMessage">
                  {this.state.errorMessage}</p>
              </div>
              {red}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default GetBooking;
