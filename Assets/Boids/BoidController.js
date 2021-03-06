#pragma strict

var prefab : GameObject;
var number = 40;

var boidSpeed = 0.1;
var boidYawing = 90.0;

function Awake() {
    BoidElement.globalTarget = gameObject;
    BoidElement.globalSpeed = boidSpeed;
    BoidElement.globalYawing = boidYawing;
}

function Start() {
    for (var i = 0; i < number; i++) {
        Instantiate(prefab);
        yield WaitForSeconds(0.05);
    }
}

function Update() {
    BoidElement.globalSpeed = boidSpeed;
    BoidElement.globalYawing = boidYawing;
}
