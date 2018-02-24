import React, { Component } from 'react';
import {Col, Row, Input, Button, Tab, Tabs} from 'react-materialize';
import './css/form.css';


class Form extends Component {
    constructor(){
        super();
        this.state = {
            inBound: '',
            stopSelected: 0,
            departureTimes: [],
            selectedDepatureTime: '',
            notiftyTime: 0,
            selectedTimeInc: '',
            textOrCall: true,
            phoneNumber: 0
        }
    }
    render() {
        const styles = {
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'center',
        };
        let handleChangeDirection = (event) => {
            this.setState({inBound: event.target.title});
            console.log(this.state.inBound);
        };
        let handleSelectedTime = (event) => {
            this.setState({selectedDepatureTime: event.target.value});
        };
        let handleNotifyTime = (event) => {
            this.setState({notiftyTime: event.target.value});
        };
        let handleTimeInc = (event) => {
            this.setState({selectedTimeInc: event.target.value});
        };
        let handleTextOrCall = (event) => {
            this.setState({textOrCall: event.target.value == 'TEXT' ? true : false});
        };
        let handlePhoneNumber = (event) => {
            this.setState({phoneNumber: event.target.value});
        };
        let displayState = () => {
          console.log(this.state);
        };
        return (
            <div className={'container'}>
                <Tabs className={'switchTab'}>
                    <Tab title="Inbound" active onClick={handleChangeDirection}></Tab>
                    <Tab title="Outbound" onClick={handleChangeDirection}></Tab>
                </Tabs>
                <Row>
                   <Col style={styles} m={6} s={12}>
                       <Input s={12} type='select' label="CHOOSE DEPARTURE TIME" onChange={handleSelectedTime}>
                           <option value='4:00'>4:00PM</option>
                           <option value='6:00'>6:00PM</option>
                           <option value='7:30'>7:30PM</option>
                       </Input>
                   </Col>
                    <Col m={6} s={12} style={{marginBottom: '30px'}}>
                        <Input s={6} type={'number'} label="NOTIFICATION TIME" onKeyUp={handleNotifyTime}/>
                        <Input s={6} type='select' onChange={handleTimeInc}>
                            <option value='min'> MIN </option>
                            <option value='hour'> HOUR </option>
                        </Input>
                    </Col>
                    <Col style={styles} m={6} s={12} className={'centered'}>
                        <p>WOULD YOU LIKE A CALL OR A TEXT?</p>
                        <Input name='group1' type='radio' value='CALL' label='CALL' onClick={handleTextOrCall} />
                        <Input name='group1' type='radio' value='TEXT' label='TEXT' onClick={handleTextOrCall} />
                    </Col>
                    <Col style={styles} m={6} s={12}>
                        <p>PLEASE ENTER PHONE NUMBER</p>
                        <Input label="Telephone" validate type='tel' onKeyUp={handlePhoneNumber}></Input>
                    </Col>
                    <Button onClick={displayState}>Save</Button>
                </Row>
            </div>
        );
    }
}

export default Form;
