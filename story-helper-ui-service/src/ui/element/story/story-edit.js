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
        axios.post(localStorage.getItem('addresses-story'),
                {
                    id: props.story.id,
                    name: data.name,
                    genres: data.genres,
                    characters: [],
                    nodes: [],
                    style: data.style,
                    stView: data.stView,
                    stUser: localStorage.getItem('username'),
                    isPublic: true
                    isDeleted: false
                },
                {
                    params: {
                        token: localStorage.getItem('token'),
                        username: localStorage.getItem('username')
                    }
                })
                .then(function (response) {

                })
                .catch(function (error) {
                    console.error(error);
                })
                .finally(function () {
                    closeModal()
                    props.reload()
                })
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
                    <input name={'genres'}
                           defaultValue={props.story.genres}/>
                    <input name={'style'}
                           defaultValue={props.story.style}/>
                    <input name={'stView'}
                           defaultValue={props.story.stView}/>
                    <button type='submit'>Submit</button>
                </form>
              </Modal>
            </div>
    )
}

export default StoryEdit