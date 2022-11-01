const axios = require('axios');
const ref='09-03-2022';
const fournisseurs=[
    'SOMAPHAR',
]
for(const fournisseur of fournisseurs){

        axios.get(`http://localhost:4000/upload/json/${fournisseur}/${ref}.json`).then(response =>{
            console.log(response)
        })
     
}