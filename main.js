var current_state = 'intro';
var our_game_data = null;

const visit_state = () => 
{
    if( our_game_data[current_state]['text'] != null){
        $('.dialogue-box').html(our_game_data[current_state]['text']);
    }else{
        $('.dialogue-box').html('');
    }

    if( our_game_data[current_state]['image'] != null){

        $(".big-image").css('background-image',`url("${our_game_data[current_state]['image']}")`);
    }

    if (our_game_data[current_state]['choices'] != null) {
        const options = our_game_data[current_state]['choices'];
        $('.options').empty(); //clears previous text
    
        options.forEach(choice => { //adds the buttons, created out of the choices in our json
            const button = $('<button>').addClass('options-button').text(choice.text);
            $('.options').append(button); 

            if (choice.next_state != null) { //onclick to go to next state
                button.click(function() { 
                    current_state = choice.next_state;
                    visit_state(); 
                });
            }
        });

      
    }

    




    
};

$( document ).ready(function() {
    setTimeout(function(){

        $.getJSON( "game.json", function( data ) {
            our_game_data = data;
            visit_state();
        });
      }, 1000);    

});