import React, {useState, useEffect} from 'react'
import FlagEdit from './flag-edit'
import FlagDelete from './flag-delete'

const FlagView = (props) => {
//TODO: add placeholder with info about flag

    const reload = () => {
        props.reload()
    }

    return (
        <div>
            <div>{props.flag.icon}</div>
            <FlagEdit flag={props.flag}
                      nodeId={props.nodeId}
                      reload={reload.bind(this)}/>
            <FlagDelete id={props.flag.id}
                        reload={reload.bind(this)}/>
        </div>
    )
}

export default FlagView