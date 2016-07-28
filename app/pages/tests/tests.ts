import {Component} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {App, Loading, NavController} from 'ionic-angular';
import {QuizData} from '../../providers/quiz-data';
import {QuestionsPage} from '../questions/questions';
import {QuizStorage} from '../../providers/quiz-storage';

@Component({
	templateUrl: 'build/pages/home/home.html',
	providers  : [QuizData, QuizStorage]
})
export class TestsPage {
	groups = [];
	loading;

	constructor(private app: App, private nav: NavController, private quizData: QuizData, private quizStorage: QuizStorage) {
		this.loading = Loading.create({
			spinner: 'hide', content: 'Loading Please Wait...', dismissOnPageChange: true
		});

		console.log('home constructor');
	}

	onPageWillEnter() {
		this.nav.present(this.loading);

		Observable.forkJoin([this.getQuestionsFromDatabase(), this.getQuestions()]).subscribe(data => {
			setTimeout(() => {
				this.loading.dismiss();
			}, 1000);

			console.log(data);

			this.groups = data[1];
		});
	}

	getQuestionsFromDatabase() {
		return this.quizStorage.getGroupAnswers().then(data => {
			let rows = data.res.rows;

			if (rows.length === 0) return null;

			console.log(rows);

			return [];
		});
	}

	getQuestions() {
		return this.quizData.getQuiz().then(data => {
			return data;
		});
	}

	ngAfterViewInit() {

	}

	goToQuestions(data) {
		this.nav.push(QuestionsPage, data);
	}
}
