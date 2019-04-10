import React, { Component } from "react";
import axios from "axios";

const url = "http://localhost:1050/updatebooking/";

class UpdateBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                bookingId: "",
                noOfTickets: ""
            },
            formErrorMessage: {
                bookingId: "",
                noOfTickets: ""
            },
            formValid: {
                bookingId: true,
                noOfTickets: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            id: this.props.match.params.bookingId
        };
    }


    updateBooking = () => {
        /* 
          Make a axios PUT request to http://localhost:1050/updatebooking/ to update the number of tickets 
          for the selected bookingId and handle the success and error cases appropriately 
        */
       this.setState({errorMessage : "", successMessage : ""})
       axios.put(url+this.state.id,this.state.form).then(response => {
           this.setState({successMessage : response.data.message, errorMessage : ""})
       }).catch(err => {
        if(err.response){
        this.setState({ errorMessage: err.response.data.message, successMessage: "" })
        }
        else{
          this.setState({ errorMessage: err.message, successMessage: "" })
        }
      })
    }

    handleSubmit = (event) => {
        /* prevent page reload and invoke updateBooking() method */
        event.preventDefault()
        this.updateBooking()
    }

    componentDidMount(){
        var form = this.state.form
        form.bookingId = this.state.id
        console.log(form)
        this.setState({form : form})
    }
    handleChange = (event) => {
        /* 
          invoke whenever any change happens any of the input fields
          and update form state with the value. Also, Inoke validateField() method to validate the entered value
        */
       var n = event.target.name
       var v = event.target.value
       var ob = this.state.form
       if (n === "bookingId") {
        ob.bookingId = this.state.id
        this.setState({ form: ob })
       }
       if (n === "noOfTickets") {
         ob.noOfTickets = v
         this.setState({ form: ob })
       }
       this.validateField(event.target.name, v)
    }

    validateField = (fieldName, value) => {
        /* Perform Validations and assign error messages, Also, set the value of buttonActive after validation of the field */
        var formErrorMessage = this.state.formErrorMessage
        var formValid = this.state.formValid
        if (fieldName === "noOfTickets") {
          if (value === "") {
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
        else  if (fieldName === "bookingId") {
            formErrorMessage.bookingId = ""
            formValid.bookingId = true
        }
        console.log(formValid.noOfTickets)
        if (formValid.noOfTickets && formValid.bookingId) {
          formValid.buttonActive = true
        }
        else{
            formValid.buttonActive = false
        }
        console.log(formValid.buttonActive)
        this.setState({ formErrorMessage: formErrorMessage, formValid: formValid })
      }
    

    render() {
        return (
            <React.Fragment>
                <div className="UpdateBooking">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <br />
                            <div className="card">
                                <div className="card-header bg-custom">
                                    <h4>Update Flight Booking for id: {this.state.id}</h4>
                                </div>
                                <div className="card-body">
                                    {/* code appropriately to render the form as shown in QP */}
                                    {/* display the success and error messages appropriately */}
                                    <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="bookingId">Customer Id:</label>
                    <input type="text" className="form-control" id="bookingId" placeholder={this.state.form.bookingId} name="bookingId" disabled/>
                    <div className="text text-danger" name="bookingIdError">{this.state.formErrorMessage.bookingId}</div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="noOfTickets">No Of Tickets:</label>
                    <input type="number" className="form-control" id="noOfTickets" placeholder="min-1 max-10 " name="noOfTickets" onChange={this.handleChange}/>
                    <div className="text text-danger" name="noOfTicketsError">{this.state.formErrorMessage.noOfTickets}</div>
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={!this.state.formValid.buttonActive}>Update Booking</button>
                </form>
                <span className="text text-success" name="successMessage">
                  {this.state.successMessage}</span>

                <span className="text text-danger" name="errorMessage">
                  {this.state.errorMessage}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UpdateBooking;