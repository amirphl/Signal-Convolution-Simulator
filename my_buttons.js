$(document).ready(function () {
    {
        $(document).on('click', '.btn', function (event) {
            let fx_id = this.id[1];
            let gx_id = this.id[2];
            let output_domain = [];
            let output_range = [];
            let gx_domain_lowerbound = parseFloat(gx_frames[gx_id].data[0].x[0].toFixed(2)); // TODO check overlap
            let gx_domain_upperbound = parseFloat(gx_frames[gx_id].data[0].x[gx_frames[gx_id].data[0].x.length - 1].toFixed(2));
            let fx_domain_lowerbound = parseFloat(fx_frames[fx_id].data[0].x[0].toFixed(2)); // TODO check overlap
            let fx_domain_upperbound = parseFloat(fx_frames[fx_id].data[0].x[fx_frames[fx_id].data[0].x.length - 1].toFixed(2));
            let index = 0;

            for (let i = gx_domain_lowerbound + fx_domain_lowerbound; i <= gx_domain_upperbound + fx_domain_upperbound; i += 0.03) {
                output_domain[index] = parseFloat(i.toFixed(2));
                output_range[index] = 0;
                index++;
            }
            for (let i = 0; i < fx_frames[fx_id].data[0].x.length; i++) {
                let m_shift = fx_frames[fx_id].data[0].x[i];
                for (let j = 0; j < gx_frames[gx_id].data[0].x.length; j++) {
                    let temp = fx_frames[fx_id].data[0].y[i] * gx_frames[gx_id].data[0].y[j];
                    let m_index = gx_frames[gx_id].data[0].x[j] + m_shift;
                    let m_diff = m_index - (gx_domain_lowerbound + fx_domain_lowerbound);
                    let real_index = Math.ceil(m_diff / 0.03);
                    output_range[real_index] += temp;
                }
            }

            let result_frame = [
                {name: 'convolution result', data: [{x: output_domain, y: output_range}]},
            ];

            Plotly.purge('convolution_graph');// TODO fix poor performance
            Plotly.plot('convolution_graph', [{
                x: result_frame[0].data[0].x,
                y: result_frame[0].data[0].y,
                line: {simplify: false},
            }], {
                xaxis: {range: [output_domain[0], output_domain[output_domain.length - 1]]},
                yaxis: {range: [-4, 4]}, // TODO assign good bound
                title: "f(x)**g(x)",
            }).then(function () {
                Plotly.addFrames('convolution_graph', result_frame);
            });
        });
    }
});
