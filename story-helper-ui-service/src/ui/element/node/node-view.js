import React, {useState, useEffect} from 'react'
import NodeEdit from './node-edit'
import NodeDelete from './node-delete'

const NodeView = (props) => {
//TODO: add placeholder with info about node

    const reload = () => {
        props.reload()
    }

    return (
        <div>
            <div>{props.node.name}</div>
            <NodeEdit node={props.node}
                      reload={reload.bind(this)}/>
            <NodeDelete id={props.node.id}
                        reload={reload.bind(this)}/>
        </div>
    )
}

export default NodeView