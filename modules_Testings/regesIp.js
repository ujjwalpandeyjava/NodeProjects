let ipAddr = "192.168.1.63:9999:user:user";

// let reg = window.prompt("Enter Port");
let RegE1 = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\:)(1000\d|100[1-9]\d|10[1-9]\d{2}|1[1-9]\d{3}|[2-5]\d{4}|6[0-4]\d{3}|65000)(\:\+){2}$/
if (ipAddr.match(RegE1)) {
	// let splitting = ipAddr.split(/[:]/);
	console.log("matched");
}
else if (!(ipAddr.split(/[:]/)[1]).match(/^(1000\d|100[1-9]\d|10[1-9]\d{2}|1[1-9]\d{3}|[2-5]\d{4}|6[0-4]\d{3}|65000)$/)) {
	console.log("wrong port Number");
}
// let portRegEx = /^(1000\d|100[1-9]\d|10[1-9]\d{2}|1[1-9]\d{3}|[2-5]\d{4}|6[0-4]\d{3}|65000)$/
// if (!reg.match(portRegEx)) {
// 				console.log("not matched");
// 			} 