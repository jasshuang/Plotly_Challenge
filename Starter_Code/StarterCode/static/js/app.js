
var data;
function init() {
    
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((incomingData) => {
    console.log(incomingData);

    // From samples.json
    data = incomingData;
    console.log(data);

    var names = data.names;

    names.forEach((name) => {
        d3.selectAll("#selDataset").append('option').text(name);
    })
   
    
// Display the default plot


    defaultTestId = data.samples.filter(sample => sample.id === "940")[0];
        console.log(defaultTestId);

    defaultSampleValues = defaultTestId.sample_values;

    defaultotuids = defaultTestId.otu_ids;

    defaultotulabels = defaultTestId.otu_labels;

// The top 10 OTUs
sampleValues = defaultSampleValues.slice(0, 10).reverse();
sampleotuids = defaultotuids.slice(0, 10).reverse();
sampleotulabels = defaultotulabels.slice(0, 10).reverse();

console.log(sampleValues);
console.log(sampleotuids);
console.log(sampleotulabels);

//===============//
// Bar Chart//
//==============//
//  Create the Traces
var trace1 = {
    x: sampleValues,
    y: sampleotuids.map(outId => `OTU ${outId}`),
    text: sampleotulabels,
    type: "bar",
    marker: {
        color: 'rgba(219, 64, 82, 0.7)'},
    orientation: "h",
};

// Create the data array for the plot
var databar = [trace1];

// Define the plot layout
var layoutbar = {
    title: "Top 10 UTOs",
    xaxis: { title: "Sample Values" },
    yaxis: { title: "OTU IDs" },
    autosize: false,
    width: 500,
    height: 600,
}

// Plot the "bar" chart 
Plotly.newPlot("bar", databar, layoutbar);

//===============//
// Bubble Plot//
//==============//
//  Create the Traces
var trace2 = {
    x: defaultotuids,
    y: defaultSampleValues ,
    text: defaultotulabels,
    mode: "markers",
    marker: {
        color: defaultotuids,
        colorscale: "blues",
        size: defaultSampleValues,
    },
};

// Create the data array for the plot
var databubble = [trace2];

// Define the plot layout
var layoutbubble = {
    title: "Top 10 UTOs",
    xaxis: { title: "OTU IDs" },
    yaxis: { title: "Sample Values " },
    sizemode: "area",
    showlegend: false,
    width: 1200,
    height: 600,
}

// Plot the "bar" chart 
Plotly.newPlot("bubble", databubble, layoutbubble);

//===============//
// Gauge Chart//
//==============//
//  Create the Traces
var trace3 = 
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 2,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        text: ['8-9', '7-8', '6-7', '5-6', '4-5', '3-4', '2-3', '1-2', '0-1'],
        textinfo: 'text',
        textposition: 'inside',
        axis: { range: [null, 9] },
        steps: [
          { range: [0, 1], color: "rgb(165,0,38)" },
          { range: [1, 2], color: "rgb(215,48,39)" },
          { range: [2, 3], color: "rgb(244,109,67)" },
          { range: [3, 4], color: "rgb(253,174,97)" },
          { range: [4, 5], color: "rgb(254,224,144)" },
          { range: [5, 6], color: "rgb(224,243,248)" },
          { range: [6, 7], color: "rgb(171,217,233)" },
          { range: [7, 8], color: "rgb(116,173,209)" },
          { range: [8, 9], color: "rgb(69,117,180)" }
        ],
      }
    };

    datagauge = [trace3]
  
  var layoutgauge = { width: 600, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', datagauge, layoutgauge);

})};

init()