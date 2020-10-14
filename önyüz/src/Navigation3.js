import React, {useContext } from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {aktifKullaniciContext, kullanicilarContext} from './Store'
import { useHistory } from 'react-router-dom';


 function Navigation () {

    const [aktifKullanici] = useContext(aktifKullaniciContext);
    const history = useHistory();

    function pasifyap () {
       
           console.log(aktifKullanici.kullanici_id)
            fetch(`https://todoapi20200818171548.azurewebsites.net/api/kullanici/${aktifKullanici.kullanici_id}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                kullanici_id:aktifKullanici.kullanici_id,
                ad: aktifKullanici.ad,
                soyadi:aktifKullanici.soyadi,
                mail:aktifKullanici.mail,
                sifre :aktifKullanici.sifre,
                birim_id: aktifKullanici.birim_id,
                yetki_id:aktifKullanici.yetki_id,
                aktif:false
              })
            })
          
            history.push("/");
          }
        
      

        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto"  >
                    <Nav.Link  href="/amir/gorevler" >Gorevler</Nav.Link>
                    <Nav.Link href="/amir/gorevver">Gorev ver</Nav.Link>
                    <Nav.Link href="/amir/kullanicilar">Kullanıcılar</Nav.Link>
                    <Nav.Link onClick={pasifyap}>Çıkış Yap</Nav.Link> 
                    <Nav.Link>{aktifKullanici.ad} {aktifKullanici.soyadi}</Nav.Link>
                    </Nav>
                </Navbar>
                
            </div>
        )
    
}

export default Navigation