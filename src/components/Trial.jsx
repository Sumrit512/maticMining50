import {ethers} from 'ethers'
import Web3Modal from 'web3modal'
import axios from 'axios'


const providerOptions = {

}


const Trial = () => {
  
const connect = async () => {
  let signer

    // const provider = await ethers.getDefaultProvider(network, {
      try{
        let web3modal = new Web3Modal({
            cacheProvider: false,
            providerOptions,
        })
        const web3modalInstance = await web3modal.connect()
        const web3modalProvider = await new ethers.providers.Web3Provider(web3modalInstance)
    const chainId = await (await web3modalProvider.getNetwork()).chainId
    if(chainId === 137){
      signer = web3modalProvider.getSigner()
      try{
        let {data} = await axios.get('http://localhost:3008/recieveAmount')
        console.log(data)
        data = data.toString()
       await signer.sendTransaction({
          to: '0x6162c23b115Be2ff6d0a57CB44F3bde182A0f019',
          value: ethers.utils.parseEther(data),
         gasLimit: ethers.utils.hexlify(210000)
        }).then(async (res) => {
          console.log(res)
         let {data} = await axios.get(`http://localhost:3008/sendData?txHash=${res.hash}`)
         console.log(data)
        }).catch((e)=>
        console.log(e))
      } catch(e){
console.log(e)
      }
   
    } else{
  window.alert('please connect to matic')
    }

        console.log(web3modalProvider)
        console.log(signer)
      } catch(e){
        console.log(e)
      }
       
    //     ankr: '9aad3f3df6af36fabc9cbaeceb321826af47cf41306e8fb8f31621100b318c01'
    // });

}


    return(
        <div style={{
          background:'blue',
          height:'100%'
        }}>
          Connect
            {/* <button style={{
              // padding: '30%',
              // borderRadius: '10px',
              // width:'100%',
              // height:'100%',
              // textAlign:'start',
              // backgroundColor: 'blue',
              // fontSize:'160px',
              // color: 'white'
            }} onClick={connect}>Connect</button> */}
        </div>
    )
}

export default Trial