import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/Models/product';
import { User } from 'src/app/Models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.scss'],
})
export class AddUpdateProductComponent implements OnInit {

  @Input() product: Product

  form = new FormGroup({
    id: new FormControl(''),
    imagen: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    precio: new FormControl(null, [Validators.required, Validators.min(0)]),
    disponibilidad: new FormControl('', [Validators.required, Validators.minLength(2)]),
  })
  
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  user = {} as User;

  ngOnInit() {

    this.user = this.utilsSvc.getFromLocalStorage('user');
    if (this.product) this.form.setValue(this.product);
  }
  //sacar foto
  async takeImage() {
    const dataUrl = (await this.utilsSvc.takePicture('Imagen del producto')).dataUrl;
    this.form.controls.imagen.setValue(dataUrl);
  }

  submit() {
    if (this.form.valid) {

      if (this.product) this.updateProduct();
      else this.createProduct()

    }
  }

  // convertir valores de tipo string a number
  setNumberInputs() {

    let { precio } = this.form.controls;
    if (precio.value) precio.setValue(parseFloat(precio.value));

  }


  //agregar producto
  async createProduct() {


    let path = `users/${this.user.uid}/products`

    const loading = await this.utilsSvc.loading();
    await loading.present();

    //subir imagen y obtener la url
    let dataUrl = this.form.value.imagen;
    let imagenPath = `${this.user.uid}/${Date.now()}`;
    let imagenUrl = await this.firebaseSvc.uploadImage(imagenPath, dataUrl);
    this.form.controls.imagen.setValue(imagenUrl);

    delete this.form.value.id

    this.firebaseSvc.addDocument(path, this.form.value).then(async res => {

      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: 'Maquinaria agregada exitosamente',
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

  //actualizar producto
  async updateProduct() {


    let path = `users/${this.user.uid}/products/${this.product.id}`

    const loading = await this.utilsSvc.loading();
    await loading.present();

    //si cambio de imagen y obtener la url
    if (this.form.value.imagen !== this.product.imagen) {
      let dataUrl = this.form.value.imagen;
      let imagenPath = await this.firebaseSvc.getFilePath(this.product.imagen);
      let imagenUrl = await this.firebaseSvc.uploadImage(imagenPath, dataUrl);
      this.form.controls.imagen.setValue(imagenUrl);
    }


    delete this.form.value.id

    this.firebaseSvc.updateDocument(path, this.form.value).then(async res => {

      this.utilsSvc.dismissModal({ success: true });

      this.utilsSvc.presentToast({
        message: 'Maquinaria Actualizada exitosamente',
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

}
