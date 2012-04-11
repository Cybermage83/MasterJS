/**
 * Created by JetBrains PhpStorm.
 * User: andrey
 * Date: 2/20/12
 * Time: 12:43 PM
 * To change this template use File | Settings | File Templates.
 */
//429233d7a6
(function(window,document){

    var MASTER = function(){console.log('MASTER INITIALIZED');
        var masterHolder = [], masterExe = {}, M = this;

        function parseMasterHolder (name){
            for(var method in masterHolder[masterHolder.length-1]){
                masterExe[name+'.'+method] = masterHolder[masterHolder.length-1][method];
            }

        }
        function parseMasterArray(obj){
            masterHolder.push(obj);
        }

        return{
            Init: function(name,typeFunc){console.log('INIT INITIALIZED');
                var m = this;
                console.log('What is the type: >>', typeof typeFunc);

                switch(typeof typeFunc){
                    case 'object':
                        parseMasterArray(typeFunc);
                        console.log(masterHolder);
                        parseMasterHolder(name);
                        console.log(masterExe);
                        console.log('Object Has been found');
                    break;
                    case 'function':
                        console.log('Function Has been found');
                        masterHolder.push(typeFunc());
                        parseMasterHolder(name);
                    break;
                    case 'undefined':
                        console.log('Undefined Has been found');
                        switch(typeof name){//name = function since name typeFunc is undefined
                            case 'function':
                                console.log('Function Has been found Inside');
                                masterHolder.push(name());
                            break;
                            case 'object':
                                console.log('Object Has been found Inisde');
                            break;
                        }
                    break;

                    default:
                        if(console){console.log('We have problem with implementation!')}
                    break;
                }


            },
            Add: function(name,func){console.log('ADD INITIALIZED');
                var m = this;

                if(name){
                    for(var method in m){
                        if(m.hasOwnProperty(name)){
                           // console.log('Duplicate Namespace found in: >>', name, m[method]);//arguments.callee.caller
                        }else{
                            m[name]= func;
                        }
                    }
                }
            },
            Integrate: function(){console.log('INTEGRATE INITIALIZED');

            },
            masterHolder: function(){
                console.log('masterHolder >>',masterHolder);
                return masterHolder;
            },
            masterHolderClear: function(){
                masterHolder = [];
                console.log('masterHolderClear >>', masterHolder);
                return masterHolder;
            },
            masterExe: function(){
              console.log('MasterExe >>', masterExe);
                return masterExe;
            }
        }
    };

    window.master = master = new MASTER();


    master.Init("newFunc",function(){console.log('newFunc is initialized!');
        var NI = this;
        return{
            init: function(){console.log('newFunc internal "Init" executed');

            },
            execute: function(){console.log('newFunc internal "execute" executed');

            }
        }
    });

    master.Init("newObj",{
        init: function(){

        },
        execute: function(){

        }
    });

    master.Init({
        init: function(){

        },
        execute: function(){

        }
    });

    master.Init(function(){
        var i = this;

    });

    master.Add("each",function(arg,func){
        //something[1,2,3]dffdf
        for(var x =0;x<arg.length;x+=1){
            if(typeof func === 'function'){
                func.call(arg[x],x);
            }
        }

    });

    master.masterHolder();
    window.masterExe = masterExe = master.masterExe();
    console.log(masterExe);
    masterExe['newFunc.init']();
    masterExe.newOne = function(){console.log('New ONE')};
    console.log(masterExe);

})(window,document,undefined);
console.log(master);
master.Init(function(){
    console.log('I ran a master function');
});

master.each([1,2,3],function(x){
   console.log('Running each Function!', this * 2,x);
});

