import React, {useEffect, useRef, useState, useCallback} from 'react'
import { ReactFlow, useNodesState, useEdgesState, addEdge } from '@xyflow/react'

import '@xyflow/react/dist/style.css'

const menuStyle = {position: 'absolute', zIndex: 100000}

const Diagram = () => {
      const [menu, setMenu] = useState(false)
      const [nodes, setNodes, onNodesChange] = useNodesState([])
      const [edges, setEdges, onEdgesChange] = useEdgesState([])

      useEffect(() => {
        document.addEventListener('contextmenu', (event) => {
            event.preventDefault()
            setMenu(true)
        })

        document.addEventListener('click', function(event){
            setMenu(false)
        })
      }, [])

      const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
      )

      const contextMenu = () => {
        return (<>
            {menu && <div id='context-menu' key='context-menu' style={menuStyle}>
                             <a onClick={addNode.bind(this)}>add node</a>
                             <a>add flag</a>
                             <a>add character</a>
                     </div>}
        </>)
      }

      const addNode = () => {
        console.log('----')
        let nds = nodes.slice()
        nds.push({ id: '1', position: { x: 0, y: 0 }, data: { label: '1' } })
        setNodes(nds)
      }

      return <>
          {contextMenu()}
          <div style={{ width: '100vw', height: '100vh' }}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                />
          </div>
      </>
}

export default Diagram