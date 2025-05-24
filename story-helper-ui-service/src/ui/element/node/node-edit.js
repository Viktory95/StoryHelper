import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

const NodeEdit = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const submit = (data) => {
        //TODO: rest edit request
        closeModal()
        props.reload()
    }

    return (
        <div id={'node-edit-' + props.node.id}>
            <button onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Edit Node'
            >
                <button onClick={closeModal}>Close</button>
                <form action={submit}>
                    <input name={'name'}
                           defaultValue={props.node.name}/>
                    <input name={'textt'}
                           defaultValue={props.node.textt}/>
                    <input name={'description'}
                           defaultValue={props.node.description}/>
                    <button type='submit'>Submit</button>
                </form>
              </Modal>
            </div>
    )
}

export default NodeEdit