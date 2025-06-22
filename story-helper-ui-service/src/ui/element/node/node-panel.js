import React, {useState, useEffect} from 'react'
import NodeAdd from './node-add'
import NodeView from './node-view'

const NodePanel = () => {
    const [nodes, setNodes] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded) {
            axios.get(localStorage.getItem('addresses-node'), {
                            params: {
                              token: localStorage.getItem('token'),
                              username: localStorage.getItem('username'),
                              ids: props.nodes
                            }
                          })
                          .then(function (response) {
                            setNodes(response.data)
                          })
                          .catch(function (error) {
                            console.error(error);
                          })
                          .finally(function () {
                            setLoaded(true)
                          })
        }
    }, [nodes])

    const reload = () => {
        setNodes([])
        setLoaded(false)
    }

    if(!loaded)
        return (<></>)

    return (
        <div>
            <div>Nodes</div>
            <NodeAdd storyId={props.storyId}
                     reload={reload.bind(this)}/>
            <>
                {nodes.map(node => {
                    return <NodeView node={node}
                                     storyId={props.storyId}
                                     reload={reload.bind(this)}/>
                })}
            </>
        </div>
    )
}

export default NodePanel