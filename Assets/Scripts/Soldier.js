#pragma strict

var explosionPrefab : GameObject;

function Start() {
	while (!Input.GetKeyDown(KeyCode.D)) yield;

	var fv = Random.onUnitSphere * Random.Range(3.0, 10.0);
	var fp = rigidbody.worldCenterOfMass + Random.insideUnitSphere;
	rigidbody.AddForceAtPosition(fv, fp, ForceMode.Impulse);

	yield WaitForSeconds(Random.value);

	Instantiate(explosionPrefab, transform.position, Quaternion.identity);
	Destroy(gameObject);
}