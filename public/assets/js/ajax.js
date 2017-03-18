var questions = [
	{
		question: "Wake up in the morning feeling like P Diddy",
		answers: ["Tik Tok", "Tic Toc", "Tick-tock", "Don't Stop"],
		correctAnswer: 0,
		correctMusician: "Artist: Ke$ha ~ Album: Animal ~ Year: 2009",
		wrongAnswer: "This is an Animal of a single for this artist"
	},
	{
		question: "Picture perfect memories, Scattered all around the floor",
		answers: ["American Honey", "Quarter After One", "Need You Now", "Don't Stop"],
		correctAnswer: 2,
		correctMusician: "Artist: Lady Antebellum ~ Album: Need You Now ~ Year: 2009",
		wrongAnswer: "This country song Won four Grammy in 2011"
	},
	{
		question: "Your lipstick stains on the front lobe of my left side brains",
		answers: ["Soul Sister", "Hey, Soul Sister", "Mister Mister", "Tonight"],
		correctAnswer: 1,
		correctMusician: "Artist: Train ~ Album: Save Me, San Francisco ~ Year: 2009",
		wrongAnswer: "Top-selling song on the iTunes Store in 2010"
	},
	{
		question: "Greetings loved ones Let's take a journey",
		answers: ["California", "California Dreaming", "Dani California", "California Gurls"],
		correctAnswer: 3,
		correctMusician: "Artist: Katy Perry ~ Album: Teenage Dream ~ Year: 2010",
		wrongAnswer: "This song takes place in Candyfornia"
	},
	{
		question: "I was thinking bout her, thinkin' bout me",
		answers: ["Thinkin Dreamin", "Dreamer", "Just a Dream", "Sweet Dreams"],
		correctAnswer: 2,
		correctMusician: "Artist: Nelly ~ Album: 5.0 ~ Year: 2010",
		wrongAnswer: "A missouri singer who thinks it's hot in here"
	},
	{
		question: "Shawty, Imma only tell you this once, you're the illest",
		answers: ["Shawty", "Your Love", "You Got Spark", "Once"],
		correctAnswer: 1,
		correctMusician: "Artist: Nicki Minaj ~ Album: Pink Friday ~ Year: 2010",
		wrongAnswer: "This from a Trinidadian-born musician debut album"
	},
	{
		question: "Man, it's a hot one Like seven inches from the midday sun",
		answers: ["Grenade", "Forget about it", "The Ocean", "Smooth"],
		correctAnswer: 3,
		correctMusician: "Artist: Santana ~ Album: Supernatural ~ Year: 1999",
		wrongAnswer: "A collaboration between Latin rocker & Matchbox Twenty vocalist Rob Thomas"
	},
	{
		question: "We've been on the run Driving in the sun",
		answers: ["California", "California Dreaming", "Dani California", "California Gurls"],
		correctAnswer: 0,
		correctMusician: "Artist: Phantom Planet ~ Album: The Guest ~ Year: 2002",
		wrongAnswer: "Theme song for Ocean County California"
	},
	{
		question: "Let's get it crunk, we gon' have fun",
		answers: ["Real Love", "Sweet Thing", "Family Affair", "Real Love"],
		correctAnswer: 2,
		correctMusician: "Artist: Mary J. Blige ~ Album: No More Drama ~ Year: 2001",
		wrongAnswer: "Listed as the 79th-biggest single on the Billboard Hot 100 All-Time Top Songs"
	},
	{
		question: "I just want you close Where you can stay forever",
		answers: ["Superwoman", "No One", "Fallin'", "My Boo"],
		correctAnswer: 1,
		correctMusician: "Artist: Alicia Keys ~ Album: As I Am ~ Year: 2007",
		wrongAnswer: "Ranked at number 42 on The Billboard Hot 100 All-Time Top Songs"
	}
]

var currentQuestionIndex = 0;
var currentQuestion;
var time = 12*1000;
var timer;
var score = 0;
var data = 0;
$('#time').text(time/1000);

function countDown(){
	timer = setInterval(function(){
		time -= 1000;
		$('#time').text(time/1000);

		if (time == 0){
			time = 12 * 1000;
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

		if ($(this).data('key') == currentQuestion.correctAnswer){

		alert(currentQuestion.correctMusician);
	}
		score = score + 10;
	}else{
		alert(currentQuestion.wrongAnswer);
		score = score - 5;
	}


	currentQuestionIndex++;

	$('#score').text(score);

	if (currentQuestionIndex <= questions.length - 1){
		loadQuestion();
		time = 1000 * 12;
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

