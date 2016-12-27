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
            result=Object.assign([],result[this.resultkey.parent]);
        }
        console.log('RESULT',result)
        for(let i=0;i<result.length;i++){
            let oRow=Object.assign([],result[i]);
            let oChild=Object.assign([],oRow[this.resultkey.child]);
            let oOld=Object.assign([],result[i][this.resultkey.child]);
            let ii=0;
            let x=0;
            let count=0;
            while(oChild.length>0){
                count++;
                //console.log(oChild,ii,oChild[ii])
                //console.log(oNextParent,'aa')
                let b=null;
                if(!oChild[ii]){
                    //console.log(oChild[0],'true')
                    //有子级
                    ii=0;
                    if(oChild[0][this.resultkey.child]){
                        b='a';
                        //x=0;
                        oChild=oChild[ii][this.resultkey.child];
                        //console.log('has')
                        //没有子级返回到某某
                    }else{
                        b='b';
                        x++;
                        //console.log('x',x,ii,oOld[x])
                        if(!oOld[x])break;
                            oChild=Object.assign([],oOld[x][this.resultkey.child]);
                        if(!oChild)oChild=[];
                        //console.log('par',oChild,x)
                        //if(oChild.title)console.log(oChild.title)
                        if(x>5)break;
                    }
                }else{
                    b='c';
                    x=0;

                }
                console.log('CHILD_LIST',oChild[ii].title,ii,b,count,oChild[ii][this.resultkey.child])
                if(!oChild[ii]){}else{
                    ii++;
                }
                //if(oChild[ii].title)console.log(oChild[ii].title)
                if(ii>4)break;
            }
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