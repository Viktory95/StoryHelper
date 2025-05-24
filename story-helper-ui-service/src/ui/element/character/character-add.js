import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

const CharacterAdd = (props) => {
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
        <div id={'character-add'}>
            <button onClick={openModal}>Add</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Add Character'
            >
                <button onClick={closeModal}>Close</button>
                <form action={submit}>
                    <input name={'name'}/>
                    <input name={'gender'}/>
                    <input name={'birthday'}/>
                    <input name={'appearance'}/>
                    <input name={'features'}/>
                    <input name={'characterDescription'}/>
                    <input name={'importanceRate'}/>
                    <button type='submit'>Submit</button>
                </form>
              </Modal>
            </div>
    )
}

export default CharacterAdd