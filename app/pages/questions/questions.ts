import {Component, ViewChild} from '@angular/core';
import {App, Storage, SqlStorage, Page, Slides, Alert, NavController, NavParams, List} from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/questions/questions.html'
})
export class Questions {
	@ViewChild('questionSlideOptions') slider: Slides;
	@ViewChild('button') button;

	name: any;
	data: any;
	questions: any;
	storage: Storage     = null;
	questionSlideOptions = {
		loop: false
	};

	constructor(private app: App, private navParams: NavParams) {
		this.storage = new Storage(SqlStorage, {name: '_questions', backupFlag: SqlStorage.BACKUP_LOCAL, existingDatabase: false});

		this.data = this.navParams.data;
		this.storage.query('select * from questions').then((resp) => {
			console.log(resp);
		});
		this.getQuestions();
	}

	onSlideChanged() {
		console.log(this.slider.isEnd());
	}

	getQuestions() {
		console.log(this.data.data);
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

		let buttons = document.getElementsByClassName('answer' + id);

		for (let i = 0; i < this.questions.length; i++) {
			buttonEl.setAttribute('disabled', 'true');

			if (id === this.questions[i].id) {
				if (answer === this.questions[i].answer) {
					buttonEl.className = 'button-green';
					isCorrect          = true;
				} else {
					buttonEl.className = 'button-red';
					isCorrect          = false;
				}

				//let key   = this.questions[i].key + '_' + this.questions[i].group;
				//let value = JSON.stringify({question: this.questions[i].id, group: this.questions[i].group, correct: isCorrect});

				this.storage.query('insert into questions(question, group, correct) values("' + this.questions[i].id + '", "' + this.questions[i].group + '", "' + isCorrect + '")');
			}
		}

		for (let j = 0; j < buttons.length; j++) {
			console.log(buttons[j]);
			buttons[j].setAttribute('disabled', 'true');
		}
	}
}
