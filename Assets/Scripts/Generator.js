#pragma strict

var soldierPrefab : GameObject;

var distance = 8.0;

function Update() {
	if (Input.GetKeyDown(KeyCode.S)) {
		Instantiate(soldierPrefab, GetCursorPosition(), soldierPrefab.transform.rotation);
	}
}

private function GetCursorPosition() {
	var position = Input.mousePosition + Vector3.forward * distance;
	return Camera.main.ScreenToWorldPoint(position);
}
