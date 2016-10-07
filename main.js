var cell_template = function(parent){
    var self = this;
    this.parent = parent;
    this.element = null;
    this.symbol = null;
    this.create_self = function(){
        this.element = $("<div>",{
            class:'ttt_cell',
            text: ' '
        }).click(this.cell_click);
        return this.element
    };
    this.cell_click = function(){
        if($(this).text() === " "){
            var current_player = self.parent.get_current_player();
            self.symbol = current_player.get_symbol();
            self.change_symbol(self.symbol);
            self.parent.cell_clicked(self);
        } else {
           return;
        }
    };
    this.change_symbol = function(symbol){
        this.element.text(symbol);
    };
    this.get_symbol = function(){
        return self.symbol;
    }

};
var game_template = function(main_element){
    var self = this;
    this.element = main_element;
    this.cell_array = [];
    this.players = [];
    this.current_player = 0;
    this.win_condition = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    this.create_cells = function(cell_count){
        for(var i = 0; i < cell_count; i++){
            var cell = new cell_template(this);
            var cell_element = cell.create_self();
            this.cell_array.push(cell);
            $(this.element).append(cell_element);
        }
    };
    this.create_players = function(){
        var player1 = new player_template('X',$('#player1'));
        var player2 = new player_template('O',$('#player2'));
        this.players.push(player1);
        this.players.push(player2);
        this.players[0].activate_player();
    };
    this.switch_players = function(){
        if(this.current_player){
            this.current_player = 0;
        } else {
            this.current_player = 1;
        }
    };
    this.get_current_player = function(){
        return this.players[this.current_player]
    };
    this.cell_clicked = function(){
        self.check_win_condition();
        self.players[self.current_player].deactivate_player();
        self.switch_players();
        self.players[self.current_player].activate_player();

    };
    this.check_win_condition = function(){
        var current_player_symbol = this.players[this.current_player].get_symbol();
        for(var i = 0; i < this.win_condition.length; i++){
            var counter = 0;
            for (var j = 0; j < this.win_condition[i].length; j++){
                if(this.cell_array[this.win_condition[i][j]].get_symbol() == current_player_symbol){
                    counter++;
                    if(counter === 3) {
                        this.player_wins(this.players[this.current_player]);
                    }
                }
            }
        }
    };
    this.player_wins = function(player){
        console.log(player.get_symbol() + 'won the game!')
    }
};


var player_template = function(symbol, element){
    this.symbol = symbol;
    this.element = element;
    this.activate_player = function(){
        this.element.addClass('active_player');
    };
    this.deactivate_player = function(){
        this.element.removeClass('active_player');
    };
    this.get_symbol = function(){
        return this.symbol
    }
};


$(document).ready(function(){
    var main_game = new game_template('#gamebody');
    main_game.create_cells(9);
    main_game.create_players();
});

