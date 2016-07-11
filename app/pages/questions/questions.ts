import {Component} from '@angular/core';
import {App, Page, Modal, Alert, NavController, NavParams, List} from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/questions/questions.html'
})
export class Questions {
	name:any;
	data:any;
	questions:any;

	constructor(private app:App, private navParams:NavParams) {
		this.data = this.navParams.data;

		console.log(this.data);

		this.questions = [
			{
				"title"  : "question 1",
				"answers": ["a", "b", "c", "d"]
			},
			{
				"title"  : "question 2",
				"answers": ["a", "b", "c", "d"]
			}
		];

		this.getQuestions();
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
