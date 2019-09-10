function initSlider() {
    // range slider f(x)
    $("#slider_range_f").ionRangeSlider({
        onFinish: data => {
            xMinF = data.from;
            xMaxF = data.to;

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

    // range slider g(x)
    $("#slider_range_g").ionRangeSlider({
        onFinish: data => {
            xMinG = data.from;
            xMaxG = data.to;

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

    // shift slider f(x)
    $("#slider_shift_f").ionRangeSlider({
        onFinish: data => {
            xShiftF = data.from;

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

    // shift slider g(x)
    $("#slider_shift_g").ionRangeSlider({
        onFinish: data => {
            xShiftG = data.from;

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
}
