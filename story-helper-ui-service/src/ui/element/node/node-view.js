import React, {useState, useEffect} from 'react'
import NodeEdit from './node-edit'
import NodeDelete from './node-delete'
import FlagPanel from '../flag/flag-panel'

const NodeView = (props) => {
//TODO: add placeholder with info about node

    const reload = () => {
        props.reload()
    }

    return (
        <div>
            <div>{props.node.name}</div>
            <NodeEdit node={props.node}
                      storyId={props.storyId}
                      reload={reload.bind(this)}/>
            <NodeDelete id={props.node.id}
                        reload={reload.bind(this)}/>
            <FlagPanel nodeId={props.node.id}
                       flags={props.node.flags}/>
        </div>
    )
}

export default NodeView