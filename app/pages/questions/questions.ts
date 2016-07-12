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
		this.questions = this.data.data;
		this.name      = this.data.name;
	}

	setSelected(event, id, answer) {
		id = parseInt(id);

		for (let i = 0; i < this.questions.length; i++) {
			if (id === this.questions[i].id) {
				if (answer === this.questions[i].answer) {
					console.log(this.questions[i]);
				} else {

				}
				console.log(this.button);
				console.log(event.target.attributes);
			}
		}
	}
}
