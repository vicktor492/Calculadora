class CalcController {

    constructor(){

        // _ = private
        
        this._locale = "pt-br";
        this._displayEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._hourEl = document.querySelector('#hora');
        this._displayCalc;
        this._currentDate;
        this.initialize();

    };

    initialize(){ 

        this.displayDateHour();

        setInterval(() => {

            this.displayDateHour();

        }, 1000);
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