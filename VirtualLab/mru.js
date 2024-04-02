$(document).ready(function () {
    com = [];
    faults = [];
    flag = 0;
    $("#btn1").click(function () {

    });

    var btn = document.querySelector(".submit");

    btn.addEventListener("click", function () {

//   --------------------------------------------------------------------------------------------------------------------------  
            
        
// -----------------------------------------------------------------------------------------------------------------------
        //take input of frames from html
        var frames = document.querySelector("#frames");
        console.log(frames.value);

        //input of sequence
        var str = document.querySelector("#istring");
        console.log(str.value);


        var inner = document.querySelector(".container");

        var ol = document.querySelector("ol");

        com = parseInt(frames.value);
        console.log(com);

        var pages = str.value.split(",");

        var n = pages.length;

        faults = [];

        //size of frames
        var m = parseInt(com, 10);
        console.log(m);
        var item = document.createElement("div");


        //css
        item.style.margin = "auto";
        item.style.width = "62%";
        item.style.padding = "5% 15%";
        //css for background color of output
        item.style.background = "#77c1e3";
        item.style.borderRadius = "1rem";
        item.style.color = "black";
     

        inner.appendChild(item);
        var ul = document.createElement("ul");
        ul.innerHTML = "<h5>Summary</h5>";
        item.appendChild(ul);
        var li = document.createElement("li");
        li.textContent = "Total frames: " + com;
        ul.appendChild(li);
        var li = document.createElement("li");
        li.textContent = "Algorithm: MRU";
        ul.appendChild(li);
        var li = document.createElement("li");
        li.textContent = "Total number of input frames: " + pages.length;
        ul.appendChild(li);
        var li = document.createElement("li");
        li.textContent = "Sequence of pages: " + str.value;
        ul.appendChild(li);
        

        li.style.marginBottom = "2rem";

        var h = document.createElement("h5");
        h.textContent = "Visualization";
        item.appendChild(h);

        var hh = document.createElement("h6");
        hh.textContent = "For No. of Frames = " + m;
        item.appendChild(hh);


        var tab = document.createElement("table");
        tab.style.border = "1px solid black";
        tab.style.borderCollapse = "collapse";
        tab.style.padding = "2rem";
       

        item.appendChild(tab);
        var col = document.createElement("tr");
        col.style.border = "1px solid black";
        tab.appendChild(col);
        var head = document.createElement("td");
        head.style.border = "1px solid black";
        head.style.padding = "1rem";
        head.innerHTML = "<strong>No.</strong>";
        head.style.color = "black";
        head.style.backgroundColor = "#606060";
        head.classList.add("tbl-header");
        col.appendChild(head);
        var head = document.createElement("td");
        head.style.border = "1px solid black";
        head.style.padding = "1rem";
        head.innerHTML = "<strong>Page</strong>";

        head.style.color = "black";
        head.style.backgroundColor = "#606060";
        head.classList.add("tbl-header");
        col.appendChild(head);

        for (var i = 0; i < com; i++) {
            var head = document.createElement("td");
            head.innerHTML = "<strong>Frame</strong>";
            head.style.color = "black";

            head.style.backgroundColor = "#606060";
            head.classList.add("tbl-header");
            col.appendChild(head);
        }
        var head = document.createElement("td");
        head.style.border = "1px solid black";
        head.style.padding = "1rem";
        head.innerHTML = "<strong>Hit</strong>";
        head.style.color = "black";

        head.style.backgroundColor = "#606060";
        head.classList.add("tbl-header");
        col.appendChild(head);
        var head = document.createElement("td");
        head.style.border = "1px solid black";
        head.style.padding = "1rem";
        head.innerHTML = "<strong>Replaced Page</strong>";
        head.style.color = "black";

        head.style.backgroundColor = "#606060";
        head.classList.add("tbl-header");
        col.appendChild(head);


        //array of frames 
        const inst = [];
        
        //counts hits
        var hits = 0;

        //counts faults
        var miss = 0;

        for (var i = 0; i < n; i++) {
            var hit = 0, v = "-";
            var col = document.createElement("tr");
            col.style.border = "1px solid black";
            tab.appendChild(col);
            var head = document.createElement("td");
            head.style.border = "1px solid black";
            head.style.padding = "1rem";
            head.textContent = i + 1;
            head.style.backgroundColor="#D3D3D3";
            col.appendChild(head);
            var head = document.createElement("td");
            head.style.border = "1px solid black";
            head.style.padding = "1rem";
            head.textContent = pages[i];
            head.style.backgroundColor = "white";
            col.appendChild(head);

            //idx = index of page
            var idx = inst.indexOf(pages[i]);
            


            if (idx == -1) {
                if (inst.length < m) {
                    inst.unshift(pages[i]);
                }
                else {

                    //replaced page
                    v = inst[0];

                    //replace page 
                    inst.splice(0, 1);
                    inst.unshift(pages[i]);

                }
                miss++;
            }
            else {

                //delete element 
                inst.splice(inst.indexOf(pages[i]), 1);

                //add new element
                inst.unshift(pages[i]);
                hit = 1;
                hits++;
            }
            
            //color table
            for (var j = inst.length - 1; j >= 0; j--) {
                var head = document.createElement("td");
                head.style.border = "1px solid black";
                head.style.padding = "1rem";
                head.style.backgroundColor = "white";
                head.textContent = inst[j];
               
                col.appendChild(head);
            }
            for (var j = 0; j < m - inst.length; j++) {
                var head = document.createElement("td");
                head.style.border = "1px solid black";
                head.style.padding = "1rem";
                head.style.backgroundColor = "white";
                head.textContent = "-";
                col.appendChild(head);
            }
            var head = document.createElement("td");
            head.style.border = "1px solid black";
            head.style.padding = "1rem";
            head.style.backgroundColor = "white";

            if (hit == 1) {
                head.textContent = "Yes";
                head.style.backgroundColor = "#009900";

            }
            else {
                head.textContent = "No";
            head.style.backgroundColor = "white";

            }
            col.appendChild(head);
            var head = document.createElement("td");
            head.style.border = "1px solid black";
            head.style.padding = "1rem";
            head.style.backgroundColor = "white";
            head.textContent = v;
            col.appendChild(head);
        }
        var ul = document.createElement("ul");
        ul.innerHTML = "<h5>Observations</h5>";
        ul.style.marginTop = "3rem";
        item.appendChild(ul);
        var li = document.createElement("li");
        li.textContent = "Total references: " + n;
        ul.appendChild(li);

        var li = document.createElement("li");
        li.textContent = "Number of hits: " + hits;
        ul.appendChild(li);
        var li = document.createElement("li");
        li.textContent = "Number of faults: " + miss;
        faults.push(miss);
        ul.appendChild(li);
        var li = document.createElement("li");
        li.textContent = "Hit rate: " + hits + "/" + n + " = " + (hits / n) * 100 + "%";
        ul.appendChild(li);
        var li = document.createElement("li");
        li.textContent = "Fault rate: " + miss + "/" + n + " = " + (miss / n) * 100 + "%";
        ul.appendChild(li);

    });
});