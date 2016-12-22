import LINKAGE from './index';
let linkAge=new LINKAGE({
    id:['#sel1','#sel2','#sel3'],
    _ajax_:{
        url:'./test.json',
        data:{
            test:'a',
            t:1
        },
        method: "get",
        resKey:{
            result:'result',//返回数据的key字段数组,如果没有直接就是返回数据
            linkAgeArray:[{
                id:'id',
                name:'name',
                arrKey:'result'
            },{
                id:'child_id',
                name:'child_name',
                arrKey:'child'
            },{
                id:'childChild_id',
                name:'childChild_name',
                arrKey:'childChild'
            }]
        }
    }
});