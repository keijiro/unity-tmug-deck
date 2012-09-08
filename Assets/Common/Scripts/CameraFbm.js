#pragma strict

@Range(1, 4)		var octave = 2;
@Range(0.0, 4.0)	var frequency = 0.5;
@Range(0.0, 0.5)	var positionAmount = 0.15;
@Range(0.0, 5.0)	var rotationAmount = 1.5;

function Update() {
	var time = Time.time * frequency;
	var dx = Perlin.Fbm(time, octave);
	var dy = Perlin.Fbm(time + 10, octave);
	var dz = Perlin.Fbm(time + 20, octave);
	var rx = Perlin.Fbm(time + 30, octave);
	var ry = Perlin.Fbm(time + 40, octave);
	transform.localPosition = Vector3(dx, dy, dz) * positionAmount;
	transform.localRotation =
		Quaternion.AngleAxis(rx * rotationAmount, Vector3.right) *
		Quaternion.AngleAxis(ry * rotationAmount, Vector3.up);
}
