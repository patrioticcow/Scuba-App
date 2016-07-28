import {Component, ViewChild} from '@angular/core';
import {App, Slides, Alert, Loading, NavController, NavParams} from 'ionic-angular';
import {HomePage} from '../home/home';
import {QuizStorage} from '../../providers/quiz-storage';

@Component({
	templateUrl: 'build/pages/questions/questions.html',
	providers  : [QuizStorage],
})
export class QuestionsPage {
	@ViewChild('questionSlideOptions') slider: Slides;
	@ViewChild('button') button;

	name: any;
	data: any;
	questions: any;
	loading: any;
	questionSlideOptions = {
		loop: false
	};

	constructor(private app: App, private navParams: NavParams, private nav: NavController, public quizStorage: QuizStorage) {
		this.loading = Loading.create({
			spinner: 'hide', content: 'Loading Please Wait...', dismissOnPageChange: true, duration: 1000
		});

		this.data = this.navParams.data;
		this.getQuestions();

		//this.quizStorage.createTable();

		//this.note = new Answer();
		//console.log(this.note);
	}

	ngAfterViewInit() {
		this.nav.present(this.loading);
	}

	getQuestions() {
		this.questions = this.randomizeAnswers(this.data.data);
		this.name      = this.data.name;

		setTimeout(() => {
			this.loading.dismiss();
		}, 1000);
	}

	randomizeAnswers(data) {
		for (let i = 0; i < data.length; i++) {
			let array = data[i].answers;
			for (var tmp, cur, top = array.length; top--;) {
				cur        = (Math.random() * (top + 1)) << 0;
				tmp        = array[cur];
				array[cur] = array[top];
				array[top] = tmp;
			}

			data[i].answers = array;
		}

		return data;
	}

	setSelected(id, answer, button) {
		id           = parseInt(id);
		let buttonEl = button._elementRef.nativeElement;
		let isCorrect;

		let buttons = document.getElementsByClassName('answer' + id);

		for (let i = 0; i < this.questions.length; i++) {
			buttonEl.setAttribute('disabled', 'true');

			if (id === this.questions[i].id) {
				let title;
				let correctAnswer = this.questions[i].answer;

				if (answer === correctAnswer) {
					buttonEl.className = 'button-green';
					isCorrect          = 'true';
					title              = 'Correct';
				} else {
					buttonEl.className = 'button-red';
					isCorrect          = 'false';
					title              = 'Incorrect';
				}

				this.presentAlert(title, correctAnswer);

				let indexId = this.slider.getActiveIndex();
				let obj     = {question_id: this.questions[indexId].id, group_id: this.questions[indexId].group, is_correct: isCorrect};

				this.quizStorage.getByQuestion(obj).then(data => {
					if (data.res.rows.length === 0) {
						this.quizStorage.saveAnswer(obj);
					} else {
						obj['id'] = data.res.rows[0].id;
						this.quizStorage.updateAnswer(obj);
						console.log(obj);
					}
				});
			}
		}

		for (let j = 0; j < buttons.length; j++) {
			buttons[j].setAttribute('disabled', 'true');
		}
	}

	presentAlert(title, subTitle) {
		let alert = Alert.create({
			title   : '<span class="isQuestion' + title + '">' + title + '</span>',
			subTitle: '<strong>Correct answer:</strong> ' + subTitle,
			buttons : [{
				text   : 'Next',
				role   : 'cancel',
				handler: () => {
					let navTransition = alert.dismiss();

					navTransition.then(() => {
						let currentIndex = this.slider.getActiveIndex();

						if (this.slider.isEnd()) {
							this.nav.push(HomePage);
						} else {
							this.slider.slideTo(currentIndex + 1, 500);
						}
					});

					return false;
				}
			}]
		});

		this.nav.present(alert);
	}
}
