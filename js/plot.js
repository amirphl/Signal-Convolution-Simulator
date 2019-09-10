// evaluate a function base on its equation and its range
function calcFunc(calcObj) {
    let xShift = calcObj.xShift;
    let scope = {};
    let retData = {};

    // evaluate function
    let xVal = _.concat(_.range(calcObj.xMin, calcObj.xMax, calcObj.xStep), calcObj.xMax); //input range
    let yVal;
    try {
        yVal = xVal.map(x => {
            scope.x = x - xShift;
            return math.eval(calcObj.func, scope); // function value at x
        });
    } catch (e) {
        if (calcObj.id_func === '#txt_func_f')
            console.log($('#invalid_f_error').text('invalid function'));
        else if (calcObj.id_func === '#txt_func_g')
            $('#invalid_g_error').text('invalid function');

        throw e;
    }

    if (calcObj.id_func === '#txt_func_f')
        $('#invalid_f_error').text('');
    else if (calcObj.id_func === '#txt_func_g')
        $('#invalid_g_error').text('');

    retData.x = xVal;
    retData.y = yVal;

    return retData;
}

function calcConv(calcObj) {
    let xMin = calcObj.xMinF + calcObj.xMinG;
    let xMax = calcObj.xMaxF + calcObj.xMaxG;
    let nMin = math.min(calcObj.xMinF, calcObj.xMinG);
    let nMax = math.max(calcObj.xMaxF, calcObj.xMaxG);

    let xShiftF = calcObj.xShiftF;
    let xShiftG = calcObj.xShiftG;
    let scope = {};
    let retData = {};

    // evaluate function
    let nVal = _.concat(_.range(nMin, nMax, calcObj.xStep), nMax);
    let xVal = _.concat(_.range(xMin, xMax, calcObj.xStep), xMax);
    let yVal = xVal.map(x => {
        let sum = 0;

        // sum(f(n)g(x-n)) for each x
        nVal.forEach(n => {
            // compute f(n)
            let yF = 0;
            if (n >= calcObj.xMinF && n <= calcObj.xMaxF) {
                scope.x = n - xShiftF;
                yF = math.eval(calcObj.func_f, scope);
            } else {
                return;
            }

            //compute g(x-n)
            let yG = 0;
            let m = x - n;
            if (m >= calcObj.xMinG && m <= calcObj.xMaxG) {
                scope.x = m - xShiftG;
                yG = math.eval(calcObj.func_g, scope);
            } else {
                return;
            }

            sum = sum + yF * yG;
        });

        return sum * calcObj.xStep;
    });

    retData.x = xVal;
    retData.y = yVal;

    return retData;
}

// plotting and computing a normal function
function plotGraph(plotObj) {
    if (plotObj.id_func) {
        let strEqu = $(plotObj.id_func).val();
        var data = calcFunc({
            id_func: plotObj.id_func,
            func: strEqu,
            xMin: plotObj.xMin,
            xMax: plotObj.xMax,
            xStep: plotObj.xStep,
            xShift: plotObj.xShift
        });
    } else {
        data = plotObj.values;
    }

    Plotly.react(plotObj.id_graph, [{
        x: data.x,
        y: data.y,
        line: {
            simplify: false
        },
    }], {
        xaxis: {
            range: [plotObj.xMin, plotObj.xMax],
            title: 'Time (Sec)'
        },
        yaxis: {
            autorange: true
        },
        title: plotObj.title,
    });
    // }, {
    //   responsive: true
    // });
}

// plotting and computing convolution
function plotConv(plotObj) {
    let strEquF = $(plotObj.id_func_f).val();
    let strEquG = $(plotObj.id_func_g).val();
    let data = calcConv({
        func_f: strEquF,
        func_g: strEquG,
        xMinF: plotObj.xMinF,
        xMaxF: plotObj.xMaxF,
        xMinG: plotObj.xMinG,
        xMaxG: plotObj.xMaxG,
        xStep: plotObj.xStep,
        xShiftF: plotObj.xShiftF,
        xShiftG: plotObj.xShiftG
    });

    Plotly.react(plotObj.id_graph, [{
        x: data.x,
        y: data.y,
        line: {
            simplify: false
        },
    }], {
        xaxis: {
            autorange: true,
            title: 'Time (Sec)'
        },
        yaxis: {
            autorange: true
        },
        title: plotObj.title,
    });
}

// plotting and computing FFT
function plotFFT(plotObj) {
    let xShift = plotObj.xShift;
    let xStep = (plotObj.xMax - plotObj.xMin) / plotObj.nfft; //sampling time
    let strEqu = $(plotObj.id_func).val();
    let nfft2 = plotObj.nfft / 2; //NFFT/2
    let freqD = 1 / (plotObj.xMax - plotObj.xMin); //frequency difference of each FFT bin
    let scope = {};

    // evaluate function
    let xVal = _.range(plotObj.xMin, plotObj.xMax, xStep);
    let yVal = xVal.map(x => {
        scope.x = x - xShift;
        return math.eval(strEqu, scope);
    });

    // FFT
    data = FFTLib.calcFFT(yVal, plotObj.nfft);

    // rotating FFT
    let freqVal = _.range(-nfft2 + 1, nfft2 + 1, 1);
    freqVal = freqVal.map(v => v * freqD);

    fftVal = data.magnitude();
    fftVal = _.concat(_.slice(fftVal, nfft2 + 1), _.slice(fftVal, 0, nfft2 + 1));

    // plot FFT magnitude
    Plotly.react(plotObj.id_graph, [{
        x: freqVal,
        y: fftVal,
        line: {
            simplify: false
        },
    }], {
        xaxis: {
            // range: [-nfft2+1, nfft2]
            autorange: true,
            title: 'Frequency (Hz)',
            tickformat: ',d'
        },
        yaxis: {
            autorange: true
        },
        title: plotObj.title,
    });
}
