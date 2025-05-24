import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

const FlagAdd = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const submit = (data) => {
        //TODO: rest add request
        closeModal()
        props.reload()
    }

    return (
        <div id={'flag-add'}>
            <button onClick={openModal}>Add</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Add Flag'
            >
                <button onClick={closeModal}>Close</button>
                <form action={submit}>
                    <input name={'icon'}/>
                    <input name={'placeholder'}/>
                    <button type='submit'>Submit</button>
                </form>
              </Modal>
            </div>
    )
}

export default FlagAdd