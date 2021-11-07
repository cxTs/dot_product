/**
* @description : Using mathematical principle of the dot product to create animation
*
* @author cxts  <couchaux.thomas@gmail.com>
* @github https://github.com/cxTs
* @date 12/06/2020
* @required Vehicle.js, Vector.js, Draw.js, misc.js
* @param {VOID} none
* @return {VOID}
*
**/

// mouse interactions
let clicked = false;

let vehicles = [];
let speed = 1;

// populating of vehicles with Vehicle object
for(let i = 0; i < 15; i++) {
    vehicles.push(new Vehicle(getRandom(width), getRandom(height), 20));
    vehicles[i].velocity = new Vector(getRandom(-speed, speed), getRandom(-speed, speed));
    vehicles[i].maxSpeed = speed;

}

// the start & the end of the line on which each vehicle in movement will project it's dot product
// this line is not configured to drawn on the canvas
let a = new Vector(0, height / 2);
let b = new Vector(width, height / 2);



let colors = ["#003b0010", "#008f1110", "#00ff4110"];

function draw() {
    if(!clicked) clear(null, null, .3);
    // uncomment to draw the line from a to b
    // a.display(ctx, 3, true, false, "#0F0");
    // b.display(ctx, 3, true, false, "#0F0");
    // a.arrowFrom(ctx, b, "#FFF");
    for(let v of vehicles) {
        v.update();

        // uncomment the 3 following to see each vehicle and its velocity as a red line drawn on it
        // & the scalar projection of it on the a to b line
        //v.display(ctx, v.size);
        //v.showVelocity(ctx);
        //point.display(ctx, 5, true, false, "#00F");

        v.edge(width, height);
        let point = v.location.getScalarProjection(a, b);

        ctx.strokeStyle = colors[getRandom(2)];
        for(let vv of vehicles) {
            point.arrowFrom(ctx, vv.location);
        }
    }

    window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);







/*
function scalarProjection(v, a, b) {
    let ab = Vector.sub(b, a);
    let av = Vector.sub(v, a);
    a.arrowFrom(ctx, v);
    ab.norm();
    ab.mult(av.dot(ab));
    let point = Vector.add(a, ab);
    return point;
}*/



document.onclick = function(e) {
    clicked = !clicked;
}
