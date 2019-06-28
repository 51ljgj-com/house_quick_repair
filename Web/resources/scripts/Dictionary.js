function Dictionary(){
    this.add = add;
    this.datastore = new Object();
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.length = length;
    this.count = count;
    this.clear = clear;
    this.sort = sort;
}

function add(key, value){
    this.datastore[key] = value;
}

function find(key){
    return this.datastore[key];
}

function remove(key){
    delete this.datastore[key];
}

function count(){
    var n = 0;
    for (var key in this.datastore) {
        ++n;
    }
    return n;
}

function showAll(){
    for (var key in this.datastore) {
        document.write(key + '->' + this.datastore[key]);
        document.write('<br>');

    }
}

function sort(){
    var keys = Array();
    for (var key in this.datastore) {
        keys.push( key );
    }
    keys.sort();
    for (var i=0; i<keys.length; i++) {
        document.write(keys[i] + '->' + this.datastore[keys[i]]);
        document.write('<br>');
    }
}

function clear(){
    for (var key in this.datastore) {
        delete this.datastore[key];
    }
}
