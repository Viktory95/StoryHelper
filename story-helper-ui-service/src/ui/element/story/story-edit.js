import React, {useState, useEffect} from 'react'
import Modal from 'react-modal'

const StoryEdit = (props) => {
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
        <div id={'story-edit-' + props.story.id}>
            <button onClick={openModal}>Edit</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Edit Story'
            >
                <button onClick={closeModal}>Close</button>
                <form action={submit}>
                    <input name={'name'}
                           defaultValue={props.story.name}/>
                    <input name={'textt'}
                           defaultValue={props.story.textt}/>
                    <input name={'description'}
                           defaultValue={props.story.description}/>
                    <button type='submit'>Submit</button>
                </form>
              </Modal>
            </div>
    )
}

export default StoryEdit