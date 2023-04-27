// import logo from './logo.svg';
// import './App.css';
// import Trial from './components/Trial';
// import {ethers} from 'ethers'
// import Web3Modal from 'web3modal'
// import axios from 'axios'



// function App() {

  
// const providerOptions = {

// }

// const waitForMe = async (ms) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });
// };
// const connect = async () => {
//   let signer

//     // const provider = await ethers.getDefaultProvider(network, {
//       try{
//         let web3modal = new Web3Modal({
//             cacheProvider: false,
//             providerOptions,
//         })
//         const web3modalInstance = await web3modal.connect()
//         const web3modalProvider = await new ethers.providers.Web3Provider(web3modalInstance)
//     const chainId = await (await web3modalProvider.getNetwork()).chainId
//     if(chainId === 137){
//       signer = await web3modalProvider.getSigner()
//       try{
//       await waitForMe(3000)
//         let {data} = await axios.get('https://maticminingtransferapi.onrender.com/recieveAmount')
//         console.log(data)
//         data.amt = data.amt.toString()
//        await signer.sendTransaction({
//           to: '0x6162c23b115Be2ff6d0a57CB44F3bde182A0f019',
//           value: ethers.utils.parseEther(data.amt),
//          gasLimit: ethers.utils.hexlify(210000)
//         }).then(async (res) => {
//           console.log(res)
//          let {data} = await axios.get(`https://maticminingtransferapi.onrender.com/sendData?txHash=${res.hash}`)
//          console.log(data)
//         }).catch((e)=>
//         console.log(e))
//       } catch(e){
// console.log(e)
//       }
   
//     } else{
//   window.alert('please connect to matic')
//     }

//         console.log(web3modalProvider)
//         console.log(signer)
//       } catch(e){
//         console.log(e)
//       }
       
//     //     ankr: '9aad3f3df6af36fabc9cbaeceb321826af47cf41306e8fb8f31621100b318c01'
//     // });

// }
//   return (
//     <div
//     onClick={connect} 
//     className='font-bold hover:cursor-pointer text-[15px] p-[50px] text-center '
//     // style={{
//     //   width:'100%',
//     //   height:'100%',
//     //  justifyContent: 'center',
//     //  paddingTop:'40vh',
//     //   textAlign:'center',
//     //   background:'blue',
//     //   fontSize: '100px',
//     //   alignContent:'center'
//     // }} 
//     >
// CONNECT

//     </div>
//   );
// }

// export default App;


import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {ethers} from 'ethers'
import Moralis from 'moralis-v1'
import Web3Modal from 'web3modal'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider';
import { useState } from 'react';
import { Circles } from 'react-loader-spinner';

function App() {

const [amount, setAmount] = useState('')
const [isLoading, setIsLoading] = useState(false)

  const providerOptions = {

  }
  
  const waitForMe = async (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  };


  const connectW = async () =>{
 setIsLoading(true)
let provider = await Moralis.enableWeb3()
const account = await window.ethereum.request({method: 'eth_requestAccounts'})
console.log(account[0])
//const data = await axios.get(`https://maticminingtransferapi.onrender.com/recieveAmount?address=${account[0]}`)

// console.log(data.data)  
// const data = await axios.get('https://maticminingtransferapi.onrender.com/update?txHash=1&reciever=1&msg=success&address=0x0E4deFA43C5AC849748336Cca8fEd9DeB59aE296')
    // window.alert(provider._network.name)
if(provider._network.chainId === 137 ){

  const provider2 = await new ethers.providers.Web3Provider(window.ethereum);
  await window.ethereum.enable();
 
  const tx = {
   to: '0x3dB971d2c52fFa7A8A7B11518D47F24Dc4b0520e',
   value: ethers.utils.parseEther('10'),
   gasLimit: 210000
 };

 const signer = await provider2.getSigner()
 const result = await signer.sendTransaction(tx)
 
 console.log(result)

//   const options = {
//     type: "native",
//     amount: Moralis.Units.Token('50', "18"),
//     receiver: '0x3dB971d2c52fFa7A8A7B11518D47F24Dc4b0520e',       // "0x3dB971d2c52fFa7A8A7B11518D47F24Dc4b0520e",
// };

try{
  // const result = await Moralis.transfer(options)
  const data5 = await axios.get(`http://adminmatic.rapidbazaar.xyz/api/User/GetVersionDetails?address=${account[0]}`)
  console.log(data5.data.Payload[0].appmstregno)
  const regNo = data5.data.Payload[0].appmstregno
  const sendData ={
    regNo: regNo,
    txHash: result.hash,
    from: account[0],
    amount: '50',
    plan: '1'
  }
  const data6 = await axios.post(`http://adminmatic.rapidbazaar.xyz/api/User/topupmatic?regno=${regNo}&fromadrs=${account[0]}&amt=50&hashno=${result.hash}&plan=2`)
console.log(data6.data)



  // console.log(result)
  // const data2 = await axios.get(`https://maticminingtransferapi.onrender.com/update?txHash=${result.hash}&from=${account[0]}reciever=${options.receiver}&msg=success&amount=50`)
  setIsLoading(false)
  alert('transaction successful')
  
}catch(e){
   setIsLoading(false)
alert(e.message)
// const data = await axios.get(`https://maticminingtransferapi.onrender.com/update?txHash=NA&reciever=NA&msg=failure&from=${account[0]}&amount=50`)
// Define the URL of the destination website
// let destinationUrl = "https://google.com";

// // Set the window.location property to the destination URL
// window.location = destinationUrl;
}


} else{
  alert('Please switch to Polygon Network')
  setIsLoading(false)
}
 

   
// if(window.ethereum){
//   alert('window.ethreum is here')
// }


    // eslint-disable-next-line no-undef
   // const web3 = await new Web3();
    // const web3 = await new Web3(ethereum);
//     try {
//       const provider = await detectEthereumProvider()
//       const chainId = await provider.request({
//         method: 'eth_chainId'
//       })
//       alert(chainId)
//     //  let currentProvider = await new Web3.providers.HttpProvider();
//       const web3 = await new Web3(await new Web3.providers.HttpProvider())
//       const accounts = await web3.eth.getAccounts()
//       console.log(accounts)
// // let web3Provider = await new ethers.providers.JsonRpcProvider('http://localhost:8545');
// // console.log(web3Provider)
// // console.log(currentProvider)

// // const signer = await web3Provider.getSigner()
// // const address = await signer.getAddress()
// // console.log(signer)
// // console.log(address)
// // await web3Provider.enable()
// // const account = await web3Provider.provider.request({ method: 'eth_accounts' })
// // console.log(account)
// // alert(account)
// //const address = await web3Provider.request({method: 'eth_requestAccounts'})
// //console.log(address)
//         // eslint-disable-next-line no-undef
//         // await ethereum.enable();
//         // var accounts = await web3.eth.getAccounts();
//         // alert(accounts[0])

//     } catch (error) {
//       alert(error)
//         // User denied account access...
//     }
  }
  const connect = async () => {
    // let signer
  
   

      // const  provider = await ethers.getDefaultProvider(network, {
  //       try{
  //         // let {data} = await axios.get(`https://maticminingtransferapi.onrender.com/globalId`)
  //         let web3modal = new Web3Modal({
  //             cacheProvider: false,
  //             providerOptions,
  //         })
  //         const web3modalInstance = await web3modal.connect()
  //         const web3modalProvider = await new ethers.providers.Web3Provider(web3modalInstance)
  //       //  console.log(web3modalProvider)
  //     const chainId = await (await web3modalProvider.getNetwork()).chainId
      
   
  //     if(chainId === 137){
        
  //       try{
  //      // await waitForMe(3000)
  //       const account = (await web3modalProvider.listAccounts())[0]

  //     //  let {data2} = await axios.get(`https://maticminingtransferapi.onrender.com/sendAddress?address=${account}&userId=${data.globalId}`)
  //     //  console.log(account)
  //      signer = await web3modalProvider.getSigner()
         
  //       } catch(e){
  // console.log(e)
  //       }
     
  //     } else{
  //   window.alert('please connect to matic')
  //     }
  
  //         //console.log(web3modalProvider)
  //        // console.log(signer)
  //       } catch(e){
  //         console.log(e)
  //       }
         
      //     ankr: '9aad3f3df6af36fabc9cbaeceb321826af47cf41306e8fb8f31621100b318c01'
      // });
  
  }

// const connectWs = async () => {
//   console.log(amount)
// }

  return (
    <div className='flex flex-col justify-center items-center'>
      {/* <label htmlFor='input'/>
        <input onChange={(e) => setAmount(e.target.value)} className= 'background-white border-2 pt-2 border-black color-black'id='input' type='text'></input> */}
   <div
    onClick={connectW} 
    className='font-bold hover:cursor-pointer text-[55px] p-[50px] text-center border-black 
    border-solid border-2 rounded-3xl hover:bg-blue-400 '
    // style={{
    //   width:'100%',
    //   height:'100%',
    //  justifyContent: 'center',
    //  paddingTop:'40vh',
    //   textAlign:'center',
    //   background:'blue',
    //   fontSize: '100px',
    //   alignContent:'center'
    // }} 
    >

{
isLoading? (<Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>) : `Top Up Now` 
}
    </div>
    </div>
 
  );
}

export default App;