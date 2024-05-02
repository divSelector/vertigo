class Audio {
    static instance;

    constructor() {
        if (Audio.instance) {
            return Audio.instance;
        }

        this.FADETIME = 1;
        this.AUDIOBUFFERCACHE = {};
        this.audioContext = null;
        this.master = null;
        this.currentBackgroundMusic = null;
        this.currentEventAudio = null;
        this.initialized = false;

        Audio.instance = this;
    }

    static init() {
        if (!Audio.instance) {
            Audio.instance = new Audio();
            Audio.instance._init();
        }
        return Audio.instance;
    }

    _init() {
        this.initAudioContext();
        this.initialized = true;
    }

    initAudioContext() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext);
        this.createMasterChannel();
    }

    createMasterChannel() {
        this.master = this.audioContext.createGain();
        this.master.gain.setValueAtTime(1.0, this.audioContext.currentTime);
        this.master.connect(this.audioContext.destination);
    }

    playBackgroundMusic(src, volume = 1.0) {
        if (!this.initialized) {
            return;
        }
        this.loadAudioFile(src)
            .then((buffer) => {
                var source = this.audioContext.createBufferSource();
                source.buffer = buffer;
                source.loop = true;

                var envelope = this.audioContext.createGain();
                envelope.gain.setValueAtTime(0.0, this.audioContext.currentTime);

                var fadeTime = this.audioContext.currentTime + this.FADETIME;

                // fade out current background music
                if (this.currentBackgroundMusic &&
                    this.currentBackgroundMusic.source &&
                    this.currentBackgroundMusic.source.playbackState !== 0) {
                    var currentBackgroundGainValue = this.currentBackgroundMusic.envelope.gain.value;
                    this.currentBackgroundMusic.envelope.gain.cancelScheduledValues(this.audioContext.currentTime);
                    this.currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, this.audioContext.currentTime);
                    this.currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(0.0, fadeTime);
                    this.currentBackgroundMusic.source.stop(fadeTime + 0.3); // make sure fade has completed
                }

                // fade in new background music
                source.connect(envelope);
                envelope.connect(this.master);
                source.start();
                envelope.gain.linearRampToValueAtTime(volume, fadeTime);

                this.currentBackgroundMusic = {
                    source: source,
                    envelope: envelope
                };
                this.currentBackgroundVolume = volume;
                console.log("Background Music Volume:", volume);
            });
    }

    playEventMusic(src, volume = 1.0) {
        if (!this.initialized) {
            return;
        }
        this.loadAudioFile(src)
            .then((buffer) => {
                var source = this.audioContext.createBufferSource();
                source.buffer = buffer;
                source.loop = true;

                var envelope = this.audioContext.createGain();
                envelope.gain.setValueAtTime(0.0, this.audioContext.currentTime);

                var fadeTime = this.audioContext.currentTime + this.FADETIME * 2;

                // turn down current background music
                if (this.currentBackgroundMusic != null) {
                    var currentBackgroundGainValue = this.currentBackgroundMusic.envelope.gain.value;
                    this.currentBackgroundMusic.envelope.gain.cancelScheduledValues(this.audioContext.currentTime);
                    this.currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, this.audioContext.currentTime);
                    this.currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(0.2, fadeTime);
                }

                // fade in event music
                source.connect(envelope);
                envelope.connect(this.master);
                source.start();
                envelope.gain.linearRampToValueAtTime(volume, fadeTime);

                this.currentEventAudio = {
                    source: source,
                    envelope: envelope
                };
            });
    }

    stopEventMusic() {
        if (!this.initialized) {
            return;
        }
        var fadeTime = this.audioContext.currentTime + this.FADETIME * 2;

        // fade out event music and stop
        if (this.currentEventAudio &&
            this.currentEventAudio.source &&
            this.currentEventAudio.source.buffer) {
            var currentEventGainValue = this.currentEventAudio.envelope.gain.value;
            this.currentEventAudio.envelope.gain.cancelScheduledValues(this.audioContext.currentTime);
            this.currentEventAudio.envelope.gain.setValueAtTime(currentEventGainValue, this.audioContext.currentTime);
            this.currentEventAudio.envelope.gain.linearRampToValueAtTime(0.0, fadeTime);
            this.currentEventAudio.source.stop(fadeTime + 1); // make sure fade has completed
            this.currentEventAudio = null;
        }

        // fade in background music at initial volume
        if (this.currentBackgroundMusic) {
            var currentBackgroundGainValue = this.currentBackgroundMusic.envelope.gain.value;
            this.currentBackgroundMusic.envelope.gain.cancelScheduledValues(this.audioContext.currentTime);
            this.currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, this.audioContext.currentTime);

            var initialVolume = this.currentBackgroundVolume || 1.0;
            console.log("Initial Volume:", initialVolume);
            this.currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(initialVolume, fadeTime);
        }
    }

    playSound(src, volume = 1.0) {
        if (!this.initialized) {
            return;
        }
        this.loadAudioFile(src)
            .then((buffer) => {
                var source = this.audioContext.createBufferSource();
                source.buffer = buffer;
        
                var gainNode = this.audioContext.createGain();
                gainNode.gain.value = volume;
        
                source.connect(gainNode);
                gainNode.connect(this.master);
        
                source.start();
            });
    }

    loadAudioFile(src) {
        if (!src.startsWith('http')) {
            let basePath = window.location.origin + window.location.pathname;
            if (basePath.endsWith('index.html')) {
                basePath = basePath.slice(0, -'index.html'.length);
            }
            if (!basePath.endsWith('/')) {
                basePath += '/';
            }
            src = new URL(src, basePath).toString();
        }
        if (this.AUDIOBUFFERCACHE[src]) {
            return new Promise((resolve) => {
                resolve(this.AUDIOBUFFERCACHE[src]);
            });
        } else {
            var request = new Request(src);
            return fetch(request)
                .then((response) => response.arrayBuffer())
                .then((buffer) => {
                    if (buffer.byteLength === 0) {
                        console.error('cannot load audio from ' + src);
                    }

                    var decodeAudioDataPromise = this.audioContext.decodeAudioData(buffer, (decodedData) => {
                        this.AUDIOBUFFERCACHE[src] = decodedData;
                        return this.AUDIOBUFFERCACHE[src];
                    });

                    // Safari WebAudio does not return a promise based API for
                    // decodeAudioData, so we need to fake it if we want to play
                    // audio immediately on first fetch
                    if (decodeAudioDataPromise) {
                        return decodeAudioDataPromise;
                    } else {
                        return new Promise((resolve) => {
                            var fakePromiseId = setInterval(() => {
                                if (this.AUDIOBUFFERCACHE[src]) {
                                    resolve(this.AUDIOBUFFERCACHE[src]);
                                    clearInterval(fakePromiseId);
                                }
                            }, 20);
                        });
                    }
                });
        }
    }

    setBackgroundMusicVolume(volume, s) {
        if (this.master == null) return;  // master may not be ready yet
        if (volume === undefined) {
            volume = 1.0;
        }
        if (s === undefined) {
            s = 1.0;
        }

        // cancel any current schedules and then ramp
        var currentBackgroundGainValue = this.currentBackgroundMusic.envelope.gain.value;
        this.currentBackgroundMusic.envelope.gain.cancelScheduledValues(this.audioContext.currentTime);
        this.currentBackgroundMusic.envelope.gain.setValueAtTime(currentBackgroundGainValue, this.audioContext.currentTime);
        this.currentBackgroundMusic.envelope.gain.linearRampToValueAtTime(
            volume,
            this.audioContext.currentTime + s
        );
    }

    setMasterVolume(volume, s) {
        if (this.master == null) return; // master may not be ready yet
        if (volume === undefined) {
            volume = 1.0;
        }
        if (s === undefined) {
            s = 1.0;
        }

        // cancel any current schedules and then ramp
        var currentGainValue = this.master.gain.value;
        this.master.gain.cancelScheduledValues(this.audioContext.currentTime);
        this.master.gain.setValueAtTime(currentGainValue, this.audioContext.currentTime);
        this.master.gain.linearRampToValueAtTime(
            volume,
            this.audioContext.currentTime + s
        );
    }

}

const audio = Audio.init();

export default audio;