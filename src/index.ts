import { cloudStorage  } from "@telegram-apps/sdk";
import { HDWallet } from "@tonsprotocol/hdwallet";


interface objKP {
  naclKp: {
    publicKey: Uint8Array;
    secretKey: Uint8Array;
  };
  evmKp: {
    address: string;
    privateKey: string;
  };
  solKp: {
    address: string;
    privateKey: string;
  };
  tonKp: any;
}
interface objAddress {
  evm: string;
  sol: string;
  ton: string;
  btc: string;
}

interface objActionRawData {
  t: number;
  i: string;
  d: string;
  c: string;
  r: string | null;
}

/**
 * Transaction Type
 */
interface objTonTxn {
  v: bigint | number;
  t: string;
  d: string;
}

interface objTonTxn {
  v: bigint | number;
  t: string;
  d: string;
}

interface initObj {
  sk?:string , //The private keypair
  pwd?:string , //The password
  path?:number , // The HD wallet path
}

 /**
  * CloudStorage wallet
  * 
  * - Create wallet from HDwallet
  * 
  * - Storage the base information & KP into the 
  * 
  */
export class CloudStorageWallet  {
  // New HDwallet auto generate wallets from a random keypair and return data

  static async init(path:string,data?:initObj) {
    let value = await cloudStorage.getItem(path)
    // console.log("get storage",value);
    let pwd = "";
    let wallet_path = 1;
    let sk = ""
    let kp
    if(!value || value?.length <10)
    {
      //Not been init
      if(data)
      {
        if(data.pwd)
        {
         pwd = data.pwd;
        }

        if(data.path)
        {
          wallet_path = data.path
        }

        if(data.sk)
        {
          //Import wallet
          sk = data.sk;
          kp = HDWallet.fromPrivateKey(
            {
              sk : data.sk ,
              pwd : pwd , 
              path : wallet_path
            }
          )
        }else{
          //Generate new wallet 
          kp = new HDWallet(
            {
              pwd:pwd, 
              path:wallet_path, 
            }
          )
        }
      }else{
        // Generate new allet with no password & path
        kp = new HDWallet()
      }
      await cloudStorage.setItem(path,JSON.stringify(
        {
          rawKp:kp.rawKp,
          pwd:kp.pwd,
          path:kp.path
        }
      ));
      return kp;
    }else{
      try{
        const raw = JSON.parse(value);
        return HDWallet.fromPrivateKey(
          {
            sk : raw?.rawKey ,
            pwd : raw?.pwd,
            path : raw?.path
          }
        )
      }catch(e)
      {
        await cloudStorage.deleteItem(path);
        return new CloudStorageWallet()
      }
    }
  }
  
}
