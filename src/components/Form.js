import React, { Component } from "react";
import { Col, Row, Input, Button } from "react-materialize";
import "./css/form.css";
import { ToastContainer, toast } from "react-toastify";
import moment from "moment";

class Form extends Component {
    // data = {
    //     selectedDepartureTime: "",
    //     notifyTime: 0,
    //     selectedTimeInc: "min",
    //     textOrCall: "",
    //     phoneNumber: 0
    // };
    constructor(props) {
        super(props);
        this.state = {
            selectedDepartureTime: "",
            notifyTime: 0,
            selectedTimeInc: "min",
            textOrCall: "",
            phoneNumber: 0,
            isDisabled: true
        };
    }

    componentDidMount() {
        // ...
    }

    handleSelectedTime = event => {
        this.setState({ selectedDepartureTime: event.target.value });
        // this.data.selectedDepartureTime = event.target.value;
        console.log("handleSelectedTime()");
    };
    handleNotifyTime = event => {
        this.setState({ notifyTime: event.target.value });
        // this.data.notifyTime = event.target.value;
        console.log("handleNotifyTime()");
    };
    handleTimeInc = event => {
        this.setState({ selectedTimeInc: event.target.value });
        // this.data.selectedTimeInc = event.target.value;
        console.log("handleTimeInc()");
    };
    handleTextOrCall = event => {
        this.setState({
            textOrCall: (event.target.value === "TEXT")
        });
        // this.data.textOrCall = (event.target.value === "TEXT");
        console.log("handleTextOrCall()");
    };
    handlePhoneNumber = event => {
        this.setState({ phoneNumber: event.target.value });
        // this.data.phoneNumber = event.target.value;
        console.log("handlePhoneNumber()");
    };
    updateParent = () => {
        console.log("updateParent()")
        // console.log(JSON.stringify(this.data, null, 4));
        this.props.updateParent(this.state);
    };
    validate = () => {
        if (this.state.selectedDepartureTime === "") {
            this.alertToast("PLEASE SELECT DEPARTURE TIME");
        } else if (this.state.notifyTime === 0) {
            this.alertToast("PLEASE PUT WHEN YOU WANT TO BE NOTIFIED");
        } else if (this.state.selectedTimeInc === "") {
            this.alertToast("PLEASE PUT WHEN YOU WANT TO BE NOTIFIED");
        } else if (this.state.phoneNumber === 0) {
            this.alertToast("PLEASE ENTER YOUR PHONE NUMBER");
        } else if (this.state.textOrCall === "") {
            this.alertToast("PLEASE SELECTED THE NOTIFICATION TYPE");
        }
        else {
            this.updateParent();
            toast.success("NOTIFICATION HAS BEEN SAVED");
        }
    };
    alertToast(message) {
        toast.error(message);
    }

    render() {
        this.state.selectedDepartureTime = this.props.departureTimes[0]; // set default value from props
        const styles = {
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        };
        const disabledText = {
            color: "#888"
        };

        return (
            <div className={"container"}>
                <Row>
                    <Col style={styles} m={6} s={12}>
                        <Input
                            disabled={this.props.isDisabled ? "disabled" : ""}
                            s={12}
                            type="select"
                            label="CHOOSE DEPARTURE TIME"
                            onChange={this.handleSelectedTime}
                        >
                            {this.props.departureTimes.map((e, index) => (
                                <option key={index} value={e}>
                                    {moment(e).format("h:mm a")}
                                </option>
                            ))}
                        </Input>
                    </Col>
                    <Col m={6} s={12} style={{ marginBottom: "30px" }}>
                        <Input
                            disabled={this.props.isDisabled}
                            s={6}
                            type={"number"}
                            label="NOTIFICATION TIME"
                            onChange={this.handleNotifyTime}
                        />
                        <Input
                            disabled={this.props.isDisabled}
                            s={6}
                            type="select"
                            onChange={this.handleTimeInc}
                            defaultValue={"min"}
                        >
                            <option value="min"> MIN </option>
                            <option value="hour"> HOUR </option>
                        </Input>
                    </Col>
                    <Col style={styles} m={6} s={12}>
                        <p style={this.props.isDisabled ? disabledText : {}}>
                            PLEASE ENTER PHONE NUMBER
                        </p>
                        <Input
                            disabled={this.props.isDisabled ? "disabled" : ""}
                            label="Telephone"
                            type="tel"
                            onChange={this.handlePhoneNumber}
                        />
                    </Col>
                    <Col style={styles} m={6} s={12} className={"centered"}>
                        <p style={this.props.isDisabled ? disabledText : {}}>
                            WOULD YOU LIKE A CALL OR A TEXT?
                        </p>
                        <Input
                            disabled={this.props.isDisabled ? "disabled" : ""}
                            name="group1"
                            type="radio"
                            value="CALL"
                            label="CALL"
                            onClick={this.handleTextOrCall}
                        />
                        <Input
                            disabled={this.props.isDisabled ? "disabled" : ""}
                            name="group1"
                            type="radio"
                            value="TEXT"
                            label="TEXT"
                            onClick={this.handleTextOrCall}
                        />
                    </Col>
                    <Button
                        disabled={this.props.isDisabled}
                        onClick={this.validate}
                    >
                        Save Notification
                    </Button>
                    <ToastContainer />
                </Row>
            </div>
        );
    }
}

export default Form;
