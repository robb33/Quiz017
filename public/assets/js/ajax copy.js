var questions = [
	{
		question: "Wake up in the morning feeling like P Diddy",
		answers: ["Tik Tok", "Tic Toc", "Tick-tock", "Don't Stop"],
		correctAnswer: 0,
		correctMuscian: "Ke$ha"
	},
	{
		question: "Picture perfect memories, Scattered all around the floor",
		answers: ["Tik Tok", "Quarter After One", "Need You Now", "don't stop"],
		correctAnswer: 2,
		correctMuscian: "Lady Antebellum"
	},
	{
		question: "Your lipstick stains on the front lobe of my left side brains",
		answers: ["Soul Sister", "Hey, Soul Sister", "Mister Mister", "Tonight"],
		correctAnswer: 1,
		correctMuscian: "Train"
	},
	{
		question: "Greetings loved ones Let's take a journey",
		answers: ["California", "California Dreaming", "Dani California", "California Gurls"],
		correctAnswer: 3,
		correctMuscian: "Katy Perry"
	},
	{
		question: "I was thinking bout her, thinkin' bout me",
		answers: ["Thinkin Dreamin", "fencing", "Just a Dream", "basketball"],
		correctAnswer: 3,
		correctMuscian: "Nelly"
	},
	{
		question: "Shawty, Imma only tell you this once, you're the illest",
		answers: ["Shawty", "Your Love", "You Got Spark", "basketball"],
		correctAnswer: 1,
		correctMuscian: "Nicki Minaj"
	},
	{
		question: "What sport did Richie Rich play when he grew up?",
		answers: ["football", "fencing", "ballet", "basketball"],
		correctAnswer: 3,
		correctMuscian: "Ke$ha"
	},
	{
		question: "We've been on the run Driving in the sun",
		answers: ["California", "California Dreaming", "Dani California", "California Gurls"],
		correctAnswer: 0,
		correctMuscian: "Phantom Planet"
	},
	{
		question: "What sport did Richie Rich play when he grew up?",
		answers: ["football", "fencing", "ballet", "basketball"],
		correctAnswer: 3,
		correctMuscian: "Ke$ha"
	},
	{
		question: "What did Sheri Pie do before the bootcamp?",
		answers: ["teacher", "hunter", "gatherer", "graphic designer"],
		correctAnswer: 3,
		correctMuscian: "Ke$ha"
	}
]

var currentQuestionIndex = 0;
var currentQuestion;
var time = 9*1000;
var timer;
var score = 0;
var data = 0;
$('#time').text(time/1000);

function countDown(){
	timer = setInterval(function(){
		time -= 1000;
		$('#time').text(time/1000);

		if (time == 0){
			time = 9 * 1000;
			$('#time').text(time/1000);

			currentQuestionIndex++;

			if (currentQuestionIndex <= questions.length - 1){
				loadQuestion();
			}else{

				data = {
					total_score: score,
				}

				$.ajax({
					url: "/scores/create", 
					method: "POST",
					data: data, 
				}).done(function(response){
					window.location = "/scores"
				});

				clearInterval(timer);
				alert('put a fork in it');
				$("#container").empty();
				$("#container").html("<p>Finito!</p>");
			}
		}
	}, 1 * 1000);
}

$('#container').hide();

$('#startGame').on('click', function(){
	countDown();
	$('#container').show();
})




function loadQuestion(){

	currentQuestion = questions[currentQuestionIndex];

	$('#displayQuestion').html("");

	var question = $('<div>').text(currentQuestion.question);
	$('#displayQuestion').append(question);

	for (var i=0; i<currentQuestion.answers.length; i++){
		var answerButton = $("<button>").attr('class', 'answer').attr('data-key', i).text(currentQuestion.answers[i]);
		$('#displayQuestion').append(answerButton);
	}
}

loadQuestion();

$(document).on('click', '.answer', function(){
	if ($(this).data('key') == currentQuestion.correctAnswer){
		alert('winner winner winner!!');
		score = score + 10;
	}else{
		alert('you are a weiner weiner weiner');
		score = score - 5;
	}

	currentQuestionIndex++;

	$('#score').text(score);

	if (currentQuestionIndex <= questions.length - 1){
		loadQuestion();
		time = 1000 * 9;
		$('#time').text(time/1000);
	}else{

		data = {
			total_score: score,
		}

		$.ajax({
			url: "/scores/create", 
			method: "POST",
			data: data, 
		}).done(function(response){
			window.location = "/scores"
		});

		clearInterval(timer);
		$("#container").empty();
		$("#container").html("<p>Finito!</p>");
	}
})

