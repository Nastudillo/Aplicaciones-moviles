# Aplicaciones-moviles Nicolas Astudillo, Matias Mella
**Para abrir el proyecto:
npm i --legacy-peer-deps ,
npm install -g @angular/cli ,
npm install nodemailer --legacy-peer-deps
ionic s

/*   esto es para que deje abrir ionic (ejecutar como administrador)
npm install -g @ionic/cli
Set-ExecutionPolicy unrestricted   */


si no funciona algo agregar --legacy-peer-deps

npm install @awesome-cordova-plugins/core --save --legacy-peer-deps
--------------------------------------------------------
**Para instalar android Studio:

npm install @capacitor/android --legacy-peer-deps ,
npx cap add android  ,
Ionic build Android ,

ionic capacitor sync android ,

**Para iniciar android Studio:

npx cap open android 
----------------------------------------------------------
opcional:
esto es para el dark mode ,
npm install @capacitor/preferences ,
npx cap sync,
----------------------------------------------------------

para el pc de la profe:
npm.cmd i -D -E @angular/cli
----------------------------------------------------------
native
npm install phonegap-plugin-barcodescanner
typescript
npm install @awesome-cordova-plugins/barcode-scanner
----------------------------------------------------------
esto es para un error en el android studio **siempre se tiene que hacer

node_modules/phonegap-plugin-barcodescanner/src/android/barcodescanner.gradle **direccion

**se agrega "implementation"

Antes:

dependencies {compile(name:'barcodescanner-release-2.1.5', ext:'aar')}

Despues:

dependencies {implementation(name:'barcodescanner-release-2.1.5', ext:'aar')}

----------------------------------------------------------
esto es para un error en el android studio **siempre se tiene que hacer

"android/gradle.properties" **direccion

** se agrega lo siguiente al final

android.useAndroidX=true ** este suele estar al final pero en el caso de que no este agregarlo igual

android.enableJetifier=true
----------------------------------------------------------

tambien y solo en caso de emegercia agregar esto en 

  android\app\src\main\AndroidManifest.xml

en permissions

<uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
