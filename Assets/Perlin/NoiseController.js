#pragma strict

@Range(0.0, 1.0)	var speed = 0.1;
@Range(0.0, 2.0)	var audioToSpeed = 0.0;
@Range(0.0, 1.5)	var pitch = 0.0;
@Range(0.0, 5.0)	var amplifier = 1.0;
@Range(0.0, 1.0)	var vertical = 0.0;
@Range(0.1, 5.0)	var frequency = 1.0;

private var baseOffset = Vector3(0, 10, 20);
private var coordinate = Vector3.zero;
private var audioLevel = 0.0;

function Start() {
	var kInterval = 0.02;
	var kSampleSize = 1024;

	var listener = FindObjectOfType(AudioListener);
	var sampleBuffer = new float[kSampleSize];

	while (true) {
		yield WaitForSeconds(kInterval);

		if (audioToSpeed <= 0.0) {
			audioLevel = 0.0;
			continue;
		}

		listener.GetOutputData(sampleBuffer, 0);

		var rms = 0.0;
		for (var sample in sampleBuffer) rms += sample * sample;
		rms = Mathf.Sqrt(rms / kSampleSize);

		audioLevel = Mathf.Max(audioLevel, Mathf.Clamp01(0.5 * (2.0 + Mathf.Log10(rms))));
	}
}

function Update() {
	audioLevel *= Mathf.Exp(-8.0 * Time.deltaTime);

	var direction = Vector3(Mathf.Cos(pitch), Mathf.Sin(pitch), 0.0);
	coordinate += direction * ((speed + audioLevel * audioToSpeed)* Time.deltaTime);

	renderer.material.SetVector("offs_u", coordinate + Vector3.forward * baseOffset[0]);
	renderer.material.SetVector("offs_v", coordinate + Vector3.forward * baseOffset[1]);
	renderer.material.SetVector("offs_w", coordinate + Vector3.forward * baseOffset[2]);
	renderer.material.SetVector("amp", Vector3(1.0 - vertical, 1.0 - vertical, 1.0) * amplifier);
	renderer.material.SetVector("freq", Vector3.one * frequency);
}
