var fx_frames = [
    {name: 'sine', data: [{x: [], y: []}]},
    {name: 'cosine', data: [{x: [], y: []}]},
    {name: 'exponent', data: [{x: [], y: []}]},
    {name: 'sine-exponent', data: [{x: [], y: []}]},
    {name: 'cosine-exponent', data: [{x: [], y: []}]},
    {name: 'exponent-step', data: [{x: [], y: []}]},
    {name: 'sine-step', data: [{x: [], y: []}]},
    {name: 'cosine-step', data: [{x: [], y: []}]},
];

var gx_frames = [
    {name: 'sine', data: [{x: [], y: []}]},
    {name: 'cosine', data: [{x: [], y: []}]},
    {name: 'exponent', data: [{x: [], y: []}]},
    {name: 'sine-exponent', data: [{x: [], y: []}]},
    {name: 'cosine-exponent', data: [{x: [], y: []}]},
    {name: 'exponent-step', data: [{x: [], y: []}]},
    {name: 'sine-step', data: [{x: [], y: []}]},
    {name: 'cosine-step', data: [{x: [], y: []}]},
];

my_updatemenus = [{
    buttons: [
        {method: 'animate', args: [['sine']], label: 'sin(x)'},
        {method: 'animate', args: [['cosine']], label: 'cos(x)'},
        {method: 'animate', args: [['exponent']], label: 'exp(x)'},
        {method: 'animate', args: [['sine-exponent'], ['exponent']], label: 'sin(x) * exp(x)'},
        {method: 'animate', args: [['cosine-exponent']], label: 'cos(x) * exp(x)'},
        {method: 'animate', args: [['exponent-step']], label: 'u(x) * exp(x)'},
        {method: 'animate', args: [['sine-step']], label: 'u(x) * sin(x)'},
        {method: 'animate', args: [['cosine-step']], label: 'u(x) * cos(x)'},
    ]
}];
my_sliders = [{
    pad: {t: 10},
    len: 0.4,
    x: 0,
    currentvalue: {
        xanchor: 'left',
        prefix: 'color: ',
        font: {
            color: '#49ff23',
            size: 20
        }
    },
    // If all of a component's commands affect a single attribute, the component
    // will be bound to the plot and will automatically update to reflect changes.
    steps: [{
        label: 'red',
        method: 'restyle',
        args: ['line.color', 'red']
    }, {
        label: 'green',
        method: 'restyle',
        args: ['line.color', 'green']
    }, {
        label: 'blue',
        method: 'restyle',
        args: ['line.color', 'blue']
    }]
}];

function restyle_graph(graph_id, frames, x_lowerbound, x_upperbound, y_lowerbound, y_upperbound) {
    Plotly.purge(graph_id);// TODO poor performance
    Plotly.plot(graph_id, [{
        x: frames[0].data[0].x,
        y: frames[0].data[0].y,
        line: {simplify: false},
    }], {
        xaxis: {range: [x_lowerbound, x_upperbound]},
        yaxis: {range: [y_lowerbound, y_upperbound]},
        // title: "f(x)", // TODO title
        updatemenus: my_updatemenus,
        sliders: my_sliders
    }).then(function () {
        Plotly.addFrames(graph_id, frames);
    });
}

function create_graph(graph_id, my_title) {
    let n = 1000;
    for (let i = 0; i <= n; i++) {
        let t = (2 * (i - n / 2) / n);

        fx_frames[0].data[0].x[i] = t * Math.PI;
        fx_frames[0].data[0].y[i] = Math.sin(t * Math.PI);

        fx_frames[1].data[0].x[i] = t * Math.PI;
        fx_frames[1].data[0].y[i] = Math.cos(t * Math.PI);

        fx_frames[2].data[0].x[i] = t * Math.PI;
        fx_frames[2].data[0].y[i] = Math.exp(t * Math.PI);

        fx_frames[3].data[0].x[i] = t * Math.PI;
        fx_frames[3].data[0].y[i] = Math.sin(t * Math.PI) * Math.exp(t * Math.PI);

        fx_frames[4].data[0].x[i] = t * Math.PI;
        fx_frames[4].data[0].y[i] = Math.cos(t * Math.PI) * Math.exp(t * Math.PI);

        fx_frames[5].data[0].x[i] = t * Math.PI;
        fx_frames[5].data[0].y[i] = heaviside(t * Math.PI) * Math.exp(t * Math.PI);

        fx_frames[6].data[0].x[i] = t * Math.PI;
        fx_frames[6].data[0].y[i] = heaviside(t * Math.PI) * Math.sin(t * Math.PI);

        fx_frames[7].data[0].x[i] = t * Math.PI;
        fx_frames[7].data[0].y[i] = heaviside(t * Math.PI) * Math.cos(t * Math.PI);
    }

    let f_initial_data = [{
        x: fx_frames[0].data[0].x,
        y: fx_frames[0].data[0].y,
        line: {simplify: false},
    }];

    Plotly.plot(graph_id, f_initial_data, {
        xaxis: {range: [-Math.PI, Math.PI]},
        yaxis: {range: [-2, 2]},
        title: my_title,
        updatemenus: my_updatemenus,
        sliders: my_sliders
    }).then(function () {
        Plotly.addFrames(graph_id, fx_frames);
    });
}