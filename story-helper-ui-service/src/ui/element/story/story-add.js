import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

const StoryAdd = (props) => {
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
        <div id={'story-add'}>
            <button onClick={openModal}>Add</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Add Story'
            >
                <button onClick={closeModal}>Close</button>
                <form action={submit}>
                    <input name={'name'}/>
                    <input name={'textt'}/>
                    <input name={'description'}/>
                    <button type='submit'>Submit</button>
                </form>
              </Modal>
            </div>
    )
}

export default StoryAdd