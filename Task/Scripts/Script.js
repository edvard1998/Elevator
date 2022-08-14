//#region  Variables
const FLOORS = 20;
let elevators = document.querySelectorAll('section'),
    floors = document.querySelectorAll('.floors div'),
    containerSlot = document.querySelectorAll('.containerSlot'),
    floor,
    currentFloor,
    count = -1,
    suspended = [];
//#endregion Variables

//#region Set Data Values    
for (let i = 0; i < containerSlot.length; i++) {
    for (let k = 1; k <= FLOORS; k++) {
        containerSlot[i].appendChild(document.createElement('div'));
        containerSlot[i].children[k].dataset.floor = FLOORS - k + 1;
    }
} 

for (let i = 0; i < floors.length; i++) {
    floors[i].dataset.floor = FLOORS - i;
}
//#endregion Set Data Values

//#region Random Positions

/// Get the random values in the first time when the program is running
function getRandomValue(max) {
    return Math.random() * max;
}

elevators.forEach(el => {
    floor = parseInt(floors[parseInt(getRandomValue(FLOORS))].innerText);
    
    el.dataset.floor = floor;

    containerSlot[++count].children[containerSlot[count].children.length - el.dataset.floor].append(el);
});
//#endregion Random Positions

//#region Base Logics
for (let i = 0; i < floors.length; i++) {       
    floors[i].addEventListener('click', () => {
        let
            child1 = containerSlot[0].children[i],
            child2 = containerSlot[1].children[i],
            child3 = containerSlot[2].children[i],
            min1,
            min2,
            min3,
            minList = [];

        // Added equality case
        if (parseInt(floors[i].dataset.floor) === parseInt(elevators[0].dataset.floor) 
            || parseInt(floors[i].dataset.floor) === parseInt(elevators[1].dataset.floor)
            || parseInt(floors[i].dataset.floor) === parseInt(elevators[2].dataset.floor)
            ) 
        {
            return;
        }

        if (parseInt(child1.dataset.floor) > parseInt(elevators[0].dataset.floor)) {
            min1 = parseInt(child1.dataset.floor) - parseInt(elevators[0].dataset.floor);
        } else {
            min1 = parseInt(elevators[0].dataset.floor) - parseInt(child1.dataset.floor);
        }

        minList.push(min1);

        if (parseInt(child2.dataset.floor) > parseInt(elevators[1].dataset.floor)) {
            min2 = parseInt(child2.dataset.floor) - parseInt(elevators[1].dataset.floor);
        } else {
            min2 = parseInt(elevators[1].dataset.floor) - parseInt(child2.dataset.floor);
        }

        minList.push(min2);

        if (parseInt(child3.dataset.floor) > parseInt(elevators[2].dataset.floor)) {
            min3 = parseInt(child3.dataset.floor) - parseInt(elevators[2].dataset.floor);
        } else {
            min3 = parseInt(elevators[2].dataset.floor) - parseInt(child3.dataset.floor);
        }
        
        minList.push(min3);

        let result = Math.min(...minList);

        // Check in which minimum value is the result

        console.log('MINIMUM VALUES', minList);

        switch (result) {
            case min1:
                if (!suspended.includes('min1')) {
                    child1.append(elevators[0]);

                    elevators[0].dataset.floor = child1.dataset.floor;
                    suspended.push('min1');

                    console.log(suspended);
                } else {
                    result = Math.min(min2, min3);

                    appendEl(result, min2, min3, child2, child3, elevators[1], elevators[2]);

                }
                break;
            case min2:
                if (!suspended.includes('min2')) {                
                    child2.append(elevators[1]);
                
                    elevators[1].dataset.floor = child2.dataset.floor;
                    suspended.push('min2');

                    console.log(suspended);
                } 
                else {
                    result = Math.min(min1, min3);

                    appendEl(result, min1, min3, child1, child3, elevators[0], elevators[2]);
                }
                break;
            case min3:
                if (!suspended.includes('min3')) {                    
                    child3.append(elevators[2]);
                    
                    elevators[2].dataset.floor = child3.dataset.floor;
                    suspended.push('min3');

                    console.log(suspended);
                } 
                else {
                    result = Math.min(min1, min2);
                    
                    appendEl(result, min1, min2, child1, child2, elevators[0], elevators[1]);
                }
                break;
        }

        // Function which check minimum value of two numbers
        function appendEl(res, v1, v2, contr1, contr2, el1, el2) {
            suspended.length = 0;

            switch(res) {
                case v1:
                    contr1.append(el1);
                    el1.dataset.floor = contr1.dataset.floor;

                    appendMinValue(v1);

                    console.log(suspended);
                    
                    break;
                case v2:
                    contr2.append(el2);
                    el2.dataset.floor = contr2.dataset.floor;

                    appendMinValue(v2);

                    console.log(suspended);
                    
                    break;   
            }
        }

        function appendMinValue(val) {
            switch (val) {
                case min1:
                    suspended.push('min1');
                    break;
                case min2:
                    suspended.push('min2');
                    break;
                default:
                    suspended.push('min3');
                    break;
            }
        }
    });
}
//#endregion Base Logics