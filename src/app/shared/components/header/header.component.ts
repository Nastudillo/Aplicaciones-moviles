import { Component, Input, OnInit, inject } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title!: String;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  @Input() showMenu!: boolean;
  @Input() darkModel!: boolean;


  utilsSvc = inject(UtilsService);
  darkMode = false;
  constructor() { }

  ngOnInit(): void{
    this.checkAppMode()
  }
  
  async checkAppMode() {
    // const checkIsDarkMode = localStorage.getItem('darkModeActivated');
    const checkIsDarkMode = await Preferences.get({ key: 'darkModeActivated' });
    console.log(checkIsDarkMode);
    checkIsDarkMode?.value == 'true'
      ? (this.darkMode = true)
      : (this.darkMode = false);
    document.body.classList.toggle('dark', this.darkMode);
  }
  
  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
    if (this.darkMode) {
      Preferences.set({ key: 'darkModeActivated', value: 'true' });
    } else {
      //localStorage.setItem('darkModeActivated', 'false');
      Preferences.set({ key: 'darkModeActivated', value: 'false' });
    }
  }

  dismissModal(){
    this.utilsSvc.dismissModal();
  }

}
