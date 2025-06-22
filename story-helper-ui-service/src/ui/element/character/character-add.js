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
        axios.post(localStorage.getItem('addresses-character'),
                {
                    id: null,
                    name: data.name,
                    gender: data.gender,
                    birthday: data.birthday,
                    appearance: data.appearance,
                    features: data.features,
                    characterDescription: data.characterDescription,
                    importanceRate: data.importanceRate,
                    isDeleted: false
                },
                {
                    params: {
                        token: localStorage.getItem('token'),
                        username: localStorage.getItem('username'),
                        storyId: props.storyId
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