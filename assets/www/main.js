
var acc_stat = false;
var acc_watch;
var acc_max = 0;

document.addEventListener("deviceready", function(){
    navigator.notification.beep(1);
  	navigator.notification.vibrate(0);
    accel(true);
}, true);

$(function(){
    log('start');
    $('div#color').css('width','100%').css('height',400).css('background-color', '#000000');
    $('div#color').click(function(){
        navigator.notification.beep(1);
  	    navigator.notification.vibrate(0);
    });
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
        opts.frequency = 30;
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
    var r = Math.floor(acc.x*60);
    if(r < 0) r *= -1;
    if(r > 255) r = 255;
    var g = Math.floor(acc.y*60);
    if(g < 0) g *= -1;
    if(g > 255) g = 255;
    var b = Math.floor(acc.z*60);
    if(b < 0) b *= -1;
    if(b > 255) b = 255;
    $('div#color').css('background-color',$.parseColorCode([r,g,b]));
};
