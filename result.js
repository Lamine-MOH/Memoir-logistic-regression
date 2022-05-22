function getUrlParameters() {
    let urlStr = window.location.search;

    if (urlStr == "") {
        urlStr += "?";
    }

    urlStr = urlStr.split("?")[1].split("&");

    let urlPar = {};
    urlStr.forEach((obj) => {
        if (obj == "") return;

        let name = obj.split("=")[0];
        let value = obj.split("=")[1];
        value = value.replaceAll("%22", "");
        value = value.replaceAll("%27", "");
        value = value.replaceAll("%20", " ");

        urlPar[name] = value;
    });

    return urlPar;
}
//  //

let urlPar = getUrlParameters();

// ---------------------------------------------------------------- //

function predict(features) {
    let sum = 0;

    for (let i = 0; i < module.mixing_formats.length; i++) {
        const format_str = module.mixing_formats[i];
        const theta = module.thetas[i + 1];

        let value = 1;
        for (let j = 0; j < format_str.length; j++)
            value *= features[format_str[j]];

        sum += value * theta;
    }
    sum += module.thetas[0];
    sum = sum > 700 ? 700 : sum < -700 ? -700 : sum;

    let result = 1 / (1 + Math.pow(Math.E, -sum));

    // return sum;
    return result * 100 >= 0.5;
}

const features = [];
features.push(urlPar["bmi"]);
features.push(urlPar["smoking"]);
features.push(urlPar["alcohol"]);
features.push(urlPar["stroke"]);
features.push(urlPar["physicalHealth"]);
features.push(urlPar["mentalHealth"]);
features.push(urlPar["diffWalking"]);
features.push(urlPar["sex"]);
features.push(urlPar["age"]);
features.push(urlPar["race"]);
features.push(urlPar["diabetic"]);
features.push(urlPar["physicalActivity"]);
features.push(urlPar["genHealth"]);
features.push(urlPar["sleepTime"]);
features.push(urlPar["asthma"]);
features.push(urlPar["kidneyDisease"]);
features.push(urlPar["skinCancer"]);

const resultValue = document.querySelector(
    "section.result .result-value .value"
);
const result = predict(features);
resultValue.innerHTML = result == true ? "Positive" : "Negative";
resultValue.classList.add(result);

// ---------------------------------------------------------------- //

function belong(list, value) {
    for (let i = 0; i < list.length; i++) if (list[i] == value) return i;

    return -1;
}

const booleanKeys = [
    "smoking",
    "alcohol",
    "stroke",
    "diffWalking",
    "diabetic",
    "physicalActivity",
    "asthma",
    "kidneyDisease",
    "skinCancer",
];
const enumerateKeys = ["race", "genHealth", "sex"];

const enumerateKeysDescription = {
    race: {
        1: "White",
        2: "Black",
        3: "American Indian/Alaskan Native",
        4: "Asian",
        5: "Hispanic",
        6: "Other",
    },
    genHealth: {
        1: "Poor",
        2: "Fair",
        3: "Good",
        4: "Very",
        5: "Excellent",
    },
    sex: {
        1: "Male",
        2: "Female",
    },
};

const featuresNames = document.querySelectorAll(
    "section.result .features ul li span"
);
const featuresValues = document.querySelectorAll(
    "section.result .features ul li p"
);

const keys = Object.keys(urlPar);
for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = urlPar[key];

    featuresNames[i].innerHTML = key;
    if (belong(booleanKeys, key) >= 0)
        featuresValues[i].innerHTML = value == 1 ? "Yes" : "NO";
    else if (belong(enumerateKeys, key) >= 0)
        featuresValues[i].innerHTML = enumerateKeysDescription[key][value];
    else featuresValues[i].innerHTML = value;
}
