import React from "react";
import Card from "react-credit-cards";
import { TextField, Grid } from "@material-ui/core/";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./utils";

import "react-credit-cards/es/styles-compiled.css";

export default class PaymentForm extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment">
        <div className="App-payment">
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <Card
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={this.handleCallback}
              />
            </Grid>
            <Grid item xs={6}>
              <form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
                <div className={"form-group"}>
                  <TextField
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    label="Card Number"
                    type="tel"
                    name="number"
                    className="form-control"
                    pattern="[\d| ]{16,22}"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                  <span></span>
                  <small>E.g.: 49..., 51..., 36..., 37...</small>
                </div>
                <div className="form-group">
                  <TextField
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    label="Name"
                    type="text"
                    name="name"
                    className="form-control"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <TextField
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      label="Valid Thru"
                      type="tel"
                      name="expiry"
                      className="form-control"
                      pattern="\d\d/\d\d"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </div>
                  <div> </div>
                  <div className="col-6">
                    <TextField
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      label="CVC"
                      type="tel"
                      name="cvc"
                      className="form-control"
                      placeholder="CVC"
                      pattern="\d{3,4}"
                      required
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                  </div>
                </div>
              </form>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
