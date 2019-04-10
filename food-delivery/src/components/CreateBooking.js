import React, { Component } from "react";
import axios from "axios";

const url = "http://localhost:1050/bookFlight/";
const url1 = "http://localhost:1050/getFlightIds/";

class CreateBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        customerId: "",
        flightId: "",
        noOfTickets: ""
      },
      formErrorMessage: {
        customerId: "",
        flightId: "",
        noOfTickets: ""
      },
      formValid: {
        customerId: false,
        flightId: false,
        noOfTickets: false,
        buttonActive: false
      },
      flightIds: [],
      errorMessage: "",
      successMessage: ""
    };
  }

  submitBooking = () => {
    /* 
      Make a POST request to http://localhost:1050/bookFlight/ with form data 
      and handle success and error cases 
    */
   this.setState({ errorMessage: "", successMessage: "" })
    axios.post(url,this.state.form).then(response => {
      this.setState({ successMessage: response.data.message, errorMessage: "" })
    }).catch(err => {
      this.setState({ errorMessage: err.response.data.message, successMessage: "" })
      
    })
  }

  fetchFlightIds = () => {
    /* 
      Make a axios GET request to http://localhost:1050/getFlightIds/ to fetch the flightId's array 
      from the server and handle the success and error cases appropriately 
    */
   this.setState({ flightIds: [] });
    axios.get(url1).then(res => {
      this.setState({ flightIds: res.data, errorMessage: "" })
    }).catch(error => {
      if (error.status === 404) {
        this.setState({ errorMessage: error.res.data.message, flightIds : []})
      }
      else {
        this.setState({ errorMessage: "Please start your Express server", flightIds : []})
      }
    })
  }
  componentDidMount() {
    this.fetchFlightIds()
  }

  handleSubmit = event => {
    /* prevent page reload and invoke submitBooking() method */
    event.preventDefault()
    this.submitBooking()
  }

  handleChange = event => {
    event.preventDefault()
    var n = event.target.name
    var v = event.target.value
    var form = this.state.form
    form[n] = v
    this.setState({form : form})
    this.validateField(n, v)
    /* 
      invoke whenever any change happens any of the input fields
      and update form state with the value. Also, Inoke validateField() method to validate the entered value
    */
  }

  validateField = (fieldName, value) => {
    /* Perform Validations and assign error messages, Also, set the value of buttonActive after validation of the field */
    var formErrorMessage = this.state.formErrorMessage
    var formValid = this.state.formValid
    if (fieldName === "customerId") {
      if (value.length === 0) {
        formErrorMessage.customerId = "field required"
        formValid.customerId = false
      }
      else if (!value.match("^[A-Z][0-9]{4}$")) {
        formErrorMessage.customerId = "Customer id must start with alphabet followed by 4 digits"
        formValid.customerId = false
      }
      else {
        formErrorMessage.customerId = ""
        formValid.customerId = true
      }
    }
    else if (fieldName === "noOfTickets") {
      if (value.length === 0) {
        formErrorMessage.noOfTickets = "field required"
        formValid.noOfTickets = false
      }
      else if (!(value > 0 && value < 10)) {

        formErrorMessage.noOfTickets = "Number of tickets should be greater than 0 and less than 10"
        formValid.noOfTickets = false
      }
      else {
        formErrorMessage.noOfTickets = ""
        formValid.noOfTickets = true
      }
    }


    else if (fieldName === "flightId") {
      if (value === "--Select Flight--") {
        formErrorMessage.flightId = "field required"
        formValid.flightId = false
      }
      else {
        formErrorMessage.flightId = ""
        formValid.flightId = true
      }
    }
    if (formValid.flightId && formValid.customerId && formValid.noOfTickets) {
      formValid.buttonActive = true
    }
    this.setState({ formErrorMessage: formErrorMessage, formValid: formValid, successMessage : "" })
  }

  render() {
    return (
      <div className="CreateBooking">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <br />
            <div className="card">
              <div className="card-header bg-custom">
                <h3>Flight Booking Form</h3>
              </div>
              <div className="card-body">
                {/* create form as per the view given in screenshots */}
                {/* Display success or error messages as given in QP */}

                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="customerId">Customer Id:</label>
                    <input type="text" className="form-control" id="customerId" placeholder="e.g.- P1001" name="customerId" onChange={this.handleChange} />
                    <div className="text text-danger" name="customerIdError">{this.state.formErrorMessage.customerId}</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="flightId">Flight Id :</label>
                    <select name="flightId" id="flightId" className="custom-select form-control" value={this.state.form.flightId} onChange={this.handleChange}>
                      <option value="--Select Flight--">--Select Flight--</option>
                      {this.state.flightIds.map(fid => { return <option key={fid} value={fid}>{fid}</option> })}
                    </select>
                    <span className="text text-danger" name="flightIdError">{this.state.formErrorMessage.flightId}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="noOfTickets">Number Of tickets:</label>
                    <input type="number" className="form-control" id="noOfTickets" placeholder="min-1 max-10 " name="noOfTickets" value={this.state.form.noOfTickets} onChange={this.handleChange} />
                    <span className="text text-danger" name="noOfTicketsError">{this.state.formErrorMessage.noOfTickets}</span>
                  </div>
                  <div className="form-group">
                  <button type="submit" className="btn btn-primary" name="bookFlight" disabled={!this.state.formValid.buttonActive}>Book Flight</button>
                  </div>
                  <br/>
                </form>
                <span className="text-success text-bold" name="successMessage">
                  {this.state.successMessage}</span>

                <span className="text-danger text-bold" name="errorMessage">
                  {this.state.errorMessage}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBooking;
