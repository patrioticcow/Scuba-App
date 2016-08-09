import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';

@Injectable()
export class QuizStorage {
	storage: Storage = null;

	constructor() {
		this.createTable();
	}

	public createTable() {
		this.storage = new Storage(SqlStorage);
		this.storage.query('CREATE TABLE IF NOT EXISTS answers (id INTEGER PRIMARY KEY AUTOINCREMENT, question_id NUMBER, group_id NUMBER, is_correct TEXT)');
	}

	public removeTable() {
		return this.storage.query('DROP TABLE answers');
	}

	public getAnswers() {
		return this.storage.query('SELECT * FROM answers');
	}

	public getGroupAnswers() {
		return this.storage.query('select group_id, is_correct, count(*) as count from answers group by group_id, is_correct');
	}

	public getByQuestion(answer) {
		return this.storage.query('SELECT * FROM answers WHERE question_id = ' + answer.question_id + ' AND group_id = ' + answer.group_id);
	}

	public saveAnswer(answer) {
		let sql = 'INSERT INTO answers (question_id, group_id, is_correct) VALUES (?,?,?)';
		return this.storage.query(sql, [answer.question_id, answer.group_id, answer.is_correct]);
	}

	public updateAnswer(answer) {
		let sql = 'UPDATE answers SET question_id = \"' + answer.question_id + '\", group_id = \"' + answer.group_id + '\", is_correct = \"' + answer.is_correct + '\" WHERE id = \"' + answer.id + '\"';
		this.storage.query(sql);
	}

	public removeAnswerByGroup(answer) {
		let sql = 'DELETE FROM answers WHERE group_id = \"' + answer.group_id + '\"';
		this.storage.query(sql);
	}

	public removeAnswer(answer) {
		let sql = 'DELETE FROM answers WHERE id = \"' + answer.id + '\"';
		this.storage.query(sql);
	}
}