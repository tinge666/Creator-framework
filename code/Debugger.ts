

export function initDebugSetting(): void {
    // cf.Log = cf.Warn = cf.Error = cf.Info = cf.LogID = cf.WarnID = cf.ErrorID = function(){};
    if (_DEBUG) {
        if (_IN_WEB_DEBUG) {
            cf.Log = console.log;
            cf.Warn = console.warn;
            cf.Error = console.error;
            cf.Info = console.info;
        }else {
            cf.Log = function() {
                return cc.log.apply(null, arguments);
            }
            cf.Warn = function() {
                return cc.log.apply(null, arguments);
            }
            cf.Error = function() {
                return cc.error.apply(null, arguments);
            }
            cf.Info = function() {
                return cc.info.apply(null, arguments);
            }
        }
        cf.Debug = function(msg: any, ...subst: any[]) {
            cf.Info(`[${timeFormat()}] `+msg, ...subst);
        }

        cf.LogID = genLogFunc(cf.Log, 'Log');
        cf.WarnID = genLogFunc(cf.Warn, 'Warning');
        cf.ErrorID = genLogFunc(cf.Error, 'Error');
    }
}

function genLogFunc(func: Function, type: string): Function {
    return function(id: number) {
        if (_DEBUG) {
            if (arguments.length === 1) {
                func(type + ': ' + cf._LogInfos[id]);
            }else {
                let argsArr: any[] = [];
                for (let i: number = 1; i < arguments.length; ++i) {
                    argsArr.push(arguments[i]);
                }

                if (arguments.length === 2) {
                    func(type + ':' + cf._LogInfos[id] + ' ' + arguments[1]);
                }
            }
        }
    }
}

function timeFormat() {
    var time: Date = new Date();
    var year: string = time.getFullYear().toString();
    var month: string = (time.getMonth() + 1).toString();
    var date: string = time.getDate().toString();
    var h: string = time.getHours().toString();
    var m: string = time.getMinutes().toString();
    var s: string = time.getSeconds().toString();
    month = month.toString().length == 1 ? '0' + month : month;
    date = date.toString().length == 1 ? '0' + date : date;
    h = h.toString().length == 1 ? '0' + h : h;
    m = m.toString().length == 1 ? '0' + m : m;
    s = s.toString().length == 1 ? '0' + s : s;
    return year + '-' + month + '-' + date + ' ' + h + ':' + m + ':' + s;
}