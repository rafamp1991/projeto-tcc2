import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
//import { LoginPage } from '../pages/login/login';
import { SMS } from '@ionic-native/sms';
import { ContactProvider } from './../../providers/contact/contact';
import { Observable } from 'rxjs/Observable';
import { Geolocation } from '@ionic-native/geolocation';
import { Shake } from '@ionic-native/shake';
import { ToastController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	contacts: Observable<any>;

	emailForm = {
     assunto: 'novo Teste',
     destinatarios: 'rafael.m.padua@gmail.com',
     mensagem: 'Email de teste'
   	};

  	constructor(private provider: ContactProvider,public navCtrl: NavController,private sms: SMS,
  		private geolocation: Geolocation,private shake: Shake,private toastCtrl: ToastController, private http:HTTP) {
  		this.contacts = this.provider.getAll();

  		this.shake.startWatch(30).subscribe(() => {
  			this.solicitarAjuda(1);
  		});
    }

    logout() {
      //this.navCtrl.push('LoginPage');
    }

    solicitarAjuda(op) {

    	let tituloSMS =  op == 1 ? 'Necessito de Ajuda. Localização: ' : 'URGENTE ! Necessito de AJUDA URGENTE. Localização: ';

    	let toast = this.toastCtrl.create({
	    	message: 'Ajuda solicitada!',
	    	duration: 3000
	  	});

    	this.geolocation.getCurrentPosition().then((res) => {
      		let mapa = 'http://www.google.com/maps/place/'+res.coords.latitude+','+res.coords.longitude;
      		tituloSMS+=mapa;

      		this.contacts.forEach(contact => {
	    		contact.forEach(obj => {
	    			console.log(obj);
	          		this.sms.send(obj.tel, tituloSMS);
	          		this.sendEmail(this.emailForm);
	    		});
	        });
    	});

    	toast.present();
    }

    sendEmail(form) {
     	var header = { "headers": {"Content-Type": "application/x-www-form-urlencoded"} };

      	this.http.post('"https://us-central1-project-tcc-4e4be.cloudfunctions.net/enviarEmail', form, header).then(data => {
        console.log(data.status);
		}).catch(error => {
	        console.log(error.status);
	 	});
	}
}
