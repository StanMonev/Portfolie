const text = ["Hi, my name is Stanimir Monev.", "I'm a software developer.", "And welcome to my website: SMWorks.com"];

const timeoutPromise = ms => new Promise(resolve => setTimeout(resolve, ms));

var TxtType = function (el, toRotate, toWriteOut, hasLoading, period = 2000) {
	this.toRotate = toRotate;
	this.toWriteOut = toWriteOut;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.hasLoading = hasLoading;
	this.isDeleting = false;
	this.container = null;
	this.prepareLoading(hasLoading);
};

TxtType.prototype.prepareLoading = function (hasLoading) {
	const loading = "Loading...";
	if (hasLoading) {
		this.toRotate.unshift(loading);
		this.loadingTimer = (loading.length - 1) * 2;
	}
}

TxtType.prototype.write = async function (showLoadingOnce) {

	if (this.loopNum === this.toWriteOut.length) { return; }

	if (showLoadingOnce) { await this.showLoadingOnce(); }

	var that = this;
	let fullTxt = this.toWriteOut[this.loopNum];

	if (this.loopNum == 0) {
		this.container = this.el.firstChild;
		this.container.setAttribute('id', 'container_' + this.loopNum);
	}

	this.container.innerHTML = "";

	let isDone = await this.writeRecursive(this.container, fullTxt);

	if (isDone) {
		this.container.removeAttribute("class");
		this.loopNum++;
		if (this.loopNum < this.toWriteOut.length) {
			this.container = document.createElement("span");
			this.container.setAttribute('id', 'container_' + this.loopNum);
			this.container.setAttribute('class', 'wrap');
			this.container.innerHTML = "&nbsp;";
			this.el.appendChild(this.container);
		}
	}

	await timeoutPromise(this.period).then(async () => {
		await that.write(false)
	});
}

TxtType.prototype.writeRecursive = async function (container, fullTxt) {

	if (this.txt === fullTxt) {
		this.txt = '';
		return true;
	}

	this.txt = fullTxt.substring(0, this.txt.length + 1);
	container.innerHTML = this.txt;
	let delta = 200 - Math.random() * 100;
	var that = this;
	return await timeoutPromise(delta).then(async () => {
		return await that.writeRecursive(container, fullTxt)
	});
}

TxtType.prototype.showLoadingOnce = async function () { await this.tick(true); }

TxtType.prototype.tick = async function (once) {

	if (once && !this.hasLoading) {
		this.el.innerHTML = '<span class="wrap">&nbsp;</span>';
		await timeoutPromise(this.period);
		return;
	}

	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];
	var that = this;

	if (this.isDeleting) {
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	} else {
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;

	if (this.isDeleting) { delta /= 2; }

	if (!this.isDeleting && this.txt === fullTxt) {
		delta = this.period;
		this.isDeleting = true;
	} else if (this.isDeleting && this.txt === '') {
		this.isDeleting = false;
		delta = 500;
		if (!this.hasLoading) {
			this.loopNum++;
		}
	}

	if (this.hasLoading && this.loadingTimer <= 0) {
		this.toRotate.shift();
		this.hasLoading = false;
	}

	if (this.loadingTimer > 0) {
		this.loadingTimer -= 1;
	}

	await timeoutPromise(delta).then(async () => {
		await that.tick(once);
	});
};

window.onload = function () {
	let elements = document.getElementsByClassName('typewriter');
	for (let i = 0; i < elements.length; i++) {
		let toRotate = elements[i].getAttribute('data-type') || text;
		toRotate = isJsonString(toRotate) ? JSON.parse(toRotate) : toRotate;
		if (toRotate) {
			triggerTxtType(elements[i], [], toRotate, true);
		}
	}
};

async function triggerTxtType(el, toRotate, toWriteOut, hasLoading) {
	let textType = new TxtType(el, toRotate, toWriteOut, hasLoading);
	await textType.write(true);
	toogleDownloadButton();
}

function isJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
