# Charts supported

Vislib supports the gauge/goal charts from the aggregation-based visualizations. It also contains the legacy implemementation of the heatmap chart (enabled by the visualization:visualize:legacyHeatmapChartsLibrary advanced setting).

# General overview

`vis.js` constructor accepts vis parameters and render method accepts data. it exposes event emitter interface so we can listen to certain events like 'renderComplete'.

`vis.render` will create 'lib/vis_config' to handle configuration (applying defaults etc) and then create 'lib/handler' which will take the work over.

`vis/handler` will init all parts of the chart (based on visualization type) and call render method on each of the building blocks.

## Visualizations

Each base vis type (`lib/types`) can have a different layout defined (`lib/layout`) and different building blocks

All base visualizations extend from `visualizations/_chart`


### Map

### Point series chart

`visualizations/point_series` takes care of drawing the point series chart (no axes or titles, just the chart itself). It creates all the series defined and calls render method on them.