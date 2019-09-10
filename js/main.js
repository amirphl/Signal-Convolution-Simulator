// parameters
let plotStep = 0.02; //for plotting
let convStep = 0.025; // for computing convolution

let nfft = 512; // NFFT

let xMinF = {}; //min of x range
let xMaxF = {}; //max of x range
let xShiftF = {}; //shift for f(x)

let xMinG = {}; //min of x range
let xMaxG = {}; //max of x range
let xShiftG = {}; //shift for g(x)

// code
$(document).ready(() => {
    // initialization
    initSlider();
    init();
    // setting events for user actions
    setEvents();
    // javascript:introJs().start();
});
