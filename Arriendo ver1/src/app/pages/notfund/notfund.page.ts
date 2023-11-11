import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-notfund',
  templateUrl: './notfund.page.html',
  styleUrls: ['./notfund.page.scss'],
})
export class NotfundPage implements OnInit {
  //variables
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
}
