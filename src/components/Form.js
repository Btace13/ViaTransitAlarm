import React, { Component } from 'react';
import {Col, Row, Input, Button} from 'react-materialize';
import './css/form.css';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';



class Form extends Component {
    constructor(){
        super();
        this.state = {
            stopSelected: 0,
            selectedDepartureTime: '',
            notiftyTime: 0,
            selectedTimeInc: '',
            textOrCall: true,
            phoneNumber: 0,
            isDisabled: true
        }
    }
    handleSelectedTime = (event) => {
        this.setState({selectedDepartureTime: event.target.value});
    };
     handleNotifyTime = (event) => {
        this.setState({notiftyTime: event.target.value});
    };
     handleTimeInc = (event) => {
        this.setState({selectedTimeInc: event.target.value});
    };
     handleTextOrCall = (event) => {
        this.setState({textOrCall: event.target.value === 'TEXT' ? true : false});
    };
     handlePhoneNumber = (event) => {
        this.setState({phoneNumber: event.target.value});
    };
    updateParent= () => {
        this.props.updateParent(this.state);
        this.props.sendData();
        this.validate();
    };
     validate = () =>{
       if(this.state.selectedDepartureTime === ''){
           this.alertToast('PLEASE SELECT DEPARTURE TIME');
       }else if(this.state.notiftyTime === 0) {
           this.alertToast('PLEASE PUT WHEN YOU WANT TO BE NOTIFIED');
       } else if(this.state.selectedTimeInc === ''){
               this.alertToast('PLEASE PUT WHEN YOU WANT TO BE NOTIFIED');
       }else if(this.state.phoneNumber === 0){
           this.alertToast('PLEASE ENTER YOUR PHONE NUMBER')
       }else{
           toast.success('NOTIFICATION HAS BEEN SAVED')
       }
     };
      alertToast(message){
         toast.error(message)
     }

    render() {
        const styles = {
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
        };
        const disabledText = {
          color: '#888'
        };
        let times = this.props.departureTimes.map(e => moment(e).format('h:mm a'));

        return (
            <div className={'container'}>
                <Row>
                   <Col style={styles} m={6} s={12}>
                       <Input disabled={this.props.isDisabled ? "disabled": ""} s={12} type='select' label="CHOOSE DEPARTURE TIME" onChange={this.handleSelectedTime}>
                           {
                               times.map(e => <option value={e}>{e}</option>)
                           }
                       </Input>
                   </Col>
                    <Col m={6} s={12} style={{marginBottom: '30px'}}>
                        <Input disabled={this.props.isDisabled} s={6} type={'number'} label="NOTIFICATION TIME" onKeyUp={this.handleNotifyTime}/>
                        <Input disabled={this.props.isDisabled} s={6} type='select' onChange={this.handleTimeInc} defaultValue={'min'}>
                            <option value='min'> MIN </option>
                            <option value='hour'> HOUR </option>
                        </Input>
                    </Col>
                    <Col style={styles} m={6} s={12} className={'centered'}>
                        <p style={this.props.isDisabled ? disabledText: {}}>WOULD YOU LIKE A CALL OR A TEXT?</p>
                        <Input  disabled={this.props.isDisabled ? "disabled": ""} name='group1' type='radio' value='CALL' label='CALL' onClick={this.handleTextOrCall}/>
                        <Input  disabled={this.props.isDisabled ? "disabled": ""} name='group1' type='radio' value='TEXT' label='TEXT' onClick={this.handleTextOrCall} />
                    </Col>
                    <Col style={styles} m={6} s={12}>
                        <p style={this.props.isDisabled ? disabledText: {}}>PLEASE ENTER PHONE NUMBER</p>
                        <Input  disabled={this.props.isDisabled ? "disabled": ""} label="Telephone" validate type='tel' onKeyUp={this.handlePhoneNumber}></Input>
                    </Col>
                    <Button disabled={this.props.isDisabled} onClick={this.updateParent}>Save</Button>
                    <ToastContainer />
                </Row>
            </div>
        );
    }
}

export default Form;
