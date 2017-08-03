var app = {};
app.lessonPlan = [
	{
		question: 'Who was Canada\'s first Prime Minister?', 
		answer: 'John A. MacDonald', 
		choices: ['John A. MacDonald', 'John David Thompson', 'John Abbott' ]
	},
	{
		question: 'What does Kanada mean?', 
		answer: 'the Village', 
		choices: ['the Village', 'the Forest', 'the Nation' ]
	},
	{
		question: 'Who wrote In Flander\'s Fields?', 
		answer: 'John McCrae', 
		choices: ['John McCrae', 'Jean Nicollet', 'John Abbott' ]
	},
	// {
	// 	question: 'Who talks to Henry VII about the fishery stocks in Newfoundland?', 
	// 	answer: 'John Cabot',
	// 	choices: ['Jean Nicollet', 'John Cabot', 'Jacques Cartier' ]
	// },
	// {
	// 	question: 'Who invented basketball?', 
	// 	answer: 'James Naismith', 
	// 	choices: ['James Naismith', 'Sandford Flemin', 'Nat Taylor' ]
	// },
	// {
	// 	question: 'Which of these artists was not part of the Group of Seven?', 
	// 	answer: 'Tom Thomson', 
	// 	choices: ['Tom Thomson', 'J. E. H. MacDonald', 'Franklin Carmichael' ]
	// },
	// {
	// 	question: 'What is the official motto of Canada?', 
	// 	answer: 'From sea to sea', 
	// 	choices: ['From sea to sea', 'Strong and free', 'Unity and freedom' ]
	// },
	// {
	// 	question: 'Which two animals are featured on the Canadian Coat of Arms?',
	// 	answer: 'Lion and unicorn',
	// 	choices: ['Lion and unicorn', 'Bear and Lion', 'Unicorn and beaver']
	// },
	// {
	// 	question: 'Who is the longest-serving Canadian prime minister?', 
	// 	answer: 'William Lyon Mackenzie King', 
	// 	choices: ['William Lyon Mackenzie King', 'Pierre Trudeau', 'John A. MacDonald' ]
	// },
	// {
	// question: 'What city was the first capital of the province of Canada in 1841?',
	// answer: 'Kingston',
	// choices: ['Kingston', 'Ottawa', 'Montreal']
	// },

];


// Global Variables
app.userScore = 0;
app.currentLesson = 0;
app.selected = '';
app.numberOfQuestions = app.lessonPlan.length - 1;

//Selecting/Caching
app.$cardContainer = $('.card-container');
app.$optionContainer = $('.option-container');
app.$feedback = $('p#feedback');
app.$submitButton = $('button#submit');
app.$scoreContainer = $('.score-container');
app.$again = $('#again');

//check for Questions
app.findQuestion = function(lesson){
	if (lesson > app.numberOfQuestions){
		app.displayRes();
	} else {
		app.populate(lesson);
	}
};

//Populate the HTML
app.populate = function(lesson){
	app.$optionContainer.empty();
	$('h2').text(app.lessonPlan[lesson].question).addClass('question');
	$('#score').text(app.userScore);

	//shuffle the options
	var shuffled = app.lessonPlan[lesson]['choices'].sort(function(){
		return 0.5 - Math.random();
	});
	shuffled.forEach(function(option){
		app.$optionContainer.append(`
			<div class="option">
			<input type="radio" id="${option}" name="option" value="${option}">
			<label for="${option}">${option}</label>
			</div>
		`);
	});
}

//Selecting options
app.$optionContainer.on('click', 'input', function() {
 	app.selected = $(this).val();
 	// console.log(app.selected);
	app.$feedback.empty();
 	app.$submitButton.removeClass('hidden');
});

//Submit / compare
$('button#submit').on('click', function(e){
	e.preventDefault();
	app.$submitButton.addClass('hidden');

	if(app.selected === app.lessonPlan[app.currentLesson].answer){
		app.userScore = app.userScore + 1;
		app.$feedback.text('Correct!');
		$('#score').text(app.userScore);
		// console.log('correct ', app.userScore + ' ' + app.selected + ' app.currentLesson: ' + app.currentLesson);

		app.selected = '';
		app.nextLesson();

	} else {
		app.$feedback.text('Wrong, the correct answer is ' + app.lessonPlan[app.currentLesson].answer + '.' );
		// console.log('wrong', app.userScore + app.selected + ' app.currentLesson: ' + app.currentLesson);

		app.selected = '';
		app.nextLesson();
	} 

});

// Next Question
app.nextLesson = function(){
	app.currentLesson++;
	app.findQuestion(app.currentLesson);
}

//Display Score
app.displayRes = function(){
	app.$cardContainer.addClass('hidden');
	app.userScore = app.userScore * 10;
	// app.$feedback.empty().text('Your final score is: ' + app.userScore + '%');
	$('#final-score').text('Your final score is: ' + app.userScore + '%');
	app.$scoreContainer.addClass('hidden');
	app.$again.removeClass('hidden');
}

// Play Again
$('#again').on('click', function(e){
	e.preventDefault();
	app.$cardContainer.removeClass('hidden');
	app.$feedback.empty();
	app.$again.addClass('hidden');
	$('#final-score').empty();
	app.$scoreContainer.removeClass('hidden');
	app.userScore = 0;
	app.init();
});


app.init = function(){
	app.currentLesson = 0;

	app.findQuestion(0);
}


$(document).ready(function(){
	app.init();

});

