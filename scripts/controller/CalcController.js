class CalcController {

    constructor(){

        // _ = private
        
        this._locale = "pt-br";
        this._displayEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._hourEl = document.querySelector('#hora');
        this._displayCalc;
        this._currentDate;
        this._operation = [];
        this.initialize();
        this.initButtonsEvents();

    };

    initialize(){ 

        this.displayDateHour();

        setInterval(() => {

            this.displayDateHour();

        }, 1000);
    }

    addEventListenerAll(elements, events, fn){

        events.split(' ').forEach(event => {
            elements.addEventListener(event, fn, false);
       });
    }

    clearAll(){
        this._operation = [];
    }

    cancelEntre(){

        this._operation.pop();
    }

    lastOperation(){
        return this._operation[this._operation.length-1];
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value){

        return (['+', '-', '*', '/', '%', '.'].indexOf(value) > -1);
    }

    isNumber(value){
        return ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].indexOf(value)  > -1);
    }

    calc(){

        let last = this._operation.pop();

        let result = eval(this._operation.join(""));
        
        this._operation = [result, last];

    }

    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3){

            this.calc();
        }
    }

    addOperation(value){  
        
        if(this._operation.length > 0){
            if(isNaN(this.lastOperation())){
                if(this.isOperator(value)){
                    this.setLastOperation(value);
                    
                } else if(this.isNumber(value)){
                    this.pushOperation(value);
                }   
            
            } else if(this.isNumber(value)){
                let newValue = this.lastOperation().toString() + value.toString();
                this.setLastOperation(parseInt(newValue));

            } else if(this.isOperator(value)){
                this.pushOperation(value);
            }
        } else {
            this.pushOperation(value);
        }
        
        
    }

    setError(){

        this.displayCalc = "Error";
    }

    execBtn(value){

        switch(value){

            case 'ac':
                this.clearAll();
            break; 

            case 'ce':
                this.cancelEntre();
            break;

            case 'soma':
                this.addOperation('+');
            break;

            case 'subtracao':
                this.addOperation('-');
            break;

            case 'divisao':
                this.addOperation('/');
            break;

            case 'multiplicacao':
                this.addOperation('*');
            break;

            case 'porcento':
                this.addOperation('%');
            break;

            case 'igual':
                
            break;

            case 'ponto':
                this.addOperation('.');
            break

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                
                this.addOperation(parseInt(value));
                 
            break;


            default:
                this.setError();
            break;
        }
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{
            this.addEventListenerAll(btn, 'click drag', (e) => {
                let textBtn = btn.className.baseVal.replace("btn-","");
                
                this.execBtn(textBtn);
            });

            this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=>{
                btn.style.cursor = "pointer";
            });
        });
    }

    displayDateHour(){
        this.displayDate = this.currentDate.toLocaleDateString(this._locale);
        this.displayHour = this.currentDate.toLocaleTimeString(this._locale); 
    }
    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        return this._dateEl.innerHTML = value;
    }

    get displayHour(){
        return this._hourEl.innerHTML;
    }

    set displayHour(value){
        return this._hourEl.innerHTML = value;
    }

    get displayCalc(){
        return this._displayEl.innerHTML;
    }

    set displayCalc(value){
        this._displayEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }
};