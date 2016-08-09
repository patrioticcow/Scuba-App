import {Component} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {App, Loading, NavController, Storage, LocalStorage} from 'ionic-angular';
import {QuizData} from '../../providers/quiz-data';
import {QuestionsPage} from '../questions/questions';
import {QuizStorage} from '../../providers/quiz-storage';

@Component({
	templateUrl: 'build/pages/tests/tests.html',
	providers  : [QuizData, QuizStorage]
})
export class TestsPage {
	local: Storage = new Storage(LocalStorage);
	groups         = [];
	message;
	loading;

	constructor(private app: App, private nav: NavController, private quizData: QuizData, private quizStorage: QuizStorage) {
		this.loading = Loading.create({
			spinner: 'hide', content: 'Loading. Please Wait...', dismissOnPageChange: true
		});
	}

	onPageWillEnter() {
		console.log('home constructor');

		this.nav.present(this.loading);
		this.obsarvable();

		this.getNewQuizData();
	}

	obsarvable() {
		Observable.forkJoin([this.getQuestionsFromDatabase(), this.getQuestions()]).subscribe(data => {
			console.log(data);
			setTimeout(() => {
				this.loading.dismiss();
			}, 1000);

			for (let i = 0; i < data[1].length; i++) {
				data[1][i]['correct']   = 0;
				data[1][i]['incorrect'] = 0;

				if (data[0]) {
					for (let j = 0; j < data[0].length; j++) {
						if (data[0].item(j) != undefined && parseInt(data[1][i].group) === parseInt(data[0].item(j).group_id)) {
							if (data[0].item(j).is_correct === 'true') data[1][i]['correct'] = data[0].item(j).count;
							if (data[0].item(j).is_correct === 'false') data[1][i]['incorrect'] = data[0].item(j).count;
						}
					}
				}
			}

			this.groups = data[1];
		});
	}

	getQuestionsFromDatabase() {
		return this.quizStorage.getGroupAnswers().then(data => {
			console.log(data);
			let rows = data.res.rows;

			if (rows.length === 0) return null;

			return rows;
		});
	}

	getQuestions() {
		return this.local.get('questions').then(resp => {
			if (resp !== null) {
				return JSON.parse(resp);
			} else {
				return this.getQuestionsData();
			}
		});
	}

	getNewQuizData() {
		this.quizData.loadNewQuiz().then(data => {
			this.message = data.message;

			if(data.new_questions === 'yes') this.resetQuestions();
		});
	}

	getQuestionsData() {
		return this.quizData.getQuiz().then(data => {
			return this.local.set('questions', JSON.stringify(data)).then(resp => {
				return data;
			});

		});
	}

	clearScore(group) {
		for (let j = 0; j < this.groups.length; j++) {
			if (this.groups[j].group === group.group) {
				this.groups[j].correct   = 0;
				this.groups[j].incorrect = 0;
			}
		}

		this.quizStorage.removeAnswerByGroup({group_id: group.group});
	}

	resetQuestions() {
		this.local.remove('questions');
	}

	goToQuestions(data) {
		this.nav.push(QuestionsPage, data);
	}
}
