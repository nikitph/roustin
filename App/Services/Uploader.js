import React, { Component } from 'react';
import {
  Platform
} from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

export function fileUpload(uri, selectedImage, storageRef, userRef, mime = 'image/jpeg') {

  // Prepare Blob support
  const Blob = RNFetchBlob.polyfill.Blob
  const { fs } = RNFetchBlob
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
  window.Blob = Blob
  console.tron.log('wtf')

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
        userRef.update({
          profileImage: url
        });
        //for eventrefs as events are referencing image not profileImage
        userRef.update({
          image: url
        });
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
