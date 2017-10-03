import React, { Component } from 'react';
import {
  Platform
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { mapp } from '../Services/Firebase'
const usr = mapp.auth();


export function fileUpload(uri, storageRef, mime = 'image/jpeg') {

  // Prepare Blob support
  const Blob = RNFetchBlob.polyfill.Blob
  const { fs } = RNFetchBlob
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob

  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    let uploadBlob = null

    const imageRef = storageRef.child('dabc');

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        usr.currentUser.updateProfile({photoURL : url});
        return url;
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function itemFileUpload(uri, name, storageRef, mime = 'image/jpeg') {

  // Prepare Blob support
  const Blob = RNFetchBlob.polyfill.Blob
  const { fs } = RNFetchBlob
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob

  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    let uploadBlob = null

    const imageRef = storageRef.child(name);

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        return url;
      })
      .then((url) => {
      console.log(url);
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
