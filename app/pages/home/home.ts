import {Component}    from '@angular/core';
import {App, Page, Modal, Alert, NavController, List} from 'ionic-angular';
import {QuizData} from '../../providers/quiz-data';
import {Questions} from '../questions/questions';

@Component({
	templateUrl: 'build/pages/home/home.html',
	providers  : [QuizData]
})
export class HomePage {
	groups = [];

	constructor(private app:App, private nav: NavController, private navController:NavController, private quizData:QuizData) {

	}

	ionViewDidEnter() {
		console.log('ionViewDidEnter');
	}

	ngAfterViewInit() {
		console.log('ngAfterViewInit');

		this.quizData.getQuiz().then(data => {
			this.groups = data;
		});
	}

	goToQuestions(data) {
		this.nav.push(Questions, data);
	}
}
