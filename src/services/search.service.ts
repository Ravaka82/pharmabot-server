import {Searches} from "../model";
import {TryCatch} from "../utils/error.handler";

export default {

    async create(payload) {
        return TryCatch(async () => {
            return Searches.create(payload)
        }, `Error for creating searches`);
    },

    getAll() {
        return TryCatch(() => Searches.find().populate('user'), `Cannot get searches`);
    },
    async countOccurence(){
        let result = await Searches.aggregate([
        { $unwind: "$searches"},
        { $project: {keyword:"$searches.keyword"}},
        { $project: { keyword: { $toLower: "$keyword" }}},
        { $project: { keyword: { $trim: { input: "$keyword" }}}},
        { $group: {_id:"$keyword",count: { $sum: 1 }}},
        { $sort: { count: -1 }}
    ])
        console.log(result);
        return TryCatch(async () => result);
    }, 
    async addOccurenceByMonth(month: string,nombre: string){
        let dataAll = await Searches.find();
        let dataMonth = [];
        let dataPush = [];
        let dataKeyword = [];
        for(let data of dataAll){
              let history = getMYYYY(data.history);
              if(history== month){
                for(let x of data.searches){
                    if(history )
                    dataPush.push({
                    keyword:x['keyword'],
                    at:history  
                })
                dataKeyword.push({
                    keyword: x['keyword']
                  })
              }
              dataMonth.push({
                 month: history
              })
         }}
        let dataCounted = [];
        let i = 0;
            dataPush.forEach(async (x)=>{
                if(dataCounted.some((val)=>{ return val['keyword'] == aggregateIt(x['keyword']) })){
                 dataCounted.forEach((k)=>{
                    if(aggregateIt(k['keyword']) === aggregateIt(x['keyword'])){ 
                      k["count"]++
                    }
                 })
                }else{
                  let a = {}
                  a['_id']=i++
                  a['keyword'] = aggregateIt(x['keyword'])
                  a["count"] = 1
                  a['at'] = x['at']
                  await dataCounted.push(a);
                }
             })
             
        for(let x of dataCounted){
            console.log(x);
        }
        let dataFin=[];
        const sortedArray = sortArrayOfObjects(dataCounted, "count", "descending");
        const size =parseInt( nombre);
        dataFin = sortedArray.slice(0, size)
        return await dataFin;
    }
}

function lowerIt(keyword: string){
    return keyword.toLowerCase();
}

function trimIt(keyword: string){
    return keyword.replace(/^\s+|\s+$/gm,'');
}

function aggregateIt(data: string){
    let lowered = lowerIt(data);
    let trimed = trimIt(lowered);
    return trimed;
}
function swipe(place: string, valeur: string){
    var rep1 = place.replace(place,valeur);
    return rep1;
}

function getMYYYY(date: String){
    var dateDay = date.charAt(0)+date.charAt(1);
    var dateMonth = date.charAt(3)+date.charAt(4);
    var dateYear = date.charAt(6)+date.charAt(7)+date.charAt(8)+date.charAt(9);
    var rep1 = swipe(dateDay,dateMonth);
    return rep1+"/"+dateYear;
}
const sortArrayOfObjects = <T>(
    data: T[],
    keyToSort: keyof T,
    direction: 'ascending' | 'descending' | 'none',
  ) => {
    if (direction === 'none') {
      return data
    }
    const compare = (objectA: T, objectB: T) => {
      const valueA = objectA[keyToSort]
      const valueB = objectB[keyToSort]
  
      if (valueA === valueB) {
        return 0
      }
  
      if (valueA > valueB) {
        return direction === 'ascending' ? 1 : -1
      } else {
        return direction === 'ascending' ? -1 : 1
      }
    }
  
    return data.slice().sort(compare)
  }
