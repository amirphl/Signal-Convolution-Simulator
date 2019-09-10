function init() {
    // math functions
    let strSelFunc = $("#sel_func_f option:selected").text();
    $('#txt_func_f').val(strSelFunc);

    strSelFunc = $("#sel_func_g option:selected").text();
    $('#txt_func_g').val(strSelFunc);

    // sliders
    xMinF = $('#slider_range_f').data('from');
    xMaxF = $('#slider_range_f').data('to');

    xMinG = $('#slider_range_g').data('from');
    xMaxG = $('#slider_range_g').data('to');

    // shift
    xShiftF = $('#slider_shift_f').data('from');
    xShiftG = $('#slider_shift_g').data('from');

    // plotting graphs
    plotGraph({
        id_func: '#txt_func_f',
        id_graph: 'graph_f',
        title: 'f(x)',
        xMin: xMinF,
        xMax: xMaxF,
        xStep: plotStep,
        xShift: xShiftF
    });

    plotGraph({
        id_func: '#txt_func_g',
        id_graph: 'graph_g',
        title: 'g(x)',
        xMin: xMinG,
        xMax: xMaxG,
        xStep: plotStep,
        xShift: xShiftG
    });
}

function setEvents() {
    // selector
    $('#sel_func_f').on('change', () => {
        let strSelFunc = $("#sel_func_f option:selected").text();
        $('#txt_func_f').val(strSelFunc);

        plotGraph({
            id_func: '#txt_func_f',
            id_graph: 'graph_f',
            title: 'f(x)',
            xMin: xMinF,
            xMax: xMaxF,
            xStep: plotStep,
            xShift: xShiftF
        });
    });

    $('#sel_func_g').on('change', () => {
        let strSelFunc = $("#sel_func_g option:selected").text();
        $('#txt_func_g').val(strSelFunc);

        plotGraph({
            id_func: '#txt_func_g',
            id_graph: 'graph_g',
            title: 'g(x)',
            xMin: xMinG,
            xMax: xMaxG,
            xStep: plotStep,
            xShift: xShiftG
        });
    });

    // plot graph on equation change
    $('#txt_func_f').on('keypress', e => {
        if (e.keyCode === 13) { // enter key
            plotGraph({
                id_func: '#txt_func_f',
                id_graph: 'graph_f',
                title: 'f(x)',
                xMin: xMinF,
                xMax: xMaxF,
                xStep: plotStep,
                xShift: xShiftF
            });
        }
    });

    // plot graph on losing focus
    $('#txt_func_f').on('focusout', () => {
        plotGraph({
            id_func: '#txt_func_f',
            id_graph: 'graph_f',
            title: 'f(x)',
            xMin: xMinF,
            xMax: xMaxF,
            xStep: plotStep,
            xShift: xShiftF
        });
    });

    // plot graph on equation change
    $('#txt_func_g').on('keypress', e => {
        if (e.keyCode == 13) { // enter key
            plotGraph({
                id_func: '#txt_func_g',
                id_graph: 'graph_g',
                title: 'g(x)',
                xMin: xMinG,
                xMax: xMaxG,
                xStep: plotStep,
                xShift: xShiftG
            });
        }
    });

    // plot graph on losing focus
    $('#txt_func_g').on('focusout', () => {
        plotGraph({
            id_func: '#txt_func_g',
            id_graph: 'graph_g',
            title: 'g(x)',
            xMin: xMinG,
            xMax: xMaxG,
            xStep: plotStep,
            xShift: xShiftG
        });
    });
    // convolution
    $('#btn_calc_conv').on('click', () => {
        $("#loading_icon").addClass('fa fa-spinner fa-spin');
        setTimeout(function () {
            plotConv({
                id_func_f: '#txt_func_f',
                id_func_g: '#txt_func_g',
                id_graph: 'graph_conv',
                title: 'Convolution: f(x) ** g(x)',
                xMinF: xMinF,
                xMaxF: xMaxF,
                xMinG: xMinG,
                xMaxG: xMaxG,
                xStep: convStep,
                xShiftF: xShiftF,
                xShiftG: xShiftG
            });
        }, 500);
        setTimeout(function () {
            $("#loading_icon").removeClass('fa fa-spinner fa-spin');
        }, 500);
    });

    // FFT: f(x)
    $('#btn_calc_fft_f').on('click', () => {
        plotFFT({
            id_func: '#txt_func_f',
            id_graph: 'graph_fft_f',
            title: 'FFT of f(x)',
            nfft: nfft,
            xMin: xMinF,
            xMax: xMaxF,
            xShift: xShiftF
        });
    });

    // FFT: g(x)
    $('#btn_calc_fft_g').on('click', () => {
        plotFFT({
            id_func: '#txt_func_g',
            id_graph: 'graph_fft_g',
            title: 'FFT of g(x)',
            nfft: nfft,
            xMin: xMinF,
            xMax: xMaxF,
            xShift: xShiftF
        });
    });
}