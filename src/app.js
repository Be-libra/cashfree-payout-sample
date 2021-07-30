import dotenv from 'dotenv'
import express from 'express'
import axios from 'axios'
import cashfree from 'cashfree-sdk'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/get_authorisation_token',async(_,res)=>{
    console.log('hello')
    try{
        const verificaton_token = await axios({
            method:'post',
            url:`${process.env.base_url}/payout/v1/authorize`,
            headers:{
                'X-Client-Secret':process.env.secret_id,
                'X-Client-Id':process.env.client_id
            }
        })
        if(verificaton_token.status==='SUCCESS'){
            res.send(verificaton_token.data)
        }

        else{
            console.log(verificaton_token)
            res.json(verificaton_token.data)
        }
    }
    catch(err){
        console.log(err)
        res.send('something went wrong')
    }

})

app.post('/add_beneficiary', async(req,res)=>{
    try{
        const {Beneficiary} = cashfree.Payouts;
        const beneficiary_acct = await Beneficiary.Add({
            "beneId": "JOHN180127", 
            "name": "john doe",
            "email": "johndoe@cashfree.com", 
            "phone": "9639633378",
            "bankAccount": "026291800001191",  
            "ifsc":"YESB0000262",
            "address1" : "ABC Street", 
            "city": "Balasore", 
            "state":"Odisha", 
            "pincode": "756001"
        })
        if(beneficiary_acct.status==='SUCCESS'){
            res.send(beneficiary_acct.message)
        }
        else{
            res.json(beneficiary_acct.data)
        }
    }
    catch(err){
        console.log(err)
        res.send('something want wrong')
    }
})

app.post('/transfer',async(req,res)=>{
    try {
        const {Transfers} = cfSdk.Payouts;

        const response = await Transfers.RequestTransfer({
            "beneId": "JOHN180127",
            "transferId": "tranfer001234",
            "amount": "1.00",
        });
        if(response.status==='SUCCESS'){
            res.send(response.data)
        }
        else{
            res.json(response.data)
        }
    } catch (error) {
        console.log('something went wrong')
    }
})







app.listen(3000,()=>console.log('server started on port 3000'))