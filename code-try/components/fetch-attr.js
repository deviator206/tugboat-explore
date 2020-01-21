    const fs = require('fs');

    const outputJSON = {}

    const percentToRGBA = (v) => {
        const color = Math.round(v * 255);
        return color > 0 ? color : 0;

    }

    const parseColor = (color) => {
        return {
            red: percentToRGBA(color.red),
            green: percentToRGBA(color.green),
            blue: percentToRGBA(color.blue),
            alpha: color.alpha
        };
    }

    const  RGBAToHexA = (r,g,b,a) => {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        a = Math.round(a * 255).toString(16);
    
        if (r.length == 1)
        r = "0" + r;
        if (g.length == 1)
        g = "0" + g;
        if (b.length == 1)
        b = "0" + b;
        if (a.length == 1)
        a = "0" + a;
    
        return "#" + r + g + b + a;
    }
    const getBGColor = (styleOption) => {
        let bgColorFinal;
        if (styleOption.fills) {
            styleOption.fills.forEach(singleColor => {
                const bgColor = parseColor(singleColor.color);
                /**
                 * { red: 24, green: 95, blue: 86, alpha: 1 }

                    usage: 
                    {background-color:rgba(24,95,86,1);}

                */
                bgColorFinal = RGBAToHexA(bgColor.red, bgColor.green, bgColor.blue, bgColor.alpha);
            });
        }
        return bgColorFinal;
    }


    const updateLayeredItems = (layersArray, parentId) => {

        layersArray.forEach(element => {
            if (!outputJSON[parentId]) {
                outputJSON[parentId] = {};
            }
            if (!outputJSON[parentId][element._class]) {
                outputJSON[parentId][element._class] = []
            }
            const bgColor = getBGColor(element.style)
            outputJSON[parentId][element._class].push({
                name: element.name,
                style: (element.frame) ? { height: (element.frame.height), width: (element.frame.width), background_color: bgColor } : {},
                do_objectID: element.do_objectID
            });
        });
    }
    const iterateOverJSONFile = (jsonPath) => {
        const inputJSON = require(jsonPath);
        if ((inputJSON._class).toLowerCase() === 'page') {
            inputJSON.layers.forEach(element => {
                if (!outputJSON[element._class]) {
                    outputJSON[element._class] = [];
                }
                outputJSON[element._class].push({
                    name: element.name,
                    do_objectID: element.do_objectID
                });


                if (element.layers) {
                    // layers exist so proceed 
                    console.log("element = ", element.name, " layers ?" + element.layers.length)
                    updateLayeredItems(element.layers, element.do_objectID)
                }
                // outputJSON.style = element.style
            });
        }

        const fd = fs.openSync("./output.json", 'w+');
        fs.writeSync(fd, JSON.stringify(outputJSON, null, 4), 'utf8');

    }


    iterateOverJSONFile("../sketch_to_json/sample01/pages/21BCEBA6-5E2E-4057-B6B6-90CC0900E14F.json")
