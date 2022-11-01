import axios from "axios";
import { CatalogueService } from ".";
import {Archive, ProductRefs} from "../model";
import {TryCatch} from "../utils/error.handler";

export default {
    create(payload) {
        return TryCatch(() => Archive.update(
                    {
                        ...payload
                    }, 
                        {
                        $setOnInsert: payload
                        },
                        {upsert: true})
        , `Cannot create archive.`)
    },
    async addOneDesignation(designation,dateStart,dateEnd){
        var Start = Date.parse(dateStart)/1000;
        var End = Date.parse(dateEnd)/1000;
        let result = [];
        let dataAllBdd  = await Archive.find({designation: designation});
        console.log("dataAllPoductRefs : "+dataAllBdd);
        for(const dataOneBdd of dataAllBdd){
            const dateModifsCatalogue = Date.parse(dataOneBdd['date_catalogue'])/1000;
            console.log(End >= dateModifsCatalogue  &&  dateModifsCatalogue >= Start )
            console.log("end"+ End);
            console.log("start"+ Start);
            console.log("dateCatalogue"+ dateModifsCatalogue);
            if(End >= dateModifsCatalogue && dateModifsCatalogue >= Start ){
                let data = dataOneBdd;
                console.log("looo"+ data['date_catalogue']);
                result.push(data);
            }
        }
        result.sort(function(x, y) {
            var firstDate = new Date(x.date_catalogue),
              SecondDate = new Date(y.date_catalogue);
            if (firstDate < SecondDate) return -1;
            if (firstDate > SecondDate) return 1;
            console.log("koko")
            return 0;
        });
        return result;
    },
    async addCommonName(commonName: any,dateStart,dateEnd){
        var Start = Date.parse(dateStart)/1000;
        var End = Date.parse(dateEnd)/1000;
        let result = [];
        let dataAllProductRefs= await ProductRefs.find().populate('refsMap');
        let dataAllArchive = await Archive.find();
        for(let dataArchive of dataAllArchive){
            let data = dataArchive;
            for(let dataProductRefs of dataAllProductRefs){
                    if(dataProductRefs.refsMap.name==commonName && dataProductRefs['nameProduct']==data['designation']){
                        const dateModifsCatalogue = Date.parse(data['date_catalogue'])/1000;
                        if(End >= dateModifsCatalogue && dateModifsCatalogue >= Start ){
                            console.log("end"+ End);
                            console.log("start"+ Start);
                            console.log("dateCatalogue"+ dateModifsCatalogue);
                            result.push(data);
                        }
                    }
             }
        }
        const resultFinaly = [];
        const map = new Map();
        for (const item of result) {
            if(!map.has(item._id)){
                map.set(item._id, true);    
                resultFinaly.push({
                    _id: item._id,
                    fournisseur: item.fournisseur,
                    date_catalogue: item.date_catalogue,
                    prix: item.prix
                });
            }
        }
        resultFinaly.sort(function(x, y) {
            var firstDate = new Date(x.date_catalogue),
              SecondDate = new Date(y.date_catalogue);
            if (firstDate < SecondDate) return -1;
            if (firstDate > SecondDate) return 1;
            console.log("koko")
            return 0;
        });
        return resultFinaly;
    },
    getAll() {
        return TryCatch(() => Archive.find(), `Cannot get all archive.`)
    },

    async deleteBulk({input}) {
        return TryCatch(() => Archive.deleteMany({_id: input || [] }), `Error for deleting archives`);
    },
    updateById({_id, changes}) {
        return TryCatch(() => {
            changes.updatedAt = new Date();
            return Archive.findByIdAndUpdate(_id, changes);
        }, `Cannot update archive.`)
    },
    async addJsonCatalogue(dateStart,dateEnd){
        try{
            const fs = require('fs');
            const allCatalogue = await CatalogueService.getAll();
            var Start = Date.parse(dateStart)/1000;
            console.log("date start "+dateStart);
            var End = Date.parse(dateEnd)/1000;
            console.log("date End "+dateEnd);
            let data = [];  
            let i=0;
            for(const Catalogue of allCatalogue){
                const fournisseur = Catalogue.fournisseur;
                const dateCatalogue = Catalogue.catalogue ;
                const ref = String(dateCatalogue).replace(/\//g,'-'); 
                const dateModifCatalogue = getMMjjYYYY(ref);
                const dateModifsCatalogue = Date.parse(dateModifCatalogue)/1000;
                console.log(dateModifCatalogue);
                if(End >= dateModifsCatalogue  && dateModifsCatalogue >= Start ){
                    if (fs.existsSync(process.cwd() + `/upload/json/${fournisseur}/${ref}.json`)){
                        await axios.get(`http://localhost:4000/upload/json/${fournisseur}/${ref}.json`).then(async response =>{
                            let newListData = response.data; 
                            for(const newList of newListData){
                                let newData = newList;
                                newData['date_catalogue'] = dateModifCatalogue;  
                                newData['fournisseur'] = fournisseur;  
                                data.push(newData);
                            } 
                        });
                    } 
                }
            }  
            let dataAll = data;
            if(dataAll.length > 0){
                for(const dataOne of dataAll){
                    await this.create(dataOne);
                }
            } 
            let dataArchiveBdd = await Archive.find();
            return dataArchiveBdd;
            }catch (err) {
                console.error(err)
                return false;
            }
    },
}
function swipe(place: string, valeur: string){
    var rep1 = place.replace(place,valeur);
    return rep1;
}
function getMMjjYYYY(date: String){
    var dateDay = date.charAt(0)+date.charAt(1);
    var dateMonth = date.charAt(3)+date.charAt(4);
    var dateYear = date.charAt(6)+date.charAt(7)+date.charAt(8)+date.charAt(9);
    var rep1 = swipe(dateDay, dateMonth);
    var rep2=swipe(dateMonth, dateDay);
    return rep1+"/"+rep2+"/"+dateYear;
}
function getjjMMYYYY(date: String){
    var dateDay = date.charAt(0)+date.charAt(1);
    var dateMonth = date.charAt(3)+date.charAt(4);
    var dateYear = date.charAt(6)+date.charAt(7)+date.charAt(8)+date.charAt(9);
    var rep1 = swipe(dateMonth, dateDay);
    var rep2=swipe(dateDay, dateMonth);
    return rep2+"/"+rep1+"/"+dateYear;
}
function getMYYYY(date: String){
    var dateDay = date.charAt(0)+date.charAt(1);
    var dateMonth = date.charAt(3)+date.charAt(4);
    var dateYear = date.charAt(6)+date.charAt(7)+date.charAt(8)+date.charAt(9);
    var rep1 = swipe(dateMonth, dateDay);
    return rep1+"/"+dateYear;
}



