import {Component, ViewChild} from '@angular/core';
import {App, Page, Slides, Alert, NavController, NavParams, List} from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/questions/questions.html'
})
export class Questions {
	@ViewChild('questionSlideOptions') slider:Slides;
	@ViewChild('button') button;

	name:any;
	data:any;
	questions:any;
	questionSlideOptions = {
		loop: false
	};

	constructor(private app:App, private navParams:NavParams) {
		this.data = this.navParams.data;

		this.getQuestions();
	}

	onSlideChanged() {
		console.log(this.slider.isEnd());
	}

	getQuestions() {
		this.questions = this.randomizeAnswers(this.data.data);
		this.name      = this.data.name;
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

		for (let i = 0; i < this.questions.length; i++) {
			if (id === this.questions[i].id) {
				if (answer === this.questions[i].answer) {
					buttonEl.className = 'button-green';
					isCorrect          = true;
				} else {
					buttonEl.className = 'button-red';
					isCorrect          = false;
				}

				console.warn(this.questions[i]);
				console.warn(isCorrect);
			}
		}
	}
}
