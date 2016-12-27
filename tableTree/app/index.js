import fetch from 'isomorphic-fetch';
import 'babel-polyfill';

window.TableTree=class TableTree{
    constructor(json){
        this.resultkey=json.resultkey;
        this.append=json.append;
        this.ajax(json.ajax)
            .then((res)=>{
                this.data=res;
                this.pushList();
            });

    }

    ajax(_ajax_){
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

    pushList(){
        let result=Object.assign([],this.data,[
            ...this.data
        ])
        if(this.resultkey.parent){
            let child=this.resultkey.child;
            result=[
                {
                    [child]:result[this.resultkey.parent]
                }
            ]
        }
        //console.log(result[0],this.resultkey.parent)
        let str='';
        str+=`<table class="table">
                <thead>
                
                </thead>
                <tbody>
                    
                </tbody>
            </table>`;
        document.querySelector(this.append).innerHTML=str;
        //tobdy
        let bodyStr='';
        console.log(result,'Result');

        let i=0;
        let row=Object.assign([],result[i][this.resultkey.child]);
        while(row){
            let iRow=Object.assign([],row[i]);
            console.log(iRow.title)
            let ii=0;
            while(iRow.length>0){
                iRow=iRow[this.resultkey.child]?iRow[this.resultkey.child]:[];
                ii++;
                if(ii>3)break;
            }
            i++;
            if(i>5)break;
        }

        /*for(let i=0;i<result.length;i++){
            console.log('-------',i,'-------')
            let row=Object.assign([],result[i][this.resultkey.child]);
            //console.log(row)
            let c=0;
            let iRow=Object.assign([],row);
            console.log(iRow)
            while(iRow.length){
                for(let j=0;j<iRow.length;j++){
                    //console.log(iRow[j])
                }
                //console.log(c,iRow);
                iRow=iRow[c]?iRow[c][this.resultkey.child]:[];
                c++;
                if(c>5)break;
            }
        }*/
        document.querySelector(this.append+' tbody').innerHTML=bodyStr;
    }
}