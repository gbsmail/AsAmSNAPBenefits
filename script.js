// SVG+D3 margin convention
const margin = {top: 20, right: 30, bottom: 40, left: 100},
    width = 900 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

// boilerplate for setting up the SVG
let svg = d3.select("#dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

const snapData = [
    {borough: "Bronx", households: 3957 },
    {borough: "Brooklyn", households: 22393 },
    {borough: "Manhattan", households: 12402 },
    {borough: "Queens", households: 29197 },
    {borough: "Staten Island", households: 2904 },
    {borough: "New York City", households: 70853 }
];

// to make a scaleLinear bar chart
const xScale = d3.scaleLinear()
.domain([0, 80000]) // input data, aka the values above
.range([0, width])

// scaleBand
const yScale = d3.scaleBand()
.domain(snapData.map(d => d.borough))
.range([height, 0])

//you can color it
const colorScale = d3.scaleLinear()
.domain([0, 100000])
.range(["pink", "darkred"])

svg.selectAll("rect")
.data(snapData)
.join("rect") 
.transition()
.duration(400)
.attr("x", xScale(0)) // start at zero for a bar chart
.attr("y", (d) => { return yScale(d.borough)}) 
.attr("width", (d) => {return xScale(d.households)} )
.attr("height", yScale.bandwidth() - 2) // how big each individual space is
.attr("fill", "green")
.delay(function(d,i){console.log(i) ; return(i*150)});

// make an axis and labeling now 
svg.append("g").call(d3.axisLeft(yScale)) // "g" lets you append a whole group
svg.append("g").call(d3.axisBottom(xScale))
.attr("transform", `translate(0,${height})`) // this puts the axis on the bottom


