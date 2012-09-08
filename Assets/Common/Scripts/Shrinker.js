#pragma strict

function Update() {
	transform.localScale = Vector3.Lerp(Vector3.zero, transform.localScale, Mathf.Exp(-4.0 * Time.deltaTime));
	if (transform.localScale.magnitude < 0.01) Destroy(gameObject);
}
