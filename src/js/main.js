function Program(data) {
    var self = this;
    this.id = ko.observable(data.ProgramID);
    this.name = ko.observable(data.Name);
    this.totalMonthlySales = ko.observable(data.TotalMonthlySales);
    this.monthlyAttendance = ko.observable(data.MonthlyAttendance);
    this.sales = {current: [], previous: []};
    this.sales.current = ko.observable(data.Sales.CurrentYear);
    this.sales.previous = ko.observable(data.Sales.PreviousYear);

    self.monthlyFormatted = ko.computed(function(){
        var total = data.TotalMonthlySales.toFixed(2);
        return "$" + total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
    });

}

function ProgramModel() {
    var self = this;
    self.programs = ko.observableArray([]);

    $.getJSON('https://api.myjson.com/bins/5bdb3', function(allData){
        var mappedPrograms = $.map(allData, function(item) { return new Program(item) });
        self.programs(mappedPrograms);
    });
    
}

ko.applyBindings(new ProgramModel());
$(document).ready(function(){
    'use strict';

    var $navMenuButton = $('#navToggle');
    var $newProgramButton = $('#newProgram');
    var $cancelProgramButton = $('#cancelCreateProgram');
    
    function toggleCreateProgram() {
        $("#newProgramForm").fadeToggle(300);
    }

    function toggleMenu(){
        $('.navigation__list').slideToggle(300);
    }
    
    
    $navMenuButton.bind('click', toggleMenu);
    $newProgramButton.bind('click', toggleCreateProgram);
    $cancelProgramButton.bind('click', toggleCreateProgram);
    $('.modal').click(function(){
        toggleCreateProgram();
    });
    $('.modal .modal__body').click(function(e){
        e.stopPropagation();
    });
    $('body').on('click', '.program__more', function(e) {
        e.preventDefault();
        $(this).text( $(this).text() == 'more' ? 'less' : 'more' ) 
        $(this).siblings('.program__expand').slideToggle(300);
    });
});
