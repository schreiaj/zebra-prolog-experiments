This was an attempt to use tau-log to let people, in browser, generate annotations for the zebra data logging from IRI 2019. 

The in browser stuff did not work, the data for IRI was too much, splitting into match specific databases may work better. SWI-Prolog, however, can handle the entire data set at once so experimentation continued with that. The upside, all queries created in prolog should be usable in the tau-log stuff down the road should that experiment resume. 

To generate the data you need `convertData` script which takes a csv file that the Zebra folks have provided and converts it into JSON because it's a hair easier to interact with. 

You can convert all of the csv files at once with 
`find [root folder with team data] -name "*.csv" | xargs -L 1 -P 4 node convertData.js`

To create the prolog files you can use the `generateLocationFacts` script which takes a JSON file and outputs the prolog to stdout. 

`node generateLocationFacts.js [root folder with team data]/Team*/Match*.json > data.pl`

You can load this directly into `swipl` like you would any other prolog file but I don't suggest it, it's slow. Instead you want to open `swipl` normally and run:

`qcompile('[path to data.pl]').`

This will take a little while and will create a `.qlf` file. You can then load that file in with `consult('path to data.qlf').` and it will load substantially faster. 

There's a `misc.pl` file with some sample queries I've been playing with. 
