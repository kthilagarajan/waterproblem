var TABLE_HEIGHT = 0
var BOX_HEIGHT = 30
var BOX_WIDTH = 50

buildTable()

function buildTable() {
    TABLE_HEIGHT = document.getElementById("input_height").value
    var RESULT_DIV = document.getElementById("inputTable")
    RESULT_DIV.innerHTML = ""
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    var xValue = -40
    var yValue = -20
    for (var i = 0; i < TABLE_HEIGHT; i++) {
        yValue = yValue + BOX_HEIGHT;
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute("x", 10)
        rect.setAttribute("y", yValue)
        rect.setAttribute("width", 50)
        rect.setAttribute("height", 30)
        rect.setAttribute("class", "empty")
        svg.appendChild(rect)
    }
    RESULT_DIV.appendChild(svg)
}

function generateOutput() {
    var USER_INPUT = document.getElementById("input_arr").value.split(",").map(Number)
    buildSVG(USER_INPUT)
}

function buildSVG(input_arr) {
    var RESULT_DIV = document.getElementById("inputTable")
    RESULT_DIV.innerHTML = ""
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    var xValue = -40
    var total_units = 0
    var left = []
    var right = [];

    //left to right
    var max = input_arr[0];
    left[0] = input_arr[0];
    for (var i = 1; i < input_arr.length; i++) {
        if (input_arr[i] < max) {
            left[i] = max;
        } else {
            left[i] = input_arr[i];
            max = input_arr[i];
        }
    }

    //right to left
    max = input_arr[input_arr.length - 1];
    right[input_arr.length - 1] = input_arr[input_arr.length - 1];
    for (var i = input_arr.length - 2; i >= 0; i--) {
        if (input_arr[i] < max) {
            right[i] = max;
        } else {
            right[i] = input_arr[i];
            max = input_arr[i];
        }
    }

    for (var i = 0; i < input_arr.length; i++) {
        total_units += Math.min(left[i], right[i]) - input_arr[i];
        xValue = xValue + BOX_WIDTH
        var yValue = -20
        for (var x = 0; x < TABLE_HEIGHT; x++) {
            // x - table index
            // i - value index
            yValue = yValue + BOX_HEIGHT;
            var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
            rect.setAttribute("x", xValue)
            rect.setAttribute("y", yValue)
            rect.setAttribute("width", 50)
            rect.setAttribute("height", 30)
            if (Math.min(left[i], right[i]) == 0 && input_arr[i] == 0) {
                rect.setAttribute("class", "empty")
            } else {
                var water_level_exists_above_block = Math.min(left[i], right[i]) - input_arr[i]
                if ((input_arr[i] == 0 && TABLE_HEIGHT - x <= Math.min(left[i], right[i]))) {
                    rect.setAttribute("class", "water")
                } else {
                    if (TABLE_HEIGHT - x <= Math.min(left[i], right[i]) && !(TABLE_HEIGHT - x <= input_arr[i])) {
                        rect.setAttribute("class", "water")
                    } else {
                        if (TABLE_HEIGHT - x <= input_arr[i]) {
                            rect.setAttribute("class", "block")
                        } else {
                            rect.setAttribute("class", "empty")
                        }
                    }
                }
            }
            svg.appendChild(rect)
        }
    }
    RESULT_DIV.appendChild(svg)
    document.getElementById("outputTable").innerHTML = document.getElementById("inputTable").innerHTML
    document.getElementById("totalUnits").innerHTML = total_units + " Units"
}