import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth'
import { User } from '../Models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject} from "firebase/storage";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  utilsSvc = inject(UtilsService);

  //guard
  getAuth() {
    return getAuth();
  }

  //iniciar sesion
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  //Registrar
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Actualizar usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName })
  }

  // enviar email para restablecer contrasenna
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  //cerrar sesion
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth')
  }

  //-----base de datos

  //obtener documentos de una colecion
  getCollectionData(path: string, colletionQuery?: any) {
    const ref = collection(getFirestore(), path);
    return collectionData(query(ref, ...colletionQuery), { idField: 'id' });
  }

  //setear documentos/ guardar datos
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  //actualizar documentos
  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  //borrar documentos
  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }

  //obtener documentos
  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }


  //agregar documentos
  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  //-----almacenamiento

  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })

  }
  //obtener ruta de la imagen
  async getFilePath(url: string) {
    return ref(getStorage(), url).fullPath

  }
  //Eliminar archivos
  deleteFile(path: string) {
    return deleteObject(ref(getStorage(), path));
  }


}
