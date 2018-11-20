import { ContactProvider } from './../../providers/contact/contact';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  contacts: Observable<any>;

  constructor(public navCtrl: NavController, private provider: ContactProvider,
    private toast: ToastController) {
    this.contacts =  [
      {name:"Rafael Martins de Padua",tel:"(49) 98419-9002",email:"rafael.padua@unochapeco.edu.br"},
      {name:"Contato número 1",tel:"(49) 98404-xxxx",email:"contato1@unochapeco.edu.br"},
      {name:"Contato número 2",tel:"(49) 98404-xxxx",email:"contato2@unochapeco.edu.br"},
      {name:"Contato número 3",tel:"(49) 98404-xxxx",email:"contato3@unochapeco.edu.br"}
    ]
   // this.contacts = this.provider.getAll();
  }

  newContact() {
    this.navCtrl.push('ContactEditPage');
  }

  editContact(contact: any) {
    // Maneira 1
    this.navCtrl.push('ContactEditPage', { contact: contact });

    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }

  removeContact(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o contato.', duration: 3000 }).present();
        });
    }
  }
}
