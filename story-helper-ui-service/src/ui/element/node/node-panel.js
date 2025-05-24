import React, {useState, useEffect} from 'react'
import NodeAdd from './node-add'
import NodeView from './node-view'

const NodePanel = () => {
    const [nodes, setNodes] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded) {
            //TODO: add rest request
            setNodes([{id: 1, name: "test"}])
            setLoaded(true)
        }
    }, [nodes])

    const reload = () => {
        //TODO: reload data
    }

    if(!loaded)
        return (<></>)

    return (
        <div>
            <div>Nodes</div>
            <NodeAdd reload={reload.bind(this)}/>
            <>
                {nodes.map(node => {
                    return <NodeView node={node}
                                     reload={reload.bind(this)}/>
                })}
            </>
        </div>
    )
}

export default NodePanel