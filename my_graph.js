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

const my_updatemenus = [{
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
const my_sliders = [{
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
        label: 'blue',
        method: 'restyle',
        args: ['line.color', 'blue']
    }, {
        label: 'red',
        method: 'restyle',
        args: ['line.color', 'red']
    }, {
        label: 'green',
        method: 'restyle',
        args: ['line.color', 'green']
    }]
}];

function restyle_graph(graph_id, frames, x_lowerbound, x_upperbound, y_lowerbound, y_upperbound, m_title) {
    Plotly.purge(graph_id);// TODO poor performance
    Plotly.plot(graph_id, [{
        x: frames[0].data[0].x,
        y: frames[0].data[0].y,
        line: {simplify: false},
    }], {
        xaxis: {range: [x_lowerbound, x_upperbound]},
        yaxis: {range: [y_lowerbound, y_upperbound]},
        title: m_title,
        updatemenus: my_updatemenus,
        sliders: my_sliders
    }).then(function () {
        Plotly.addFrames(graph_id, frames);
    });
}

function create_graph(graph_id, my_title) {
    let selected_frame = [
        {name: 'sine', data: [{x: [], y: []}]},
        {name: 'cosine', data: [{x: [], y: []}]},
        {name: 'exponent', data: [{x: [], y: []}]},
        {name: 'sine-exponent', data: [{x: [], y: []}]},
        {name: 'cosine-exponent', data: [{x: [], y: []}]},
        {name: 'exponent-step', data: [{x: [], y: []}]},
        {name: 'sine-step', data: [{x: [], y: []}]},
        {name: 'cosine-step', data: [{x: [], y: []}]},
    ];

    let n = 200; // (3 - (-3)) / 0.03
    let t = -3;
    for (let i = 0; i <= n; i++) {

        selected_frame[0].data[0].x[i] = parseFloat(t.toFixed(2));// TODO delete toFixed
        selected_frame[0].data[0].y[i] = parseFloat(Math.sin(t)).toFixed(2);

        selected_frame[1].data[0].x[i] = parseFloat(t.toFixed(2));
        selected_frame[1].data[0].y[i] = parseFloat((Math.cos(t)).toFixed(2));

        selected_frame[2].data[0].x[i] = parseFloat(t.toFixed(2));
        selected_frame[2].data[0].y[i] = parseFloat((Math.exp(t)).toFixed(2));

        selected_frame[3].data[0].x[i] = parseFloat(t.toFixed(2));
        selected_frame[3].data[0].y[i] = parseFloat((Math.sin(t) * Math.exp(t)).toFixed(2));

        selected_frame[4].data[0].x[i] = parseFloat(t.toFixed(2));
        selected_frame[4].data[0].y[i] = parseFloat((Math.cos(t) * Math.exp(t)).toFixed(2));

        selected_frame[5].data[0].x[i] = parseFloat(t.toFixed(2));
        selected_frame[5].data[0].y[i] = parseFloat((heaviside(t) * Math.exp(t)).toFixed(2));

        selected_frame[6].data[0].x[i] = parseFloat(t.toFixed(2));
        selected_frame[6].data[0].y[i] = parseFloat((heaviside(t) * Math.sin(t)).toFixed(2));

        selected_frame[7].data[0].x[i] = parseFloat(t.toFixed(2));
        selected_frame[7].data[0].y[i] = parseFloat((heaviside(t) * Math.cos(t)).toFixed(2));

        t = t + 0.03;
    }

    let f_initial_data = [{
        x: selected_frame[0].data[0].x,
        y: selected_frame[0].data[0].y,
        line: {simplify: false},
    }];


    Plotly.plot(graph_id, f_initial_data, {
        xaxis: {range: [-3, 3]},
        yaxis: {range: [-2, 2]},
        title: my_title,
        updatemenus: my_updatemenus,
        sliders: my_sliders
    }).then(function () {
        if (graph_id === "graph-1") {
            fx_frames = selected_frame;
            Plotly.addFrames(graph_id, fx_frames);
        }
        else if (graph_id === "graph-2") {
            gx_frames = selected_frame;
            Plotly.addFrames(graph_id, gx_frames);
        }
    });
}