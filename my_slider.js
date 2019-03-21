var f_previous_shift = 0;
var g_previous_shift = 0;
$(document).ready(function () {
    // slider for selecting shift on f(x)
    $("#1").ionRangeSlider({
        type: "double",
        min: -50,
        max: 50,
        from: -50,
        to: 0,
        grid: true,
        // onStart: function (data) {
        // },
        onChange: function (data) {
            // Called every time handle position is changed
            // console.log(data.to);

            // let m_shift = -(f_previous_shift + data.to);
            // f_previous_shift = -data.to;
            //
            // function shifter(m_value, m_index, m_array) {
            //     m_array[m_index] = m_value + m_shift;
            // }
            //
            // for (let u = 0; u <= 7; u++) {
            //     fx_frames[u].data[0].x.forEach(shifter);
            // }
            //
            let domain = $('#3').val().split(";");
            let x_lowerbound = parseInt(domain[0]);
            let x_upperbound = parseInt(domain[1]);
            //
            // if (m_shift > 0) {
            //
            // } else if (m_shift < 0) {
            //
            // }
            //
            // restyle_graph('graph-1', fx_frames, x_lowerbound, x_upperbound, -2, 2);// TODO compute y lower and upper
            let start = x_lowerbound;
            for (let u = 0; u <= 7; u++) {
                fx_frames[u].data[0].x = [];
                fx_frames[u].data[0].y = [];
            }
            //TODO poor performance , perform efficient computation with considering computed part
            for (let t = 0; t <= (x_upperbound - x_lowerbound + 0.03) / 0.03; t++) { // TODO fix precision 99.0000000000000001
                for (let u = 0; u <= 7; u++)
                    fx_frames[u].data[0].x[t] = parseFloat(start.toFixed(2));
                fx_frames[0].data[0].y[t] = Math.sin(start + data.to);
                fx_frames[1].data[0].y[t] = Math.cos(start + data.to);
                fx_frames[2].data[0].y[t] = Math.exp(start + data.to);// TODO consider max int
                fx_frames[3].data[0].y[t] = Math.sin(start + data.to) * Math.exp(start + data.to);// TODO consider max int
                fx_frames[4].data[0].y[t] = Math.cos(start + data.to) * Math.exp(start + data.to);// TODO consider max int
                fx_frames[5].data[0].y[t] = heaviside(start + data.to) * Math.exp(start + data.to);// TODO consider zero part
                fx_frames[6].data[0].y[t] = heaviside(start + data.to) * Math.sin(start + data.to);// TODO consider zero part
                fx_frames[7].data[0].y[t] = heaviside(start + data.to) * Math.cos(start + data.to);// TODO consider zero part
                start += 0.03;
            }
            restyle_graph('graph-1', fx_frames, x_lowerbound, x_upperbound, -2, 2, "f(x)");// TODO compute y lower and upper
        },
        // onFinish: function (data) {
        //     // Called then action is done and mouse is released
        // },
        // onUpdate: function (data) {
        //     // Called then slider is changed using Update public method
        // }
    });

// slider for selecting shift on g(x)
    $("#2").ionRangeSlider({
        type: "double",
        min: -50,
        max: 50,
        from: -50,
        to: 0,
        grid: true,
        onChange: function (data) {
            // Called every time handle  position is changed
            let domain = $('#4').val().split(";");
            let x_lowerbound = parseInt(domain[0]);
            let x_upperbound = parseInt(domain[1]);
            let start = x_lowerbound;
            for (let u = 0; u <= 7; u++) {
                gx_frames[u].data[0].x = [];
                gx_frames[u].data[0].y = [];
            }
            //TODO poor performance , perform efficient computation with considering computed part
            for (let t = 0; t <= (x_upperbound - x_lowerbound + 0.03) / 0.03; t++) { // TODO fix precision 99.0000000000000001
                for (let u = 0; u <= 7; u++)
                    gx_frames[u].data[0].x[t] = parseFloat(start.toFixed(2));
                gx_frames[0].data[0].y[t] = Math.sin(start + data.to);
                gx_frames[1].data[0].y[t] = Math.cos(start + data.to);
                gx_frames[2].data[0].y[t] = Math.exp(start + data.to);// TODO consider max int
                gx_frames[3].data[0].y[t] = Math.sin(start + data.to) * Math.exp(start + data.to);// TODO consider max int
                gx_frames[4].data[0].y[t] = Math.cos(start + data.to) * Math.exp(start + data.to);// TODO consider max int
                gx_frames[5].data[0].y[t] = heaviside(start + data.to) * Math.exp(start + data.to);// TODO consider zero part
                gx_frames[6].data[0].y[t] = heaviside(start + data.to) * Math.sin(start + data.to);// TODO consider zero part
                gx_frames[7].data[0].y[t] = heaviside(start + data.to) * Math.cos(start + data.to);// TODO consider zero part
                start += 0.03;
            }
            restyle_graph('graph-2', gx_frames, x_lowerbound, x_upperbound, -2, 2, "g(x)");// TODO compute y lower and upper
        },
    });

// slider for selecting domain of f(x)
    $("#3").ionRangeSlider({
        type: "double",
        min: -50,
        max: 50,
        from: -3,
        to: 3,
        grid: true,
        onChange: function (data) {
            let start = data.from;
            for (let u = 0; u <= 7; u++) {
                fx_frames[u].data[0].x = [];
                fx_frames[u].data[0].y = [];
            }
            for (let t = 0; t <= (data.to - data.from + 0.03) / 0.03; t++) { // TODO precision 99.0000000000000001
                for (let u = 0; u <= 7; u++)
                    fx_frames[u].data[0].x[t] = parseFloat(start.toFixed(2));
                fx_frames[0].data[0].y[t] = Math.sin(start);
                fx_frames[1].data[0].y[t] = Math.cos(start);
                fx_frames[2].data[0].y[t] = Math.exp(start);// TODO max int
                fx_frames[3].data[0].y[t] = Math.sin(start) * Math.exp(start);
                fx_frames[4].data[0].y[t] = Math.cos(start) * Math.exp(start);
                fx_frames[5].data[0].y[t] = heaviside(start) * Math.exp(start);
                fx_frames[6].data[0].y[t] = heaviside(start) * Math.sin(start);
                fx_frames[7].data[0].y[t] = heaviside(start) * Math.cos(start);
                start += 0.03;
            }
            restyle_graph('graph-1', fx_frames, data.from, data.to, -2, 2, "f(x)");// TODO y low and up
        },
    });

// slider for selecting domain of g(x)
    $("#4").ionRangeSlider({
        type: "double",
        min: -50,
        max: 50,
        from: -3,
        to: 3,
        grid: true,
        onChange: function (data) {
            let start = data.from;
            for (let u = 0; u <= 7; u++) {
                gx_frames[u].data[0].x = [];
                gx_frames[u].data[0].y = [];
            }
            for (let t = 0; t <= (data.to - data.from + 0.03) / 0.03; t++) { // TODO precision 99.0000000000000001
                for (let u = 0; u <= 7; u++)
                    gx_frames[u].data[0].x[t] = parseFloat(start.toFixed(2));
                gx_frames[0].data[0].y[t] = Math.sin(start);
                gx_frames[1].data[0].y[t] = Math.cos(start);
                gx_frames[2].data[0].y[t] = Math.exp(start);
                gx_frames[3].data[0].y[t] = Math.sin(start) * Math.exp(start);
                gx_frames[4].data[0].y[t] = Math.cos(start) * Math.exp(start);
                gx_frames[5].data[0].y[t] = heaviside(start) * Math.exp(start);
                gx_frames[6].data[0].y[t] = heaviside(start) * Math.sin(start);
                gx_frames[7].data[0].y[t] = heaviside(start) * Math.cos(start);
                start += 0.03;
            }
            restyle_graph('graph-2', gx_frames, data.from, data.to, -2, 2, "g(x)");// TODO y low and up
        },
    });
});