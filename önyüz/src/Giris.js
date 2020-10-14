import React, {useState, useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Nav} from 'react-bootstrap'
import { kullanicilarContext, aktifKullaniciContext } from './Store';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn() {
  const classes = useStyles();
  const [mail,setMail] = useState();
  const [sifre, setSifre] = useState();
  
const upmail = event => {
  setMail(event.target.value);
};

const upsifre = event => {
  setSifre(event.target.value);
};



const [kullanicilar] = useContext(kullanicilarContext); 

const history = useHistory();






  const aktifyap = id => {

  let x = kullanicilar.map(kullanici => {
    if(kullanici.kullanici_id === id){
     
        fetch(`https://todoapi20200818171548.azurewebsites.net/api/kullanici/${kullanici.kullanici_id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        kullanici_id:kullanici.kullanici_id,
        ad: kullanici.ad,
        soyadi:kullanici.soyadi,
        mail:kullanici.mail,
        sifre :kullanici.sifre,
        birim_id: kullanici.birim_id,
        yetki_id:kullanici.yetki_id,
        aktif:true
      })
      })
    }
  })
  

    
}
  





  function onsubmit  (e) {
    
  
     
      
      for(var i = 0; i<kullanicilar.length; i++){
        if(kullanicilar[i].mail === mail && kullanicilar[i].sifre === sifre){
         
         
          
          console.log(kullanicilar[i].yetki_id)
          if(kullanicilar[i].yetki_id === 1){
            aktifyap(kullanicilar[i].kullanici_id)
            history.push("/superamir/gorevler");
          }else if(kullanicilar[i].yetki_id === 2){
            aktifyap(kullanicilar[i].kullanici_id)
            history.push("/amir/gorevler");
          }else if(kullanicilar[i].yetki_id === 3){
            aktifyap(kullanicilar[i].kullanici_id)
            history.push("/calisan/gorevler"); 
          }
          
          
         
        }
      }
      
  }



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          
        </Avatar>
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        <form className={classes.form} >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="mail"
            autoComplete="email"
            autoFocus
            onChange={upmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="sifre"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={upsifre}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => onsubmit()}
          >
            Giriş Yap
          </Button>
          <Grid container>
            <Grid item>
              <Nav.Link href="/kayit" variant="body2">
                {"Hesabın yok mu? Kayıt ol"}
              </Nav.Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}