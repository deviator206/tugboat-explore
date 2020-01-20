//style encoder
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


/*

input
{
       "_class": "color",
       "alpha": 1,
       "blue": 0.3372549019607843,
       "green": 0.3725490196078431,
      "red": 0.09411764705882353
}

output
{ red: 24, green: 95, blue: 86, alpha: 1 }

usage: 
 {background-color:rgba(24,95,86,1);}
*/

const sketchColor = {
    "_class": "color",
    "alpha": 1,
    "blue": 0.3372549019607843,
    "green": 0.3725490196078431,
   "red": 0.09411764705882353
}
const fillColor = parseColor(sketchColor);
console.log(fillColor);


