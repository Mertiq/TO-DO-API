import React, { useContext } from 'react'
import {Form, Button} from 'react-bootstrap'
import {gorevlerContext} from '../Store'
import {kullanicilarContext, aktifKullaniciContext} from '../Store'
import Navigation3 from '../Navigation3';
import './GorevVer.css'


 function Gorevver () {
    const [gorevler, setGorevler] = useContext(gorevlerContext);
    const [kullanicilar] = useContext(kullanicilarContext);
    const [  aktifKullanici, setAktifKullanici] = useContext(aktifKullaniciContext);
    
      
    function findId (m){
        var x = 1;
        console.log(gorevler.length)
        for(var i = 0; i < gorevler.size; i++){
           /* if(x < gorevler[i].id){
                x = gorevler[i].id
            }*/
            x= x+1;
      
        }  
        return parseInt(x); 
      }
    

    const handleInputChange = event => {
        const { name, value } = event.target;
        setGorevler({ ...gorevler, [name]: value });
    };

    
    

    function sayiyiAl(metin){
        let baslangic = metin.indexOf("(")
        let bitis = metin.indexOf(")")
        
        let istenenKisim = metin.slice(baslangic+1,bitis)
    
        return  parseInt(istenenKisim)
    }


 /// GÖREV EKLE
 
 const handleSubmit = e => {
    console.log("görev ekle")
    fetch('https://localhost:44358/api/gorev/atama', {
        method:'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            aciklama:String (gorevler.gorevaciklama),
            ad:String (gorevler.gorev_adi),
            aktif_kullanici_id:sayiyiAl(gorevler.kisi),
            baslangic_trh : gorevler.baslangictarihi,
            bitis_trh: gorevler.bitistarihi,
            bitimi: false,
        })
    })
        .then(res => res.JSON())
        /*.catch(error => {
            console.log(error)
            window.alert(error)
        })*/
        
    console.log("görev son")
}


    
    

    return (
        
        <div>
            <Navigation3/>
            <div className="baslik">
            <Form onSubmit={() => {handleSubmit()}}>
                <br/>
                <Form.Group>
                    <Form.Control size="lg" type="text" placeholder="Gorev Adı" name="gorev_adi" onChange={handleInputChange}/>
                </Form.Group>
                <br/>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Control as="textarea" rows="6" placeholder="Görev Açıklaması" name="gorevaciklama" onChange={handleInputChange}/>
                </Form.Group>
                <br/>
                <Form.Group controlId="exampleForm.ControlSelect1" name="kisi" defaultValue=" " onChange={handleInputChange}>
                    <Form.Label color="red" >Görev Gönderilecek Kişiyi Seçin</Form.Label>
                    <Form.Control as="select" name="kisi"  >
                    <option></option>
                        {
                            
                            kullanicilar.map(kullanici => {

                                if(kullanici.aktif   || kullanici.yetki_id ==1){

                                }else {
                                    return(
                                        <option name={kullanici.kullanici_id} key ={kullanici.kullanici_id}> {kullanici.ad} {kullanici.soyadi} ({kullanici.kullanici_id})</option>
                                    )
                                }

                            }
                            )
                        }
                    </Form.Control>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Control size="lg" type="date" placeholder="Başlangıç Tarihi" name="baslangictarihi" onChange={handleInputChange}/>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Form.Control size="lg" type="date" placeholder="Bitiş Tarihi" name="bitistarihi"  onChange={handleInputChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">Görev Ver</Button>{' '}
                <Button variant="danger">İptal</Button>
            </Form>

        </div>
        </div>
    )
}


export default Gorevver