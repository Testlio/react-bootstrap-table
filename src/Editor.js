import React from 'react';
var Editor=function(editable,attr,format,editorClass){


    if(editable===true||typeof editable==="string"){//simple declare
        var type=editable===true?'text':editable;
        return (
            <input {...attr} type={type} className={(editorClass||"")+" form-control editor edit-text"}/>
        )
    } else if(!editable){
      var type=editable===true?'text':editable;
      return (
          <input {...attr} type={type} className={(editorClass||"")+" form-control editor edit-text"} disabled='disabled'/>
      )
    } else if(editable.type){//standard declare
        //put style if exist
        editable.style&&(attr.style=editable.style);

        //put class if exist
        attr.className=(editorClass||"")+" form-control editor edit-"+editable.type+(editable.className?(" "+editable.className):"");

        if(editable.type=='select'){//process select input
            var options=[],datas=editable.datas;
            if(Array.isArray(datas)){//only can use arrray data for options
                var rowValue;
                options=datas.map(function(d,i){
                    rowValue=format?format(d):d;
                    return(
                        <option key={'option'+i} value={d}>{rowValue}</option>
                    )
                })
            }
            return(
                <select {...attr} >{options}</select>
            )
        }else if(editable.type=='textarea'){//process textarea input
            //put  other if exist
            editable.cols&&(attr.cols=editable.cols);
            editable.rows&&(attr.rows=editable.rows);
            var keyUpHandler=attr.onKeyDown,saveBtn=null;
            if(keyUpHandler){
                attr.onKeyDown=function(e){
                    if (e.keyCode != 13) { //not Pressed ENTER
                        keyUpHandler(e);
                    }
                };
                saveBtn=<butto className="btn btn-info btn-xs textarea-save-btn" onClick={keyUpHandler}>save</butto>
            }


            return(
                <div>
                    <textarea {...attr} ></textarea>
                    {saveBtn}
                </div>

            )
        }else{//process other input type. as password,url,email...
            return(
                <input {...attr} type={type}/>
            )
        }
    }
    //default return for other case of editable
    return(
        <input {...attr} type="text" className={(editorClass||"")+" form-control editor edit-text"}/>
    )
};

export default Editor;