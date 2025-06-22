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
        axios.post(localStorage.getItem('addresses-story'),
        {
            id: null,
            name: data.name,
            genres: data.genres,
            characters: [],
            nodes: [],
            style: data.style,
            stView: data.stView,
            stUser: localStorage.getItem('username'),
            isPublic: true,
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
                    <input name={'genres'}/>
                    <input name={'style'}/>
                    <input name={'stView'}/>
                    <button type='submit'>Submit</button>
                </form>
              </Modal>
            </div>
    )
}

export default StoryAdd