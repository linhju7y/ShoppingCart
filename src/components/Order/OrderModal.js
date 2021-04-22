import React, { useEffect, useState } from "react";
import {
  DialogTitle,
  Dialog,
  DialogContent,
  TextField,
  Button,
  makeStyles,
  Typography,
  Stepper,
  Step,
  StepLabel,
  ListItem,
  ListItemText,
  Divider,
  List,
  Grid,
} from "@material-ui/core/";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import moment from "moment";
import PaymentForm from "./Order/PaymentForm";

const useStyles = makeStyles((theme) => ({
  root: { width: 1000 },
  header: {
    maxWidth: 600,
    margin: "0 auto",
    padding: theme.spacing(4, 2, 2, 2),
  },
  form: {
    maxWidth: 600,
    margin: "10 auto",
    padding: theme.spacing(2, 2, 4, 2),
  },
  fields: {
    margin: theme.spacing(-1),
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      flexGrow: 1,
      margin: theme.spacing(1),
    },
  },
  submitButton: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(5),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  inform: {
    margin: theme.spacing(5, 5, 5, 5),
    width: 800,
    height: 400,
  },
  gridItem: {},
}));

function OrderModal(props) {
  const classes = useStyles();
  const { open, onClose, cart, totalPrice } = props;
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [wishDay, setWishDay] = useState("");
  const [tel, setTel] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  useEffect(() => {
    console.log(totalPrice);
  });
  const steps = getSteps();
  function getSteps() {
    return ["Information", "Payment"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className={classes.inform}>
            <Typography variant="subtitle2">
              <b>Please fill your information</b>
            </Typography>

            <form className={classes.form}>
              <div className={classes.fields}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  name="name"
                  variant="outlined"
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Telephone"
                  name="telephone"
                  variant="outlined"
                  type="tel"
                  onChange={(e) => setTel(e.target.value)}
                />
                <TextField
                  required
                  fullWidth
                  label="Address"
                  name="address"
                  variant="outlined"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <TextField
                  required
                  label="Wishing time receive items"
                  type="datetime-local"
                  defaultValue={moment().format()}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  onChange={(e) => setWishDay(e.target.value)}
                />
              </div>
            </form>
          </div>
        );
      case 1:
        return (
          <div className={classes.inform}>
            <Typography variant="subtitle2">
              <b>Choose your payment</b>
            </Typography>

            <form className={classes.form}>
              <PaymentForm />
            </form>
          </div>
        );
      default:
        return "Unknown step";
    }
  }
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleAllDone = () => {
    window.location.reload();
  };

  return (
    <Dialog maxWidth="100%" onClose={onClose} open={open}>
      <div>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div className={classes.inform}>
              <Typography variant="h5" color="primary">
                <CheckCircleOutlineIcon />
                <span> </span>
                Thank you! Your order has been processed!
              </Typography>

              <form className={classes.form}>
                <div className={classes.fields}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <List>
                        <ListItem>
                          <ListItemText primary="Name" secondary={name} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                          <ListItemText primary="Telephone" secondary={tel} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                        <ListItem>
                          <ListItemText primary="Address" secondary={address} />
                        </ListItem>

                        <Divider variant="inset" component="li" />
                        <ListItem>
                          <ListItemText
                            primary="Order time"
                            secondary={moment().format()}
                          />
                        </ListItem>
                      </List>
                    </Grid>
                    <Grid item xs={6} className={classes.gridItem}>
                      <List>
                        <ListItem>
                          <h2>
                            {" "}
                            <ListItemText
                              primary="TOTAL PAYMENT"
                              secondary={<h1>${totalPrice}</h1>}
                            />
                          </h2>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </List>
                    </Grid>
                  </Grid>
                </div>
              </form>

              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleAllDone}
              >
                All Done
              </Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>
                {getStepContent(activeStep)}
              </Typography>
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                >
                  Back
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                >
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  );
}

export default OrderModal;
