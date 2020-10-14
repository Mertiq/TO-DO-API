import React, {  useContext, useState , useEffect} from 'react'
import {Table, Form, Button, Modal, Row, Col} from 'react-bootstrap'
import {gorevlerContext, kullanicilarContext, aktifKullaniciContext, aktifGorevContext} from '../Store'
import Navigation2 from '../Navigation2';
import './Gorevler.css'

function Gorevler () {

    const [gorevler, setGorevler] = useContext(gorevlerContext);
    const[aktifKullanici, setAktifKullanici] = useContext(aktifKullaniciContext);
    const [kullanicilar, setKullanicilar] = useContext(kullanicilarContext);

    const combobox = ["Hepsi", "Bitirilen görev"];
    
    const [id, setId] = useState(1);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
  
    
    const [ad, setGorevadi] = useState("");
    const [aciklama, setGorevaciklama] = useState("");
    const [baslangic_trh, setBaslangictarihi] = useState();
    const [bitis_trh, setBitistarihi] = useState();
    const [bitimi,setbitimi] = useState();
    const [aktifid,setaktifid] = useState();
    
        const ModalGoster2 = id => {
            handleShow2();
            let x = gorevler.map(gorev => {
                if(gorev.gorev_id === id){
                    setGorevaciklama(gorev.aciklama)
                }
                return id;
            })
            return x 
        }


        function tarih(metin){
            let bitis = metin.indexOf("T")
            
            let istenenKisim = metin.slice(0,bitis)
        
            return istenenKisim
        }

        function renksec (x){

            if(x){
                return "AEF0AF"
            }
        }

    const bitir = id => {
        
        let x = gorevler.map(gorev => {
            if(gorev.gorev_id === id){
            
                    fetch(`https://todoapi20200818171548.azurewebsites.net/api/gorev/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            gorev_id:gorev.gorev_id,
                            aciklama: gorev.aciklama,
                            ad: gorev.ad,
                            proje_id:5,
                            aktif_kullanici_id:gorev.aktif_kullanici_id,
                            baslangic_trh :gorev.baslangic_trh,
                            bitis_trh: gorev.bitis_trh,
                            bitimi:true
                        })
                    })
                }
            })

           
            
    }
    function kullaniciBul(id){
        var a = "a"
            kullanicilar.forEach(k => {

                if(id === k.kullanici_id){
                     a = k.ad +" "+  k.soyadi
                }
    
            });
                
            return a

            
               
        }
    
    

        

        return (
           
            <div > 
                <Navigation2/>
                <br/>
                <div className="genel">
                    <br/>
                    <Form.Group controlId="exampleForm.ControlSelect1" >
                        <Form.Label>Görev Durumu Seçin</Form.Label>
                        <br/>
                        <Form.Control as="select" className="combo" > 
                            {
                                combobox.map(x => (
                                    <option name={x} key={x}>{x}</option>
                                ))
                            }
                        </Form.Control>
                    </Form.Group>
                    <br/>
                    <Table className="mt-4" stripped="true" bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Gorev ID</th>
                                <th>Gorev Adı</th>
                                <th>Gorev Başlangıç Tarihi</th>
                                <th>Gorev Bitiş Tarihi</th>
                                <th>Görev Sahibi</th>
                                <th>Detay</th>
                                <th>Tamamla</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            
                            gorevler.map(gorev =>   
                                {   
                                 if(gorev.aktif_kullanici_id === aktifKullanici.kullanici_id){
                                       
                                        return (    
                                        <tr key = {gorev.gorev_id} bgcolor={renksec(gorev.bitimi)}>
                                            <td>{gorev.gorev_id}</td>
                                            <td>{gorev.ad}</td>
                                            <td>{tarih(gorev.baslangic_trh)}</td>
                                            <td>{tarih(gorev.bitis_trh)}</td>
                                            <td>{kullaniciBul(gorev.aktif_kullanici_id)}</td>
                                            <td><Button variant="primary" onClick={() => ModalGoster2(gorev.gorev_id)}>Detay</Button></td>
                                            <td><Button variant="success" disabled={gorev.bitimi} onClick={() => bitir(gorev.gorev_id)}>Tamamla</Button></td>
                                        </tr>
                                        )
                                    }
                                })
                                
                    
                          }
                               
                        
                            
                        </tbody>
                    </Table>
                    
                    </div>
                    
                    <Modal show={show2} onHide={handleClose2} size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                        <Modal.Header closeButton>
                        <Modal.Title>Açıklama</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            
                            {aciklama}
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose2}>
                            Kapat
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    
                    
                    </div>

                
               




        )
    
}

export default Gorevler
