import { useState, useEffect } from "react"
import axios from "axios"
import { Modal, Toast } from "bootstrap"
import Navbar from "../components/Navbar";

export default function User() {
    let [user, setUser] = useState([])
    let [idUser, setIdUser] = useState(0)
    let [nama, setNama] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [action, setAction] = useState("")

    let [message, setMessage] = useState("")
    let [modal, setModal] = useState(null)

    /** get token from local storage */
    let token = localStorage.getItem(`token-pelanggaran`)

    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    /** create function to get data pelanggaran from backend */
    let getData = () => {
        /**
         * getData = inisiasi data pelanggaran
         * endpoint: http://localhost:8080/user
         * method: GET
         * request: none
         * response: array data user
         * authorization = Bearer Token
         */
        let endpoint = `http://localhost:8080/user`
        /** sending data */
        axios.get(endpoint, authorization)
            .then(response => {
                /** simpan di state pelanggaran */
                setUser(response.data)
            })
            .catch(error => console.log(error))
    }

    /** create function to show Toast */
    let showToast = message => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        /** perintah untuk mengisi state 'message' */
        setMessage(message)

        /** show Toast */
        myToast.show()
    }

    let tambahUser = () => {
        /** open modal */
        modal.show()

        /** mengosongkan inputan data */
        setIdUser(0)
        setNama("")
        setUsername("")
        setPassword("")
        setAction("insert")
    }

    let editUser = item => {
        /** open modal */
        modal.show()

        /** mengisi inputan sesuai dengan data yang dipilih */
        setIdUser(item.id_user)
        setNama(item.nama_user)
        setUsername(item.username)
        setPassword(item.password)
        setAction("edit")
    }

    let simpanUser = event => {
        event.preventDefault()
        /** close modal */
        modal.hide()
        if (action === "insert") {
            let endpoint = `http://localhost:8080/user`
            let request = {
                nama_user: nama,
                username: username,
                password: password
            }

            /** sending data */
            axios.post(endpoint, request, authorization)
                .then(response => {
                    showToast(response.data.message)
                    /** refresh data pelanggaran */
                    getData()
                })
                .catch(error => console.log(error))
        } else if (action === "edit") {
            let endpoint = `http://localhost:8080/user/${idUser}`
            let request = {
                nama_user: nama,
                username: username,
                password : password
            }

            /** sending data untuk update pelanggaran */
            axios.put(endpoint, request, authorization)
                .then(response => {
                    showToast(response.data.message)
                    /** refresh data pelanggaran*/
                    getData()
                })
                .catch(error => console.log(error))
        }
    }

    let hapusUser = item => {
        if (window.confirm(`Are you sure want to delete this data?`)) {
            let endpoint = `http://localhost:8080/user/${item.id_user}`
            /** sending data */
            axios.delete(endpoint, authorization)
                .then(response => {
                    showToast(response.data.message)
                    /** refresh newest data */
                    getData()
                })
                .catch(error => console.log(error))
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="container-fluid">
            <Navbar />
            <div className="card m-2">
                <div className="card-header"
                    style={{ background: `#037bfc` }}>
                    <h4 className="text-white" align="center">
                        Daftar User Pelanggaran
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {user.map(item => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-3" align="center">
                                        <small className="text-info">
                                            ID User
                                        </small>
                                        <h5>{item.id_user}</h5>
                                    </div>

                                    <div className="col-3" align="center">
                                        <small className="text-info">
                                            Nama User
                                        </small>
                                        <h5>{item.nama_user}</h5>
                                    </div>

                                    <div className="col-3" align="center">
                                        <small className="text-info">
                                            Username
                                        </small>
                                        <h5>{item.username}</h5>
                                    </div>

                                    <div className="col-3" align="center">
                                        <small className="text-info">Options</small>
                                        <br/>
                                        <button className="btn btn-info btn-sm m-2"
                                            onClick={() => editUser(item)}>
                                            Edit
                                        </button>

                                        <button className="btn btn-danger btn-sm m-2"
                                            onClick={() => hapusUser(item)}>
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    {/** button tambah data user */}
                    <button className="btn btn-success m-3"
                        onClick={() => tambahUser()}>
                        <span className="fa fa-plus"></span> Tambah
                    </button>

                    {/** modal (form user) */}
                    <div className="modal" id="modal-user">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg=info">
                                    <h4 className="text-white">
                                        Form User
                                    </h4>
                                </div>

                                <div className="modal-body">
                                    <form onSubmit={(ev) => simpanUser(ev)}>
                                        {/** input for nama */}
                                        Nama User
                                        <input type="text"
                                            className="form-control mb-2"
                                            required
                                            value={nama}
                                            onChange={ev => setNama(ev.target.value)} />

                                        {/** input for kelas */}
                                        Username
                                        <input type="text"
                                            className="form-control mb-2"
                                            required
                                            value={username}
                                            onChange={ev => setUsername(ev.target.value)} />

                                        {/** input for poin */}
                                        Password
                                        <input type="password"
                                            className="form-control mb-2"
                                            required
                                            value={password}
                                            onChange={ev => setPassword(ev.target.value)} />
                                        <br/>
                                        {/** button for submit */}
                                        <button type="submit" className="btn btn-success">
                                            <span className="fa fa-check"></span>Simpan
                                        </button>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}