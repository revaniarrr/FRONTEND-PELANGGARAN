import { useState, useEffect } from "react";
import axios from "axios"
import { Toast } from "bootstrap";
import Navbar from "../components/Navbar";

export default function ListPelanggaranSiswa() {
    if (!localStorage.getItem(`token-pelanggaran`)) {
        window.location.href = "/signin"
    }

    let [list, setList] = useState([])
    let [message, setMessage] = useState("")

    // memanggil token
    let token = localStorage.getItem("token-pelanggaran")
    let authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    let showToast = message => {
        let myToast = new Toast(
            document.getElementById(`myToast`),
            {
                autohide: true
            }
        )
        /** perintah untuk mengisi state `message` */
        setMessage(message)

        /** show Toast */
        myToast.show()
    }
    
    let getData = () => {
        let endpoint = `http://localhost:8080/pelanggaran_siswa`
        /** sending data */
        axios.get(endpoint, authorization)
            .then(result => {
                setList(result.data)
            })
            .catch(error => console.log(error))
    }

    let hapusData = item =>{
        if (window.confirm(`Are you sure want to delete this data??`)) {
            let endpoint = `http://localhost:8080/pelanggaran_siswa/${item.id_pelanggaran_siswa}`
            /** sending data */
            axios.delete(endpoint, authorization)
                .then(response => {
                    showToast(response.data.message)
                    /** refresh data */
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
            {/** start component Toast */}
            <div className="position-fixed top-0 end-0 p-3"
                style={{ zIndex: 11 }}>
                <div className="toast bg-light" id="myToast">
                    <div className="toast-header bg-dark tezt-white">
                        <strong>Message</strong>
                    </div>
                    <div className="toast-body">
                        {message}
                    </div>
                </div>
            </div>
            {/** end component Toast  */}
            <div className="card m-2">
                <div className="card-header " style={{ background: `blue` }}>
                    <h4 className="text-white" align="center">
                        List Pelanggaran Siswa
                    </h4>
                </div>

                <div className="card-body">
                    <ul className="list-group">
                        {list.map(item => (
                            <li className="list-group-item"
                                // untuk membedakan ....
                                key={`idPS${item.id_pelanggaran_siswa}`}>
                                <div className="row">
                                    <div className="col-4">
                                        <small className="text-info">Nama Siswa</small>
                                        <h5>{item.siswa.nama} ({item.siswa.kelas})</h5>
                                    </div>

                                    <div className="col-2">
                                        <small className="text-info">Poin Siswa</small>
                                        <h5>{item.siswa.poin}</h5>
                                    </div>

                                    <div className="col-4">
                                        <small className="text-info">Waktu Pelanggaran</small>
                                        <h5>{item.waktu}</h5>
                                    </div>

                                    <div className="col-2">
                                        <small className="text-info">
                                            Option
                                        </small>
                                        <br />
                                        <button className="btn btn-sm btn-danger my-2 "
                                            onClick={() => hapusData(item)}>
                                            <span className="fa fa-trash"></span> Delete
                                        </button>
                                    </div>


                                </div>
                                <small className="text-info">Detail Pelanggaran</small>
                                {item.detail_pelanggaran_siswa.map(detail => (
                                    <h6 key={`idDetail${detail.id_pelanggaran}`}>
                                        - {detail.pelanggaran.nama_pelanggaran}
                                    </h6>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}