import https from 'https';
import readline, { createInterface } from 'readline';

import { error } from 'console';


const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

// const apikey = ''
const url = " https://v6.exchangerate-api.com/v6/552a903243a11a26aeb35ee3/latest/USD"
const convertCurrency = (a,b) =>{
  return (a*b).toFixed(2)
}
https.get(url,(res) =>{
    let data = ""
    res.on('data',(chunk)=>{
     data+=chunk;
    //  console.log(JSON.stringify(chunk))
    })

    res.on('end',()=>{
        const rates = JSON.parse(data).conversion_rates
        // console.log(rates)
        rl.question('Enter the amount in usd : ',(amount) =>{
               rl.question('Enter the targer currency(e.g., INR,EUR,NPR) :',(currency ) =>{
             const rate = rates[currency.toUpperCase()]
             if (rate) {
                console.log(`${amount} USD is approximately ${convertCurrency(amount,rate)} ${currency}`)
             }
               })
        })
    })
})