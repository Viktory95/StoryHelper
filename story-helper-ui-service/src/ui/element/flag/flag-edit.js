import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

const FlagEdit = (props) => {
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
        <div id={'flag-edit-' + props.flag.id}>
            <button onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Edit Flag'
            >
                <button onClick={closeModal}>Close</button>
                <form action={submit}>
                    <input name={'icon'}
                           defaultValue={props.flag.icon}/>
                    <input name={'placeholder'}
                           defaultValue={props.flag.placeholder}/>
                    <button type='submit'>Submit</button>
                </form>
              </Modal>
            </div>
    )
}

export default FlagEdit