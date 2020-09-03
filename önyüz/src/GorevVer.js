import React, { useContext } from 'react'
import {Form, Button} from 'react-bootstrap'
import {gorevlerContext} from './Store'
import {kullanicilarContext} from './Store'

 function Gorevver () {
    const [gorevler, setGorevler] = useContext(gorevlerContext);
    const [kullanicilar] = useContext(kullanicilarContext);
/*
    const findId = m =>{
        var x = 0;
        for(var i = 0; i < gorevler.length; i++){
            if(x <= gorevler[i].gorev_id){
                x = gorevler[i].gorev_id
            }
        }
        x++;
        return x
    }
    */

    const handleInputChange = event => {
        const { name, value } = event.target;
        setGorevler({ ...gorevler, [name]: value });
    };

    /*
    

    function sayiyiAl(metin){
        let baslangic = metin.indexOf("(")
        let bitis = metin.indexOf(")")
        
        let istenenKisim = metin.slice(baslangic+1,bitis)
    
        return  parseInt(istenenKisim)
    }
*/

 /// GÖREV EKLE
 
    const handleSubmit = e => {
        console.log("veriliyor")
        fetch('https://todoapi20200818171548.azurewebsites.net/api/gorev', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                gorev_id:111,
                aciklama:"denemeeee",//gorevler.gorevaciklama,
                ad:"denemeeee",//gorevler.gorev_adi,
                proje_id: 1,
                aktif_kullanici_id:111/*sayiyiAl(gorevler.kisi)*/,
                baslangic_trh : "2020-07-03", //gorevler.baslangictarihi,
                bitis_trh: "2020-07-03",// gorevler.bitistarihi,
                bitimi: false,
            })
        })
            .then(res => res.JSON())
    }


    
    

    return (
        
        <div>
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
                <Form.Group controlId="exampleForm.ControlSelect1" name="kisi" onChange={handleInputChange}>
                    <Form.Label color="red" >Görev Gönderilecek Kişiyi Seçin</Form.Label>
                    <Form.Control as="select" name="kisi"  >
                        {
                            kullanicilar.map(kullanici => (
                            <option name={kullanici.kullanici_id} key ={kullanici.kullanici_id}> {kullanici.ad} {kullanici.soyadi} ({kullanici.kullanici_id})</option>
                            ))
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

    )
}


export default Gorevver