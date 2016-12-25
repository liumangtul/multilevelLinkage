import fetch from 'isomorphic-fetch';
import 'babel-polyfill';
window.LINKAGE= class LINKAGE {
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
        this.indArr=[1,1,0];
        this.getAjax(json._ajax_)
            .then((res)=>{
                this.linkAgeData=res;
                //this.meId=[2,22,222];
                this.selListAll(true);
                this.change();
                this.first=true;
            });
    }

    selListAll(isFirst){
       // let result=this.json._ajax_.resKey.result.length?this.linkAgeData[this.json._ajax_.resKey.result]:this.linkAgeData;
        let result=[];
        if(this.json._ajax_.resKey.result.length){
            for(let i=0;i<this.json._ajax_.resKey.result.length;i++){
                result=Object.assign([],result,[
                    ...this.linkAgeData[this.json._ajax_.resKey.result[i]]
                ])
            }
        }else{
            result=Object.assign([],result,[
                ...this.linkAgeData
            ]);
        }
        if(isFirst){
            result=Object.assign([],result,[
                ...result[this.indArr[0]]
            ])
        }
        let linkAgeArray=this.json._ajax_.resKey.linkAgeArray;//循环等级及相关数据对应的key值名称

        for(let i=0;i<linkAgeArray.length;i++){
            if(this.isUnChaneindex<i){
                this.indArr[i]=0;
                this.pushOption(result,{
                    id:linkAgeArray[i]['id'],
                    name:linkAgeArray[i]['name']
                },this._Sel_[i]);

                this._Sel_[i].setAttribute('lev',i);
                if(this.meId){
                    this._Sel_[i].value=this.meId[i];

                    let ind=this._Sel_[i].getAttribute('lev');
                    this.indArr[ind]=this._Sel_[i].selectedIndex-1;
                    this.isUnChaneindex=ind;

                    //alert(this._Sel_[i].value+';'+this.meId[i])
                }else{
                    this._Sel_[i].value=this._Sel_[i].children.length>0?this._Sel_[i].children[0].value:null;
                }
            }

            //下一个集合
            let oChildKey=linkAgeArray[i+1]?linkAgeArray[i+1]['arrKey']:null;
            if(oChildKey){
                console.log('iii',result,this.indArr)
                if(result[this.indArr[i]]){
                    console.log('next',result[this.indArr[i]],this.indArr,i)
                    if(result[this.indArr[i]][oChildKey]){
                        console.log('next1',result[this.indArr[i]][oChildKey])
                        result=Object.assign([],[
                            ...result[this.indArr[i]][oChildKey]
                        ])
                        console.log(result,'AAAAAAA',i)
                    }else{
                        result=this.todoEmptied(result,2);
                        console.log(result,'ttttTTTT',i)
                    }
                }else{
                    result=this.todoEmptied(result,2);
                }
            }else{
                result=this.todoEmptied(result,3);
            }
        }

    }

    todoEmptied(result,num){
        //alert(num)
        let res=Object.assign([],null);
        return res;
        //console.log('return__',num,result,result[0])
    }

    change(){
        for(let i=0;i<this._Sel_.length;i++){
            (function (_this,oSel) {
                oSel.addEventListener('change', function(){
                    let ind=oSel.getAttribute('lev');
                    _this.indArr[ind]=oSel.selectedIndex-1;
                    _this.isUnChaneindex=ind;
                    _this.selListAll();
                },false);
            })(this,this._Sel_[i]);
        }
    }

    pushOption(list,keys,oSel){
        //console.error('list',list)
        let str='';
        console.log(list,'aaa')
        if(list.length){
            str+=`<option value="0">请选择</option>`;
            for(let i=0;i<list.length;i++){
                str+=`<option value="${list[i][keys.id]}" >
                                ${list[i][keys.name]}
                            </option>`
            }
        }else{
            str='<option>请选择</option>'
        }
        oSel.innerHTML=str;
    }

    getAjax(_ajax_){
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
                //body: url2
            })
                .then(response => response.json())
                .then(json =>{
                     return json;
                })

    }
}
/*
* 使用示例
*
*
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
*
* */