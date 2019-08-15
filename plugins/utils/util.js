export default {
    upLoadUrl: 'http://api.es-career.com/api/upload',
    uploadType: {
        excel: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
        image: 'image/*',
        zip: 'application/x-zip-compressed'
    },
    getStore(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    setStore(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    format(times){
        var time = new Date(times);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d);//+' '+add0(h)+':'+add0(mm)+':'+add0(s);
  
        function add0(m){return m<10?'0'+m:m }
    },
    formatMouth(times){
        var time = new Date(times);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'.'+add0(m);
  
        function add0(m){return m<10?'0'+m:m }
    },
    formatDate(times){
        var time = new Date(times);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return y+'-'+add0(m)+'-'+add0(d);
  
        function add0(m){return m<10?'0'+m:m }
    },
    formatTime(times){
        var time = new Date(times);
        var y = time.getFullYear();
        var m = time.getMonth()+1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        return add0(h)+':'+add0(mm);
  
        function add0(m){return m<10?'0'+m:m }
    }
};