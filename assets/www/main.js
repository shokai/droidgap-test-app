
var acc_stat = false;
var acc_watch;
var acc_max = 0;

document.addEventListener("deviceready", function(){
    navigator.notification.beep(1);
  	navigator.notification.vibrate(1);
    accel(true);
}, true);

$(function(){
    log('start');
});

function log(message){
    $('div#log').prepend($('<p>').html(message));
};

function accel(start_stop){
    log("accel "+start_stop);
    if(start_stop == acc_stat) return;
    acc_stat = start_stop;
    if(start_stop){
        var opts = new Object();
        opts.frequency = 100;
        acc_watch = navigator.accelerometer.watchAcceleration(
            display_acc, function(e){
                acc_stat = false;
                navigator.accelerometer.clearWatch(acc_watch);
                log("accelerometer error "+e.name+":"+e.message);
            }, opts);
    }
    else{
        navigation.accelerometer.clearWatch(acc_watch);
        display_acc(new Object());
    }
};

function display_acc(acc){
    $('div#acc_vars div#x').html('x : '+acc.x);
    $('div#acc_vars div#y').html('y : '+acc.y);
    $('div#acc_vars div#z').html('z : '+acc.z);
};
