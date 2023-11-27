import { Component, OnInit, inject } from '@angular/core';
import { Product } from 'src/app/Models/product';
import { User } from 'src/app/Models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateProductComponent } from 'src/app/shared/components/add-update-product/add-update-product.component';
import { orderBy, where } from 'firebase/firestore'
import emailjs from '@emailjs/browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  products: Product[] = [];
  loading: boolean = false;
  admin: boolean = false;
  users: User[] = [];
  

  ngOnInit() {
  }

  signOut() {
    this.firebaseSvc.signOut();
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }


  ionViewWillEnter() {
    this.getProducts();
  }

  doRefresh(event) { 
    setTimeout(() => {
      this.getProducts();
      event.target.complete();
    }, 1000);
  }

  //obtener productos
  getProducts() {
    let path = `/users/OMtHP6V8Tya6J2qrWhuc6v9AhHD2/products`;

    this.loading = true;

    let query = [
      orderBy('precio', 'desc'),
      //where('precio', '>',5000)
    ]

    let sub = this.firebaseSvc.getCollectionData(path, query).subscribe({
      next: (res: any) => {
        console.log(res);
        this.products = res;

        this.loading = false;

        sub.unsubscribe();
      }
    })
  }

  async addUpdateProduct(product?: Product) {

    let success = await this.utilsSvc.presentModal({
      component: AddUpdateProductComponent,
      cssClass: 'add-update-modal',
      componentProps: { product }
    })
    if (success) this.getProducts();
  }

  async confirmDeleteProduct(product: Product) {
    this.utilsSvc.presentAlert({
      header: 'Eliminar Producto',
      message: 'Quieres Eliminar esta Maquinaria',
      buttons: [
        {
          text: 'Cancelar',
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteProduct(product)
          }
        }
      ]
    });
  }


  //eliminar producto
  async deleteProduct(product: Product) {


    let path = `users/${this.user().uid}/products/${product.id}`

    const loading = await this.utilsSvc.loading();
    await loading.present();

    let imagenPath = await this.firebaseSvc.getFilePath(product.imagen);
    await this.firebaseSvc.deleteFile(imagenPath);

    this.firebaseSvc.deleteDocument(path).then(async res => {

      this.products = this.products.filter(p => p.id !== product.id);

      this.utilsSvc.presentToast({
        message: 'Maquinaria Eliminada exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline'

      })


    }).catch(error => {
      console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        position: 'middle',
        icon: 'alert-circle-outline'

      })

    }).finally(() => {
      loading.dismiss();
    })

  }

  enviarMail(){

    const templateParams = {
      name: "Test",
      email: "testmail@gmail.com",
      product_id: "01",
      product_nom: "Producto 1",
  };

  emailjs.send('service_fhjd3c9','template_kagy8rx', templateParams,'_ZByTdFiwZNBW3KD4')
    .then((response) => {
       console.log('SUCCESS!', response.status, response.text);
    }, (err) => {
       console.log('FAILED...', err);
    });

  }
}
