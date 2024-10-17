# Telegram Webapp CloudStorage Multichain Wallet Solution SDK

This repo is about the telegram wallet solution base on [Telegram cloudstorage](https://core.telegram.org/bots/webapps#cloudstorage) & [HDWallet](https://www.npmjs.com/package/@tonsprotocol/hdwallet) 

Support users to generate and storage the wallet information/interface via telegram cloudstorage .

# How to use it ?

Install the package

```
pnpm i @tonsprotocol/telegram-cloudstorage-wallet

```

Now try use it in your font-end 

```
import CloudStorageWallet from "@tonsprotocol/telegram-cloudstorage-wallet" 

await CloudStorageWallet.init("mywallet")
```