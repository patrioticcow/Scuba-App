import {Component, ViewChild} from '@angular/core';
import {App, Page, Slides, Alert, NavController, NavParams, List} from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/questions/questions.html'
})
export class Questions {
	@ViewChild('questionSlideOptions') slider: Slides;

	name:any;
	data:any;
	questions:any;
	questionSlideOptions = {
		loop: false
	};

	constructor(private app:App, private navParams:NavParams) {
		this.data = this.navParams.data;

		console.log(this.data);

		this.getQuestions();
	}

	onSlideChanged() {
		console.log(this.slider.isEnd());

	}

	getQuestions() {
		this.questions = this.data.data;
		this.name      = this.data.name;
	}

	setSelected(data, id) {
		console.log(data);
		console.log(id);
	}
}
