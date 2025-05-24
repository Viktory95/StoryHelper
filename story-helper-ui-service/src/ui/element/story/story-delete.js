import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

const StoryDelete = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const submit = () => {
        //TODO: rest delete request
        closeModal()
        props.reload()
    }

    return (
        <div id={'story-delete'}>
            <button onClick={openModal}>Delete</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Delete Story'
            >
                <>Are you sure?</>
                <button onClick={closeModal}>Close</button>
                <button onClick={submit}>Delete</button>
              </Modal>
            </div>
    )
}

export default StoryDelete