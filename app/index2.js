import fetch from 'isomorphic-fetch';
import 'babel-polyfill';
window.LINKAGE=class LINKAGE {
    constructor(json){
        this._Sel_=[];
        this.isUnChaneindex=-1;
        this.first=false;
        this.selListAll=this.selListAll.bind(this);
        this.json=json;
        for(let i=0;i<json.id.length;i++){
            this._Sel_.push(document.querySelector(json.id[i]));
        }
        this.linkAgeData=[];
        this.indArr=[0,0,0];
        this.getAjax(json._ajax_)
            .then((res)=>{
                this.linkAgeData=res;
                this.selListAll()
                this.change();
                this.first=true;
            });
    }

    selListAll(){
        let result=this.json._ajax_.resKey.result?this.linkAgeData[this.json._ajax_.resKey.result]:this.linkAgeData;
        let linkAgeArray=this.json._ajax_.resKey.linkAgeArray;//循环等级及相关数据对应的key值名称

        for(let i=0;i<linkAgeArray.length;i++){
            if(this.isUnChaneindex<i){
                console.log(i,this.isUnChaneindex)
                this.pushOption(result,{
                    id:linkAgeArray[i]['id'],
                    name:linkAgeArray[i]['name']
                },this._Sel_[i]);
                this._Sel_[i].setAttribute('lev',i);
            }
            // console.log(i,result,result[0])

            //下一个集合
            let oChildKey=linkAgeArray[i+1]?linkAgeArray[i+1]['arrKey']:null;
            if(oChildKey){
                //alert(this.indArr )
                result=Object.assign([],[
                    ...result[this.indArr[i]][oChildKey]
                ])
            }
        }
    }

    change(){
        for(let i=0;i<this._Sel_.length;i++){
            (function (_this,oSel) {
                oSel.addEventListener('change', function(){
                    let id=this.value;
                    let ind=oSel.getAttribute('lev');
                    let childInd=oSel.selectedIndex;
                    _this.indArr[ind]=childInd;
                    _this.isUnChaneindex=ind;
                    _this.selListAll();
                },false);
            })(this,this._Sel_[i]);
        }
    }

    pushOption(list,keys,oSel){
        console.log('list',list)
        let str='';
        for(let i=0;i<list.length;i++){
            str+=`<option value="${list[i][keys.id]}" >
                                ${list[i][keys.name]}
                            </option>`
        }
        oSel.innerHTML=str;
    }

    getAjax(_ajax_){
        /*let url=_ajax_.url;
        let url2='';
        if(_ajax_.data){
            let urlArray=[];
            for(let name in _ajax_.data){
                urlArray.push(name+'='+_ajax_.data[name]);
            }
            url2+=urlArray.join('&');
        }
        return fetch(url,{
            method:_ajax_.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: url2
        })
            .then(response => response.json())
            .then(json =>{
                return json;
            })*/
        let url=_ajax_.url;
        let url2='';
        if(_ajax_.data){
            let urlArray=[];
            for(let name in _ajax_.data){
                urlArray.push(name+'='+_ajax_.data[name]);
            }
            url2+=urlArray.join('&');
        }
        return fetch(url,{
            method:_ajax_.method,
            credentials:'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }//,
           // body: url2
        })
            .then(response => response.json())
            .then(json =>{
                return json;
            })

    }
}
/*
window.LINKAGE=new LINKAGE({
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
});*/
