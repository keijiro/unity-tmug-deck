#pragma strict

var soldierPrefab : GameObject;

function Update() {
	if (Input.GetKeyDown(KeyCode.S)) {
		Instantiate(soldierPrefab, GetCursorPosition(), soldierPrefab.transform.rotation);
	}
}

private function GetCursorPosition() {
	var distance = camera.main.transform.position.magnitude;
	var position = Input.mousePosition + Vector3.forward * distance;
	return Camera.main.ScreenToWorldPoint(position);
}
