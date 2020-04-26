
// import { checkConnection } from './utils'
// class HTTP_Requests {
//   get = async url => {
//     try {
//       const isConnected = await checkConnection()
//       if (!isConnected.isConnected) throw new Error('No Internet Connection')
//       const response = await fetch(url)
//       const responseJSON = await response.json()
//       if (response.ok ) {
//         return { message: responseJSON, status: true }
//       }
//       return { message: responseJSON, status: false }
//     } catch (err) {
//       return { message: err, status: false }
//     }
//   }

//   post = async (url, body) => {
//     try {
//       const isConnected = await checkConnection()
//       if (!isConnected.isConnected) throw new Error('No Internet Connection')
//       const requestObject = { method: 'POST', body }
//       const response = await fetch(url, requestObject)
//       const responseJSON = await response.json()
//       if (response.ok) {
//         return { message: responseJSON, status: true }
//       }
//       return { message: responseJSON, status: false }
//     } catch (err) {
//       return { message: err, status: false }
//     }
//   }

//   put = async (url, body) => {
//     try {
//       const isConnected = await checkConnection()
//       if (!isConnected.isConnected) throw new Error('No Internet Connection')
//       const requestObject = { method: 'PUT', body }
//       const response = await fetch(url, requestObject)
//       const responseJSON = await response.json()
//       if (response.ok) {
//         return { message: responseJSON, status: true }
//       }
//       return { message: responseJSON, status: false }
//     } catch (err) {
//       return { message: err, status: false }
//     }
//   }
//   delete = async (url, body) => {
//     try {
//       const isConnected = await checkConnection()
//       if (!isConnected.isConnected) throw new Error('No Internet Connection')
//       const requestObject = { method: 'DELETE', body }
//       const response = await fetch(url, requestObject)
//       const responseJSON = await response.json()
//       if (response.ok) {
//         return { message: responseJSON, status: true }
//       }
//       return { message: responseJSON, status: false }
//     } catch (err) {
//       return { message: err, status: false }
//     }
//   }
// }

// export default new HTTP_Requests()
