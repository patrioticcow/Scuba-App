import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class QuizData {
	data:any;
	apiUrl:string = 'http://api.massinflux.com/scuba/';

	constructor(private http:Http) {

	}

	load(type) {
		if (this.data) return Promise.resolve(this.data);

		return new Promise(resolve => {
			this.http.get(this.apiUrl + 'quiz.php?type=' + type).subscribe(res => {
				this.data = res.json();

				resolve(this.data);
			});
		});
	}

	loadNewQuiz() {
		if (this.data) return Promise.resolve(this.data);

		return new Promise(resolve => {
			this.http.get(this.apiUrl + 'new_quiz.php?type=quiz').subscribe(res => {
				this.data = res.json();

				resolve(this.data);
			});
		});
	}

	getQuiz() {
		return this.load('quiz').then(data => {
			return this.generateArray(data);
		});
	}

	generateArray(obj) {
		return Object.keys(obj).map((key)=> {
			return obj[key];
		});
	}
}