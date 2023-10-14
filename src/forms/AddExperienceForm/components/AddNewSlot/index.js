
import { Button, DatePicker, Input, TimePicker } from 'antd';
import './index.scss';
import { useEffect, useState } from 'react';
import moment from 'moment';


//Slot form for a single event
export const AddNewEventSlot = ({ onAdd, classification, setSlotDiv, ...props }) => {
    //set the value of classification in the payload in classification

    const [ payload1, setpayload1 ] = useState({ dateTimeSingleEvent: '', noOfSeats: 0, classification: '' });
    const [ enable, setEnable ] = useState(false);
    //check if the values in payload are not empty and enable the add button

    useEffect(() => {
        if (payload1.dateTimeSingleEvent != '' && payload1.noOfSeats > 0 && payload1.classification != '') {
            setEnable(true);
        }
        else {
            setEnable(false);
        }
    }, [ payload1 ]);




    useEffect(() => {
        setpayload1({ ...payload1, classification: classification });
    }, [ classification ]);
    //set the value change from datepicker in the payload in dateTimeSingleEvent
    const onChange = (val) => {
        //check if there is a value in date
        if (val) {
            const isoString = val.toISOString();
            const dateWithZeroSecondsAndMilliseconds = new Date(isoString);
            dateWithZeroSecondsAndMilliseconds.setSeconds(0);
            dateWithZeroSecondsAndMilliseconds.setMilliseconds(0);


            setpayload1({ ...payload1, dateTimeSingleEvent: dateWithZeroSecondsAndMilliseconds.toISOString() });
        }
        else {
            setpayload1({ ...payload1, dateTimeSingleEvent: '' });
        }
    };
    console.log('single event', payload1, classification);
    const disabledDate = (currentDate) => {
        return currentDate && currentDate < moment().startOf('day');
    }

    return (
        <div >
            <h3 className='ml-5' style={{ marginTop: '20px', fontWeight: 'bold' }}>Adding a Single Slot</h3>


            <p className="mb-10 mt-24 field-label">Select date and time of the event</p>
            <DatePicker
                showTime={{ use12Hours: true, format: 'HH:mm a' }}
                format={'MM/DD/YYYY hh:mm a'}
                disabledDate={disabledDate}
                allowClear
                onChange={onChange}
                // defaultValue={props.defaultValue? moment(props.defaultValue):''}
                placeholder='Select date and time'
            />

            <p className="mb-10 mt-24 field-label">Enter no of seats for the event</p>
            {/*No of sseats should be of type number when set in payload */}
            <Input
                type="number"
                onChange={(e) => { setpayload1({ ...payload1, noOfSeats: e?.target.value }) }}
                placeholder="Enter no of seats"
            />
            <br />

            <small className="mb-10 mt-5 field-label">*Button Will enable after both fields are filled</small>
            <Button

                disabled={!enable}
                onClick={(e) => {
                    e.preventDefault();
                    onAdd('singleslot', payload1);
                    setTimeout(() => setpayload1({ dateTimeSingleEvent: '', noOfSeats: 0, classification: classification }), 400);
                    //   setSlotDiv(false)
                }}
                className="mt-5 ml-5"
                type="primary"
                htmlType="submit"
            >
                Add Slot
            </Button>
        </div>
    );
};

//Slot form for a recurring event
export const AddNewRecEventSlot = ({ onAdd, classification, setSlotDiv, ...props }) => {
    const [ payload1, setpayload1 ] = useState({
        startRecEvt: '', endRecEvt: '',
        dailyTimeRecEvt: '', noOfSeats: '', classification: ''
    });
    const [ enable, setEnable ] = useState(false);
    //check if the values in payload are not empty and enable the add button

    useEffect(() => {
        if (payload1.startRecEvt != '' && payload1.endRecEvt != '' && payload1.dailyTimeRecEvt != '' && payload1.noOfSeats > 0 && payload1.classification != '') {
            setEnable(true);
        }
        else {
            setEnable(false);
        }
    }, [ payload1 ]);

    const disabledDate = (currentDate) => {
        return currentDate && currentDate < moment().startOf('day');
    }

    useEffect(() => {
        setpayload1({ ...payload1, classification: classification });
    }, [ classification ]);



    console.log('rec event', payload1);

    return (
        <div >
            <h3 className='ml-5' style={{ marginTop: '20px', fontWeight: 'bold' }}>Adding Slot for Recurring Event</h3>
            <p className='mt-5 ml-5'>Use this to generate multiple slots for this event at a single time</p>
            <p className="mb-10 mt-24 field-label">Select start date of Recurring event</p>
            <DatePicker
                // showTime={{ use12Hours: true, format: 'HH:mm a' }}
                format={'MM/DD/YYYY'}
                disabledDate={disabledDate}
                allowClear
                onChange={(e) => {
                    if (e) {
                        const a = new Date(e?.toISOString())
                        a.setHours(14);
                        a.setMinutes(30);

                        setpayload1({ ...payload1, startRecEvt: a?.toISOString().split('T')[ 0 ] })
                    } else { setpayload1({ ...payload1, startRecEvt: '' }) }
                }}
                // defaultValue={props.defaultValue? moment(props.defaultValue):''}
                placeholder='Select date and time'
            />
            <p className="mb-10 mt-24 field-label">Select end date of Recurring event</p>
            <DatePicker
                // showTime={{ use12Hours: true, format: 'HH:mm a' }}
                format={'MM/DD/YYYY'}
                disabledDate={disabledDate}
                allowClear
                onChange={(e) => {
                    if (e) {
                        const a = new Date(e?.toISOString())
                        a.setHours(14);
                        a.setMinutes(30);
                        setpayload1({ ...payload1, endRecEvt: a?.toISOString().split('T')[ 0 ] })
                    } else { setpayload1({ ...payload1, endRecEvt: '' }) }
                }}
                // defaultValue={props.defaultValue? moment(props.defaultValue):''}
                placeholder='Select date and time'
            />
            <div className="flex justify-between">

                <section className="flex-1 mr-5">
                    <p className="mb-10 mt-24 field-label">Daily Time</p>
                    <TimePicker
                        showTime={{ use12Hours: false, format: 'HH:mm a' }}
                        format={'hh:mm a'}
                        allowClear
                        onChange={(e) => {
                            if (e) {


                                const options = {
                                    timeZone: 'America/New_York', // specify the timezone as IST
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    second: 'numeric'
                                };

                                const t = new Date(e.toLocaleString('en-IN',options)).getHours().toString().padStart(2, '0') + ":" + new Date(e.toLocaleString('en-US',options)).getMinutes().toString().padStart(2, '0')

                                console.log('this is a test cosnole.log', t)
                                setpayload1({ ...payload1, dailyTimeRecEvt: t })
                            } else { setpayload1({ ...payload1, dailyTimeRecEvt: '' }) }
                        }}
                        // defaultValue={props.defaultValue? moment(props.defaultValue):''}
                        placeholder='Select date and time'
                    />

                </section>
                <section className="flex-1 ml-5">

                    <p className="mb-10 mt-24 field-label">No of seats</p>
                    <Input
                        type="number"
                        value={payload1.noOfSeats}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={(e) => {
                            setpayload1({ ...payload1, noOfSeats: e?.target?.value });
                        }}
                        placeholder={'Enter no of seats'}
                    />
                </section>
            </div>
            <br />
            <small className="mb-10 mt-5 field-label">*Button Will enable after all fields are filled</small>
            <Button
                disabled={!enable}
                onClick={(e) => {
                    e.preventDefault();
                    onAdd('multislot', payload1);
                    setTimeout(() => setpayload1({
                        startRecEvt: '', endRecEvt: '',
                        dailyTimeRecEvt: '', noOfSeats: '', classification: classification
                    }), 400);
                    // setSlotDiv(false)
                }}
                className=""
                type="primary"
                htmlType="submit"
            >
                Add Slot
            </Button>
        </div>
    );
};

//Slot form for a masterclass

export const AddNewMasterclassSlot = ({ onAdd, classification, setSlotDiv, ...props }) => {
    const [ payload1, setpayload1 ] = useState({
        startMasterclass: '',
        dailyTimeMasterclass: '', endMasterclass: '', noOfSeats: '', classification: ''
    });

    const [ enable, setEnable ] = useState(false);
    //check if the values in payload are not empty and enable the add button

    useEffect(() => {
        if (payload1.startMasterclass != '' && payload1.endMasterclass != '' && payload1.dailyTimeMasterclass != '' && payload1.noOfSeats > 0 && payload1.classification != '') {
            setEnable(true);
        }
        else {
            setEnable(false);
        }
    }, [ payload1 ]);
    const disabledDate = (currentDate) => {
        return currentDate && currentDate < moment().startOf('day');
    }

    useEffect(() => {
        setpayload1({ ...payload1, classification: classification });
    }, [ classification ]);
    console.log('masterclass event', payload1);
    return (
        <div className='p-5' >
            <h3 className='ml-5' style={{ marginTop: '20px', fontWeight: 'bold' }}>Adding Slot for Masterclass</h3>

            <p className="mb-10 mt-24 field-label">Select Start Date of Masterclass</p>
            <DatePicker
                // showTime={{ use12Hours: true, format: 'HH:mm a' }}
                format={'MM/DD/YYYY'}
                disabledDate={disabledDate}
                allowClear
                onChange={(e) => {
                    if (e) {
                        const isoString = e.toISOString();
                        const dateWithZeroSecondsAndMilliseconds = new Date(isoString);
                        dateWithZeroSecondsAndMilliseconds.setSeconds(0);
                        dateWithZeroSecondsAndMilliseconds.setMilliseconds(0);

                        setpayload1({ ...payload1, startMasterclass: dateWithZeroSecondsAndMilliseconds?.toISOString() })
                    } else { setpayload1({ ...payload1, startMasterclass: '' }) }
                }}
                // defaultValue={props.defaultValue? moment(props.defaultValue):''}
                placeholder='Select date and time'
            />
            <p className="mb-10 mt-24 field-label">Select End Date of Masterclass</p>
            <DatePicker
                // showTime={{ use12Hours: true, format: 'HH:mm a' }}
                format={'MM/DD/YYYY'}
                disabledDate={disabledDate}
                allowClear
                onChange={(e) => {
                    if (e) {
                        const isoString = e.toISOString();
                        const dateWithZeroSecondsAndMilliseconds = new Date(isoString);
                        dateWithZeroSecondsAndMilliseconds.setSeconds(0);
                        dateWithZeroSecondsAndMilliseconds.setMilliseconds(0);

                        setpayload1({ ...payload1, endMasterclass: dateWithZeroSecondsAndMilliseconds?.toISOString() })
                    } else { setpayload1({ ...payload1, endMasterclass: '' }) }
                }}
                // defaultValue={props.defaultValue? moment(props.defaultValue):''}
                placeholder='Select date and time'
            />
            <div className="flex justify-between">

                <section className="flex-1 mr-5">
                    <p className="mb-10 mt-24 field-label">Daily Time</p>
                    <TimePicker
                        showTime={{ use12Hours: true, format: 'HH:mm a' }}
                        format={'hh:mm a'}
                        allowClear
                        onChange={(e) => {
                            if (e) {
                                const isoString = e.toISOString();
                                const dateWithZeroSecondsAndMilliseconds = new Date(isoString);
                                dateWithZeroSecondsAndMilliseconds.setSeconds(0);
                                dateWithZeroSecondsAndMilliseconds.setMilliseconds(0);

                                setpayload1({ ...payload1, dailyTimeMasterclass: dateWithZeroSecondsAndMilliseconds?.toISOString().split('T')[ 1 ] })
                            } else { setpayload1({ ...payload1, dailyTimeMasterclass: '' }) }
                        }}
                        // defaultValue={props.defaultValue? moment(props.defaultValue):''}
                        placeholder='Select date and time'
                    />
                </section>
                <section className="flex-1 ml-5">


                    <p className="mb-10 mt-24 field-label">No of Seats</p>
                    <Input
                        type="number"
                        value={payload1.noOfSeats}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                        }}
                        onChange={(e) => {
                            setpayload1({ ...payload1, noOfSeats: e?.target?.value });
                        }}
                        placeholder={'Enter no of seats'}
                    />
                </section>
            </div>
            <br />
            <small className="mb-10 mt-5 field-label">*Button Will enable after all fields are filled</small>
            <Button
                disabled={!enable}
                onClick={(e) => {
                    e.preventDefault();
                    onAdd('singleslot', payload1);
                    setTimeout(() => setpayload1({
                        startMasterclass: '',
                        dailyTimeMasterclass: '', endMasterclass: '', noOfSeats: '', classification: classification
                    }), 400);
                    // setSlotDiv(false)
                }}
                className=""
                type="primary"
                htmlType="submit"
            >
                Add Slot
            </Button>
        </div>
    );
};

//Slot form for a cs experience

// export const AddNewCsExpSlot = ({ ...props }) => {
//     const [ payload1, setpayload1 ] = useState({ startCsExp: '', endCsExp: '' });
//     console.log('CS exp', payload1);
//     return (
//         <div >


//             <DatePicker
//                 // showTime={{ use12Hours: true, format: 'HH:mm a' }}
//                 format={'MM/DD/YYYY'}

//                 allowClear
//                 onChange={(e) => { setpayload1({ ...payload1, startCsExp: e?.toISOString().split('T')[ 0 ] }) }}
//                 // defaultValue={props.defaultValue? moment(props.defaultValue):''}
//                 placeholder='Select date and time'
//             />
//             <p className="mb-10 mt-24 field-label">Select endMasterclass</p>
//             <DatePicker
//                 // showTime={{ use12Hours: true, format: 'HH:mm a' }}
//                 format={'MM/DD/YYYY hh:mm a'}

//                 allowClear
//                 onChange={(e) => { setpayload1({ ...payload1, endCsExp: e?.toISOString().split('T')[ 0 ] }) }}
//                 // defaultValue={props.defaultValue? moment(props.defaultValue):''}
//                 placeholder='Select date and time'
//             />

//             <Button
//                 onClick={(e) => {
//                     e.preventDefault();
//                     // onAdd(payload1);
//                     setTimeout(() => setpayload1({ startCsExp: '', endCsExp: '' }), 400);
//                     // setSlotDiv(false)
//                 }}
//                 className=""
//                 type="primary"
//                 htmlType="submit"
//             >
//                 Add Slot
//             </Button>
//         </div>
//     );
// };


