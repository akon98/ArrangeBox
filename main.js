"use strict"

class ArrangeBox {
    constructor() {
        this.box = document.getElementById("ArrangeBox");
        this.table = document.createElement("table");
        this.items = document.createElement("th");
        this.items.textContent = "Item";
        this.box.append(this.table);
        this.table.append(this.items);
        this.chosen = document.createElement("th");
        this.chosen.textContent = "Chosen";
        this.table.append(this.chosen);
        this.index = 0;
        this.model_items = [];
        let bni = document.createElement("button");
        bni.textContent = "new item";
        this.table.before(bni);
        bni.addEventListener("click", () => {
            this.model_items.push(this.newItem());
            this.changeDetector(this.items);
        });
        let model_items_btn = document.createElement("button");
        model_items_btn.textContent = "show model";
        this.table.before(model_items_btn);
        model_items_btn.addEventListener('click', () => { this.showModelItems() });
        this.model_chosen = [];
        let reset = document.createElement("button");
        reset.textContent = "Reset";
        this.table.before(reset);
        reset.addEventListener("click", () => this.toInitial());
        this.find_field = document.createElement("input");
        this.table.before(this.find_field);
        let find = document.createElement("button");
        find.textContent = "Find";
        this.table.before(find);
        find.addEventListener("click", () => this.findElem(this.find_field.value));
        let newArrangeBox = document.createElement("button");
        newArrangeBox.textContent = "newArrangeBox";
        this.table.before(newArrangeBox);
        newArrangeBox.addEventListener("click", () => this.newArrangeBox());
        let send = document.createElement("button");
        send.textContent = "Send";
        this.table.before(send);
        send.addEventListener("click", () => this.sendData());
    }
    newItem() {
        let value = Math.floor(Math.random() * 100);
        let token = this.index;
        this.index++;
        return {value, token};
    }
    showModelItems() {
        console.log(this.model_chosen);
        console.log(this.table)
    }
    changeDetector(model) {
        let condition = (model === this.items);
        this.clear(model);
        this.setHeader(model);
        let model_arr = (condition) ? this.model_items : this.model_chosen;
        for (let i = 0; i < model_arr.length; i++) {
            let tr = document.createElement("tr");
            let button = document.createElement("button");
            let identifier = document.createElement("span");
            button.textContent = model_arr[i].value;
            identifier.textContent = model_arr[i].token;
            model.append(tr);
            tr.append(button);
            tr.append(identifier);
            identifier.style.visibility = "hidden";
            button.addEventListener("click", () => this.switcher(tr, condition));
        }
    }
    switcher(elem, isItems) {
        elem = {value: elem.childNodes[0].textContent, token: elem.childNodes[1].textContent};
        if (isItems) {
            this.model_items = this.model_items.filter(obj => {
                if ((obj.token != elem.token) /*|| (obj.value != b)*/) return true;
            });
            this.model_chosen.push(elem);
            this.changeDetector(this.items);
            this.changeDetector(this.chosen);
        } else {
            this.model_chosen = this.model_chosen.filter(obj => {
                if ((obj.token != elem.token) /*|| (obj.value != b)*/) return true;
            });
            this.model_items.push(elem);
            this.changeDetector(this.items);
            this.changeDetector(this.chosen);
        }
    }
    setHeader(model) {
        let condition = (model === this.items);
        let th = document.createElement("th");
        th.textContent = (condition) ? "Item" : "Chosen";
        model.append(th);
        th.addEventListener("click", () => this.sortModel(model));
    }
    clear(model) {
        while (model.firstChild) {
            model.removeChild(model.firstChild);
        }
    }
    toInitial() {
        this.index = 0;
        this.model_items = [];
        this.model_chosen = [];
        this.clear(this.items);
        this.clear(this.chosen);
        this.setHeader(this.items);
        this.setHeader(this.chosen);
    }
    sortModel(model) {
        let condition = (model === this.items);
        if (condition) {
            this.model_items.sort((a, b) => Number(a.value) > Number(b.value) ? 1 : -1);
        } else {
            this.model_chosen.sort((a, b) => Number(a.value) > Number(b.value) ? 1 : -1);
        }
        this.changeDetector(model);
    }
    findElem(elem) {
        if (elem) {
            for (let el of this.table.childNodes[0].childNodes) {
                if (el.childNodes[0]) {
                    if (Number(el.childNodes[0].textContent)) {
                        el.childNodes[0].style.backgroundColor = "#7573ff";
                    }
                    if (Number(el.childNodes[0].textContent) === Number(elem)) {
                        el.childNodes[0].style.backgroundColor = "red";
                    }
                }
            }
            for (let el of this.table.childNodes[1].childNodes) {
                if (el.childNodes[0]) {
                    if (Number(el.childNodes[0].textContent)) {
                        el.childNodes[0].style.backgroundColor = "#7573ff";
                    }
                    if (Number(el.childNodes[0].textContent) === Number(elem)) {
                        el.childNodes[0].style.backgroundColor = "red";
                    }
                }
            }
            this.find_field.value = null;
        } else {
            for (let el of this.table.childNodes[0].childNodes) {
                if (el.childNodes[0]) {
                    if (Number(el.childNodes[0].textContent) || Number(el.childNodes[0].textContent) === 0) {
                        el.childNodes[0].style.backgroundColor = "#7573ff";
                    }
                }
            }
            for (let el of this.table.childNodes[1].childNodes) {
                if (el.childNodes[0]) {
                    if (Number(el.childNodes[0].textContent) || Number(el.childNodes[0].textContent) === 0) {
                        el.childNodes[0].style.backgroundColor = "#7573ff";
                    }
                }
            }
        }
    }
    newArrangeBox() {
        let arrangeBox = new ArrangeBox();
    }
    sendData() {
        let xhr = new XMLHttpRequest();
        let url = "http://localhost:9090/example";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json", "Access-Control-Allow-Origin/*", "Access-Control-Allow-Methods/POST");
        //var data = JSON.stringify(this.model_chosen);
        //console.log(data)
        //xhr.send({value: 10});
        fetch(url, {
            method: "POST",
            ContentType: 'application/json',
            body: JSON.stringify({value: 10})
        })
    }
}

let arrangeBox = new ArrangeBox();