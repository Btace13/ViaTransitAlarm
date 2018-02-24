import React, { Component } from 'react';
import {Col, Row, Input, Button} from 'react-materialize';
import './css/form.css';
import { ToastContainer, toast } from 'react-toastify';


class Form extends Component {
    constructor(){
        super();
        this.state = {
            inBound: 'Inbound',
            stopSelected: 0,
            selectedDepatureTime: '',
            notiftyTime: 0,
            selectedTimeInc: '',
            textOrCall: true,
            phoneNumber: 0
        }
    }
     handleChangeDirection = (event) => {
        this.setState({inBound: event.target.id});
    };
    updateParent = (e) => {
        this.props.updateParent(e);
    };
    handleSelectedTime = (event) => {
        this.setState({selectedDepatureTime: event.target.value});
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
     displayState = ()=>{
    this.props.updateParent(this.state);
         this.validate();
    };
     validate = () =>{
       if(this.state.selectedDepatureTime === ''){
           this.alertToast('PLEASE SELECT DEPARTURE TIME');
       }else if(this.state.notiftyTime === 0){
           this.alertToast('PLEASE PUT WHEN YOU WANT TO BE NOTIFIED');
       }else if(this.state.phoneNumber === 0){
           this.alertToast('PLEASE ENTER YOUR PHONE NUMBER')
       }else{
           toast.success('Thank You!')
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
        return (
            <div className={'container'}>
                {/*<Tabs className={'switchTab'}>*/}
                    {/*<Tab title="Inbound" active onChange={handleChangeDirection}></Tab>*/}
                    {/*<Tab title="Outbound" onChange={handleChangeDirection}></Tab>*/}
                {/*</Tabs>*/}
                <ul className="tabs" style={{marginBottom: '30px'}}>
                <li className="tab"><a onClick={this.handleChangeDirection} id={'Inbound'} className="active">Inbound</a></li>
                <li className="tab"><a onClick={this.handleChangeDirection} id={'Outbound'}>Outbound</a></li>
            </ul>
                <Row>
                   <Col style={styles} m={6} s={12}>
                       <Input s={12} type='select' label="CHOOSE DEPARTURE TIME" onChange={this.handleSelectedTime}>
                           <option value='4:00'>4:00PM</option>
                           <option value='6:00'>6:00PM</option>
                           <option value='7:30'>7:30PM</option>
                       </Input>
                   </Col>
                    <Col m={6} s={12} style={{marginBottom: '30px'}}>
                        <Input s={6} type={'number'} label="NOTIFICATION TIME" onKeyUp={this.handleNotifyTime}/>
                        <Input s={6} type='select' onChange={this.handleTimeInc}>
                            <option value='min'> MIN </option>
                            <option value='hour'> HOUR </option>
                        </Input>
                    </Col>
                    <Col style={styles} m={6} s={12} className={'centered'}>
                        <p>WOULD YOU LIKE A CALL OR A TEXT?</p>
                        <Input name='group1' type='radio' value='CALL' label='CALL' onClick={this.handleTextOrCall}/>
                        <Input name='group1' type='radio' value='TEXT' label='TEXT' onClick={this.handleTextOrCall} />
                    </Col>
                    <Col style={styles} m={6} s={12}>
                        <p>PLEASE ENTER PHONE NUMBER</p>
                        <Input label="Telephone" validate type='tel' onKeyUp={this.handlePhoneNumber}></Input>
                    </Col>
                    <Button onClick={this.displayState}>Save</Button>
                    <ToastContainer />
                </Row>
            </div>
        );
    }
}

export default Form;
