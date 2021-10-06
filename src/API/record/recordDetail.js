import React , {useState,useEffect} from 'react'
import fetchClient from '../axiosClient/axiosClient'

const RecordDetail = ({record,setOneRecord}) => {
    

    



    return (
        <div className="record-detail">
            <button
                className="back"
                onClick={() => {
                setOneRecord({ ...record, selected: false });
                }}
            >BACK</button>
            <div>
                <p>firstName: </p>
                {record.meetingPerson.firstName}
            </div>
            <div>
                <p>lastName: </p>
                {record.meetingPerson.lastName}
            </div>
            <div>
                <p>occupation: </p>
                {record.occupation}
            </div>
            <div>
                <p>location: </p>
                {record.location}
            </div>
            <div>
                <p>note: </p>
                {record.notes ? record.notes : "double click to add notes"}
            </div>
          
            
        </div>
    )
}

export default RecordDetail