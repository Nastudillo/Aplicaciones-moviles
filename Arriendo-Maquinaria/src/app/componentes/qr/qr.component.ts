import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  public imageSrc = "";

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    const imageUrl = image.webPath;
    this.imageSrc = imageUrl;
  };

}

