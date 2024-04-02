var size = 0;

function removeRow() {
	if (size > 0) {
		document.getElementById("myTable").deleteRow(size);
		size--;
	}
}
var width = 165;
function addRow() {


	let name = "P" + size;
	width += 90;
	// document.getElementById("printProcess").style.width = `${width}px`;
	var myTab = document.getElementById("myTable").rows;

	if (size == 0) {
		document.getElementById("myTable").innerHTML += `
		<tr id=${name} style="background-color:#dfdfdf;">
							<td>${name}</td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							</tr>`;
	}
	else {
		document.getElementById("myTable").innerHTML += `
		<tr id=${name} style="background-color:#dfdfdf;">
							<td>${name}</td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td><input value="0"></td>
							<td></td>
							<td></td>
							<td></td>
							</tr>`;
	}

	size++;
}
function submitValue() {
	document.getElementById("printProcess").style.display="flex";

	var printProcess = document.getElementById("printProcess");
	document.getElementById("printProcess").innerHTML = "";
	var myTab = document.getElementById("myTable").rows;

	let alloc = [];
	let allocatedA = [];
	let allocatedB = [];
	let allocatedC = [];
	let maximumA = [];
	let maximumB = [];
	let maximumC = [];
	let availableResorces = [];
	let n = myTab.length - 1;


	for (let i = 1; i < n; i++) {
		let myRow = myTab[i];

		let mytdAA = myRow.cells[1];
		// console.log(mytdAA);
		let currValueAA = mytdAA.children[0].value;
		allocatedA.push(parseInt(currValueAA));
		let mytdAB = myRow.cells[2];
		let currValueAB = mytdAB.children[0].value;
		allocatedB.push(parseInt(currValueAB));
		let mytdAC = myRow.cells[3];
		let currValueAC = mytdAC.children[0].value;
		allocatedC.push(parseInt(currValueAC));
		let mytdMA = myRow.cells[4];
		let currValueMA = mytdMA.children[0].value;
		maximumA.push(parseInt(currValueMA));
		let mytdMB = myRow.cells[5];
		let currValueMB = mytdMB.children[0].value;
		maximumB.push(parseInt(currValueMB));
		let mytdMC = myRow.cells[6];
		let currValueMC = mytdMC.children[0].value;
		maximumC.push(parseInt(currValueMC));


	}



	let allocatedALL = new Array(n);
	let maximumALL = new Array(n);



	for (let i = 0; i < n; i++) {
		allocatedALL[i] = new Array(3);
		maximumALL[i] = new Array(3);

		allocatedALL[i][0] = allocatedA[i]
		allocatedALL[i][1] = allocatedB[i];
		allocatedALL[i][2] = allocatedC[i];
		maximumALL[i][0] = maximumA[i];
		maximumALL[i][1] = maximumB[i];
		maximumALL[i][2] = maximumC[i];
	}


	availableResorces.push(parseInt(myTab[1].cells[7].children[0].value));
	availableResorces.push(parseInt(myTab[1].cells[8].children[0].value));
	availableResorces.push(parseInt(myTab[1].cells[9].children[0].value));



	let deadlock = false;

	let sumA = 0;
	let sumB = 0;
	let sumC = 0;


	for (let i = 0; i < allocatedA.length; i++) {
		sumA = sumA + allocatedA[i];
		sumB = sumB + allocatedB[i];
		sumC = sumC + allocatedC[i];
	}

	sumA = sumA + availableResorces[0];
	sumB = sumB + availableResorces[1];
	sumC = sumC + availableResorces[2];

	if (!(sumA <= Math.max.apply(null, maximumA)) || !(sumB <= Math.max.apply(null, maximumB)) || !(sumC <= Math.max.apply(null, maximumC))) {
		deadlock = true;
	}


	let need = new Array(n);
	for (let i = 0; i < n; i++) {

		need[i] = new Array(3);
		for (let j = 0; j < 3; j++) {

			need[i][j] = maximumALL[i][j] - allocatedALL[i][j];
		}
	}



	if (!deadlock) {
		printProcess.innerHTML = "deadlock";
	}
	else {

		console.log("else");
		let flag = [];
		let ans = [];
		for (let i = 0; i < n; i++) {
			flag[i] = 0;
		}

		for (let i = 0; ans.length != n; i++) {


			for (let j = 0; j < n; j++) {

				if (flag[j] == 0) {
					let temp = false;
					for (let k = 0; k < 3; k++) {
						if (need[j][k] > availableResorces[k]) {
							temp = true;
							break;
						}
					}

					if (!temp) {
						for (let m = 0; m < n; m++) {
							availableResorces[m] += allocatedALL[j][m]
						}

						flag[j] = 1;
						ans.push(j);
					}
				}

			}
		}


		console.log(ans);


		for (let i = 0; i < n; i++) {
			let str = ' P' + ans[i];

			printProcess.innerHTML += str;
		}

	}
}