can = background.getContext('2d');
MAX = 99;

onload = function update() {
    requestAnimationFrame(update);

    //init. This is very bad if running for a long time.
    if (!window.time) {
        time = 0;
        frame = 0;
        timeNextFrame = 0;
        branches = [{x:0, y:0, a:0, ai:0, width:8, pos:[], len:MAX}];
    }

    currentTime = performance.now() / 1000;
    while(time < currentTime) {
        while(time < timeNextFrame) {
            time += 1 / 16384;
        }
        frame++;
        timeNextFrame += 1/60;

        branches.forEach(branch => {
            dx = Math.cos(branch.a) * branch.width / 2;
            dy = Math.sin(branch.a) * branch.width / 2;
            branch.x += dx;
            branch.y += dy;
            branch.a += branch.ai;
            branch.pos.push({x:branch.x, y:branch.y, dx:dx, dy:dy});

            console.log(branch.y);
        })


    }

    //render gfx
    height = background.height = 512;
    width = background.width = 0 | height * innerWidth / innerHeight;
    can.translate(width/2, height/2);
    branches.forEach(branch => {
        if (branch.width == 8){
            can.translate(-branch.x, -branch.y);
        }
        can.strokeStyle = '#fff';

        can.beginPath();
        len = branch.pos.length-1;

        //wat is this loop
        for(i = len; pos = branch.pos[i]; i--) {
            can.lineTo(pos.x, pos.y);
        }
        can.stroke();
    })


}